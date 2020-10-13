### Act Questions 4-6 COMPLETE

```c#
//Question 4:
.ExecuteAdHocTask(this.Session, new[] { workItem }, queue, adHocTask, new TaskExecutionSettings());

//Question 5:
 ITaskExecutionService taskExecutionService = GetRequiredService<ITaskExecutionService>();
 taskExecutionService.ExecuteAdHocTask(this.Session, new[] { workItem }, queue, adHocTask, new TaskExecutionSettings());

//Question 6:
ITaskExecutionService taskExecutionService = GetRequiredService<ITaskExecutionService>();
TaskExecutionResult result = taskExecutionService.ExecuteAdHocTask(this.Session, new[] { workItem }, queue, adHocTask, new TaskExecutionSettings());

```