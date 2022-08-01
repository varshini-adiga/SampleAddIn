import { getModules } from "../../scripts/update";
import axios, { AxiosRequestConfig } from "axios";
import sinon, { SinonSandbox } from "sinon";
import { PassThrough } from "stream";
import assert from "assert";

describe("update", function () {
  describe("getModules()", function () {
    let sandbox: SinonSandbox;

    const config1: AxiosRequestConfig = {
      method: "get",
      responseType: "stream",
      auth: {
        username: process.env.USER!,
        password: process.env.APIKEY!,
      },
    };

    const config2: AxiosRequestConfig = {
      method: "get",
      auth: {
        username: process.env.USER!,
        password: process.env.APIKEY!,
      },
    };

    beforeEach(function () {
      sandbox = sinon.createSandbox();
    });

    afterEach(function () {
      sandbox.restore();
    });

    it(`should download all the modules`, async () => {
      const axiosStub = sandbox.stub(axios, "get");

      axiosStub.withArgs(sinon.match.any, config2).resolves(
        Promise.resolve({
          data: {
            versions: {
              "1.0.0": {
                dist: {
                  tarball:
                    "https://artifactory-no1.corp.adobe.com/artifactory/api/npm/npm-wxp-dev/@wxp/cwa-scaffolder/-/@wxp/cwa-scaffolder-0.1.4.tgz",
                },
              },
            },
            "dist-tags": {
              latest: "1.0.0",
            },
          },
        })
      );

      const mockResponse = `{"data": "fake response text"}`;
      const mockStream = new PassThrough();
      mockStream.push(mockResponse);
      mockStream.end();

      axiosStub.withArgs(sinon.match.any, config1).resolves(
        Promise.resolve({
          data: mockStream,
        })
      );

      sinon.spy(mockStream, "pipe");

      await getModules();
      assert.equal(axiosStub.callCount, 14);
    });
  });
});
