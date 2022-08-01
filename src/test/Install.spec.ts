import { getInstallCommand } from "../../scripts/install";
import assert from "assert";

describe("Install", function () {
  describe("getInstallCommand()", function () {
    it(`should install all the modules`, () => {
      const expectedResponse =
        "npm install ./libs/wxp-core.tgz ./libs/wxp-scripts.tgz ./libs/create-wxp-app.tgz ./libs/cwa-scaffolder.tgz ./libs/cwa-managed-plugin-template.tgz ./libs/cwa-quickjs-plugin-template.tgz ./libs/cwa-iframe-widget-template.tgz ";
      const response = getInstallCommand();
      assert.equal(response, expectedResponse);
    });
  });
});
