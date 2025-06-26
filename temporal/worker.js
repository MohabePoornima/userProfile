const { Worker } = require("@temporalio/worker");

async function runWorker() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows"),
    activities: require("./activities"),
    taskQueue: "profile-task-queue",
  });
  await worker.run();
}

runWorker().catch((err) => console.error(err));
