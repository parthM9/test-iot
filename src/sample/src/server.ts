const express = require("express");
const appInsights = require("applicationinsights");

appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not there").start();
const client = appInsights.defaultClient;

try {
  client.trackEvent({
    name: "StartingSample",
    properties: {
      customProperty: "custom property value",
    },
  });

  // Constants
  const PORT = 8080;
  const HOST = "0.0.0.0";

  // App
  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);

  client.trackEvent({
    name: "StartedSample",
    properties: {
      customProperty: "custom property value",
    },
  });
} catch (error) {
  client.trackException({
    exception: error,
    properties: {
      name: "SampleService",
      customProperty: "custom property value",
    },
  });
}
