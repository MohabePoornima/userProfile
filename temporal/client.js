const { Connection, WorkflowClient } = require("@temporalio/client");
const { profileWorkflow } = require("./workflows");

async function startProfileWorkflow(userData) {
  const connection = await Connection.connect();
  const client = new WorkflowClient({ connection });

  await client.start(profileWorkflow, {
    taskQueue: "profile-task-queue",
    workflowId: `profile-${userData._id}-${Date.now()}`,
    args: [userData],
  });
}

module.exports = { startProfileWorkflow };