### Assert Questions 7-9 COMPLETE
I chose to write this test in NoRightsActionsAndRules. If you chose a different file, just sub the name. 

```c#
 #region Initializer

        public static void Initialize()
        {
            NoRightsActionsAndRules_TestName_TestData();
        }
#endregion

#region Test Data

        private static void NoRightsActionsAndRules_TestName_TestData()
        {
            if (SmokeTestRegistry.Store.Keys.Contains(nameof(NoRightsActionsAndRules_TestName))) { return; };

            TestDataConfigurationSet testData = new TestDataConfigurationSet();

            long userGroupID = WorkflowBaseTest.API.Core.New(new UserGroupConfiguration()
            {
                Privileges = new ClientPrivilege[]
                {
                    ClientPrivilege.RetrieveDocument,
                    ClientPrivilege.WorkflowRestricted,
                    ClientPrivilege.Client,
                    ClientPrivilege.WebClient
                }
            });

            List<long> userGroupIDs = new List<long>() { userGroupID, SessionManager.ManagerUserGroupID };

            long userID = WorkflowBaseTest.API.Core.New(new UserConfiguration()
            {
                AssignedUserGroupIDs = userGroupID.AsEnumerable()
            });

            long documentTypeID = WorkflowBaseTest.API.Core.New(new DocumentTypeConfiguration()
            {
                AutoNameString = "%#",
                FileType = FileTypes.Text,
                AssignedUserGroupIDs = userGroupIDs

            }, Ids.DiskGroups.DATA);

            long lifeCycleID = WorkflowBaseTest.API.Workflow.New(new LifeCycleConfiguration()
            {
                WorkItemType = WorkItemType.Document,
                AssignedUserGroupIDs = userGroupIDs
            });

            long queueID = WorkflowBaseTest.API.Workflow.New(lifeCycleID, new QueueConfiguration()
            {
                AssignedUserGroupIDs = userGroupIDs,
            });

            /////
            Hyland.Core.CoreUtility.DropCache(AppConfig.DataSource);
            SessionManager.RefreshSessions();
            /////

            testData.Users = User.FromID(AppConfig.DataSource, userID).AsEnumerable();

            ILifeCycle lifeCycle = LCProvider.GetLifeCycle(AppConfig.DataSource, lifeCycleID);

            testData.LifeCycles = lifeCycle.AsEnumerable();

            IQueue queue = QueueProvider.GetQueue(AppConfig.DataSource, queueID);

            testData.Queues = queue.AsEnumerable();

            IEnumerable<long> documentIDs = Generate.CreateNewDocuments(documentTypeID, 5);

            testData.DocumentsInQueue = Generate.CreateDocumentObjects(documentIDs).ToQueue();

            for (int i = 0; i < testData.DocumentsInQueue.Count(); i++)
            {
                WFService.AddWorkItemToLifeCycle(SessionManager.Manager, testData.DocumentsInQueue.ElementAt(i), lifeCycle, null);
            }

            SmokeTestRegistry.Store.TryAdd(nameof(NoRightsActionsAndRules_TestName), testData);
        }

        #endregion
        /// <summary>
        /// Verify that the number of documents in the Queue matches what you created.
        /// </summary>
        [Test, Workflow(WorkflowTestType.SmokeTest)]
        [Author(TeamMembers.MareChirico)]
        public void NoRightsActionsAndRules_TestName()
        {
            TestDataConfigurationSet testData = SmokeTestRegistry.Store[nameof(NoRightsActionsAndRules_TestName)];
            ILifeCycle lc = testData.Lifecycles.FirstOrDefault();
            IQueue q = testData.Queues.FirstOrDefault();
            User user = testData.Users.FirstOrDefault();
            long queueCount = 0;

            try
            {
                LoginToWorkflow(user.Name);

                Workflow.LifeCycle(lc.Name)
                    .Expand()
                    .Queue(q.Name);

                Wait.Until(() => !Workflow.Inbox.IsLoading, r => r, 15, 2);

                queueCount = Workflow.Inbox.ItemCount;

            finally
            {
                WorkflowLocks.RemoveAllLocks();
            }

            Assert.That(queueCount, Is.EqualTo(5), "The Inbox did not display the correct number of items.");
        }

```