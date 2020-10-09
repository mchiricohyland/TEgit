# It's so easy, Tyler can do it!
## A Training in Parts ANSWERS

### Configuration Questions 1-3 COMPLETE

```c#
long userID = this.Arrangement.Configuration.Core.New(new UserConfiguration()
{
    AssignedUserGroupIDs = new long[] { Ids.UserGroup.MANAGER }
});

long documentTypeID = this.Arrangement.Configuration.Core.New(new DocumentTypeConfiguration()
{
	AssignedUserGroupIDs = new long[] { Ids.UserGroup.MANAGER }
}, Ids.DiskGroup.Data);

long lifeCycleID = this.Arrangement.Configuration.Workflow.New(new LifeCycleConfiguration()
{
    AssignedUserGroupIDs = new long[] { Ids.UserGroup.MANAGER, userGroupID },
    AssignedWorkItemTypeIDs = new long[] { documentTypeID },
    WorkItemType = WorkItemType.Document
});

long queueID = this.Arrangement.Configuration.Workflow.New(lifeCycleID, new QueueConfiguration()
{
    AssignedUserGroupIDs = new long[] { Ids.UserGroup.MANAGER }
});

long adHocTaskID = this.Arrangement.Configuration.Workflow.New(queueID1, new AdHocTaskConfiguration()
{
    AssignedUserGroupIDs = new long[] { Ids.UserGroup.MANAGER }
});

RuleConfiguration ruleConfig = new RuleConfiguration()
{
	TaskConfiguration = new Hyland.Workflow.Tasks.Rules.PromptUserWithQuestionBox.TaskConfiguration()
	{
		QuestionText = "Quick, Yes or No: This training is super hard?",
        HideCancelButton = false,
        CancelButtonCaption = "Cancel",
        YesButtonCaption = "Yes, omg, totally",
        NoButtonCaption = "Pshht, No",
	}
}

//Adding Rule to Ad Hoc Task
this.Arrangement.Configuration.Workflow.New(this.Session, this.ServiceProvider, adHocTaskID, ruleconfig);

//Adding Actions to Rule branches
this.Arrangement.Configuration.Workflow.New(this.Session, this.ServiceProvider, ruleconfig.OnTrueTaskListID, new ActionConfiguration()
{
	TaskConfiguration = new Hyland.Workflow.Tasks.Actions.DisplayMessageBox.TaskConfiguration()
	{
		Message = "You'll be fine."
	}
}

this.Arrangement.Configuration.Workflow.New(this.Session, this.ServiceProvider, ruleconfig.OnFalseTaskListID, new ActionConfiguration()
{
	TaskConfiguration = new Hyland.Workflow.Tasks.Actions.DisplayMessageBox.TaskConfiguration()
	{
		Message = "Good, I'll make it harder."
	}
}

DropCache();

User user = User.FromID(this.DataSourceName, userID);

IQueueProvider queueProvider = this.GetRequiredService<IQueueProvider>();
IQueue queue1 = queueProvider.GetQueue(this.DataSourceName, queueID);

ITaskListProvider taskListProv = this.GetRequiredService<ITaskListProvider>();
ITaskList adHocTask = taskListProv.GetTaskList(this.DataSourceName, adHocTaskID);

Document workItemPrimary = this.Arrangement.Core.Document.New(documentTypeID).In(queueID).Result as Document;
```