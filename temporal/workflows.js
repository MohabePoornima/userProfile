const { proxyActivities, sleep } = require("@temporalio/workflow");
const activities = proxyActivities({ startToCloseTimeout: "15 seconds" });

async function profileWorkflow(userData) {
  await sleep(10000);
  await activities.updateCrudCrud(userData);
}

module.exports = { profileWorkflow };
