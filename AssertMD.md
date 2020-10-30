# Assert Statments
## Checking what we expect to happen in the test.

### Main Scenarios 
1. `Assert.That(bool);`
    1. For readability, we can also write above as `Assert.That(bool, Is.True);`
    1. `Assert.That(bool, "If not true, what happened");`
2. `Assert.That(!bool);`
    1. Same as `Assert.That(bool, Is.False);`
    1. `Assert.That(bool, Is.False, "Message");`
3. `Assert.That(variable, Is.EqualTo(expectedVariable));`
    1. `Assert.That(variable, Is.EqualTo(expectedVariable), "Message");`
4. `Assert.That(list, Is.EquivalentTo(expectedList));`
    1. `Assert.That(list, Is.EquivalentTo(expectedList), "Message");`
5. `Assert.That(methodThatReturnsBool);`
6. Comparing two numbers:
    1. `Assert.That(int, Is.GreaterThan(otherInt));`
    1. `Assert.That(long, Is.LessThan(otherLong));`
7. Checking if Null of Not Null:
    1. `Assert.That(object, Is.Null);`
    1. `Assert.That(otherObject, Is.Not.Null);`

### Real Life Examples
1. `Assert.That(afterCount, Is.GreaterThan(beforeCount), "The document was not successfully imported.");`
2. `Assert.That(documentName.Equals(documentNameActual), "The Auto-Name string displayed in the viewer did not match expected, maybe the document did not display at all?");`
3. `Assert.That(Document.FromID(session, workItem.ID), Is.Null);`
4. `Assert.That(Workflow.IsDialogDisplayed(), Is.False, "An unexpected dialg was detected");`



