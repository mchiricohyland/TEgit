# Test Case Data

## Simple Test Case
The most basic case for using TestCaseData is when you have **two or more options** to pass into **one variable** of the test.

### Components
1. IEunumerable property
2. get statement
3. return statement
    1. `return new WFTestCaseData(option);` single option
    1. `yield return new WFTestCaseData(option1);` more than one option
    1. `yield return new WFTestCaseData(option1, option2);` more than one variable
4. TestCaseSource before test.
    1. `[TestCaseSource(typeof(ExecutionTest), nameof(Simple_TestCases))]`
    1. typeof(_name of test class_)
    1. nameof(_name of IEnumerable property_)
5. Setting up the Test Method Statement 
    1. `public void Simple(bool exception)`
    1. _Simple_ is the name of the test
    1. **bool** _exception_ is the variable data type and variable name used in the test.

```c#
protected static IEnumerable Simple_TestCases
    {
        get
        {
            yield return new WFTestCaseData(true);
			yield return new WFTestCaseData(false);
        }
    }
		
[Test]
[TestCaseSource(typeof(ExecutionTest), nameof(Simple_TestCases))]
public void Simple(bool exception)
{}
```
### More Complicated Example
```c#
        protected static IEnumerable Execute_TestCases
        {
            get
            {
                // Add User, User ID invalid but not 0. This does not throw an exception for some reason, but it does when the roleID is set to 999999.
                yield return new WFTestCaseData(ApproverSourceType.User, LastExecutionStatus.True, 999999L);
                // Add User, User ID valid
                yield return new WFTestCaseData(ApproverSourceType.User, LastExecutionStatus.True, null);
                // Add Role, Role ID is valid
                yield return new WFTestCaseData(ApproverSourceType.Role, LastExecutionStatus.True, null);
                // UI prompt for user to add
                yield return new WFTestCaseData(ApproverSourceType.Prompt, LastExecutionStatus.False, null); 
            }
        }

        [Test]
        [TestCaseSource(typeof(ExecutionTest), nameof(Execute_TestCases))]
        public void Execute(ApproverSourceType approverType, LastExecutionStatus expectedExecutionStatus, long? userID)
		{}

```

# Combintorials 
These are functions that allow a developer to return as many iterations of a test case based on the number and options of each variable.

## Example 1
In the below example, there are still the components of the TestCaseSource (i.e. Property set-up, return statement) but 
instead of using `yield return` to have multiple returns, the Combintorial method returns an IEnumberable.

### Components of the Combintorial Method
1. `WFTestCaseData.Combintorial()`
2. The method arguments can be anything, as long as it is cast as `.Cast<object>()`. 
    1. `Enum.GetValues()` returns every value in the enumeration called.
        1. In the example provided, the enum holds five values, therefore, the combintorial will return five tests
    1. Another example would be if the Combintorial was passed `(true, false).Cast<object>()`, it would return the same as the Simple Test Case above.
3. Be careful with ending parenthases. Visual Studios' Intellisense will show if there is an error. 

```c#
	protected static IEnumerable Execute_Exceptions_TestCases
        {
            get
            {
                return WFTestCaseData.Combinatorial(
                    Enum.GetValues(typeof(ReplaceApprovalExpcetionEnum)).Cast<object>());
            }
        }
		
        [Test]
        [TestCaseSource(typeof(ExecutionTest), nameof(Execute_Exceptions_TestCases))]
        public void Execute_Exceptions(ReplaceApprovalExpcetionEnum exception)
		{}
```
<details>
  <summary>Enumeration</summary>

```c#			
  public enum ReplaceApprovalExpcetionEnum
    {
        QueueNotFound,
        QueueNotConfigured,
        WorkItemNotInProcess,
        UserNotConfigured,
        QueueNotApproval
    }
```
</details>

## Example 2
If you need to use a Combintorial but don't need ***EVERY*** option, then you will use a `foreach` loop and `if/else()` statements, as shown below.

### Components of the Combintorial Method (with foreach loop)
1. Using the `foreach` loop means that the return statement is *within* the loop and not outside as with other examples.
2. Within the `foreach` loop is the Combintorial method, since the Combintorial method returns an IEnumerable of WFTestCaseData object.
3.  ```c#
    foreach(
        WFTestCaseData data in WFTestCaseData.Combintorial(_options_))
        {
            return data;
        }
    ```
    1. This will return the same as using only the Combintorial. 
4. By using `if/else` statements and `continue;` vs. `return;`, we are able to control the test cases created.
    1. First, let's look at `data.ArgumentEquals()`.
        1. `data` is the variable we named in the foreach loop, so we are looking at a single test case each time.
        1. `.ArgumentEquals()` returns a bool and needs the arugments 
            1. The location in the Combintorial array that the argument we are looking for is located
            2. The value we are comparing the argument to.
            3. `data.ArgumentEquals(1, StatusEnum.All)` is looking for in the second spot in the array, that the argument equals `StatusEnum.All`.
            4. If the value of that iteration matches, then the method returns `true`, if it does not, the method returns `false`. 
    2. When using the `if()` statement and we want to **SKIP** that option in the test cases, we will find it and `continue;` the loop without returning the value.
    3. When using the `if()` statement and we want to **KEEP** that option, we would use `yield return;` in our if statement. 
        1. More times than not, we will **skip** values with `if` and **return** values with `else`.

```c#
protected static IEnumerable Execute_TestCases
        {
            get
            {
                foreach (WFTestCaseData data in WFTestCaseData.Combinatorial(
                     Enum.GetValues(typeof(StatusEnum)).Cast<object>(),
                     Enum.GetValues(typeof(StatusEnum)).Cast<object>(),
                     Enum.GetValues(typeof(UserTypeEnum)).Cast<object>()))
                {
                    //Based off OBStudio, the To Status can only be set to "Pending" or "Rejected" and "None" is not an option.
                    if (data.ArgumentEquals(1, StatusEnum.All) ||
                        data.ArgumentEquals(1, StatusEnum.Approved) ||
                        data.ArgumentEquals(0, StatusEnum.None) ||
                        data.ArgumentEquals(1, StatusEnum.None))
                    {
                        continue;
                    }
                    else
                    {
                        yield return data;
                    }
                }
            }
        }

        [Test]
        [TestCaseSource(typeof(ExecutionTest), nameof(Execute_TestCases))]
        public void Execute(StatusEnum fromStatus, StatusEnum toStatus, UserTypeEnum userType)
		{}
```

		<details>
  <summary>Enumerations</summary>

```c#	
 public enum StatusEnum : long
    {
        /// <summary>
        /// All
        /// </summary>
        All = -1,

        /// <summary>
        /// None
        /// </summary>
        None = ApprovalStatusType.None,

        /// <summary>
        /// Pending
        /// </summary>
        Pending = ApprovalStatusType.Pending,

        /// <summary>
        /// Rejected
        /// </summary>
        Rejected = ApprovalStatusType.Rejected,

        /// <summary>
        /// Approved
        /// </summary>
        Approved = ApprovalStatusType.Approved
    }
	
    public enum UserTypeEnum
    {
        /// <summary>
        /// AllUsers
        /// </summary>
        AllUsers,

        /// <summary>
        /// CurrentUser
        /// </summary>
        CurrentUser
    }
```
</details>	

# Yield Return
## If you want to return more than one test case, use **yield return**, not just return.
### If you use **return** alone, it will return the first iteration, then stop. 