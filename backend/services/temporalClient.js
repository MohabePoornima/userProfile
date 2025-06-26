const { Connection, WorkflowClient } = require('@temporalio/client');

const startUpdateProfileWorkflow = async (profileId, data) => {
    const connection = await Connection.connect();
    const client = new WorkflowClient({ connection });

    const handle = await client.start('updateProfileWorkflow', {
        args: [profileId, data],
        taskQueue: 'profile-update',
        workflowId: `profile-${profileId}`,
    });

    return handle.workflowId;
};

module.exports = { startUpdateProfileWorkflow };
