#!/usr/bin/env node

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2022 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

import axios, { AxiosRequestConfig } from "axios";
import fs from "fs";
import Path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const localModules: string[] = [];

(async () => {
  deleteLocalLibs();
  await getModules();
})().catch((err) => {
  console.error(err);
});

export function deleteLocalLibs() {
  fs.rmSync("./libs", { recursive: true, force: true });
  fs.mkdirSync("./libs");
}

export async function getModules() {
  await getLatestArtifact("wxp-core");
  await getLatestArtifact("wxp-scripts");
  await getLatestArtifact("create-wxp-app");
  await getLatestArtifact("cwa-scaffolder");
  await getLatestArtifact("cwa-managed-plugin-template");
  await getLatestArtifact("cwa-quickjs-plugin-template");
  await getLatestArtifact("cwa-iframe-widget-template");
}

export async function getLatestArtifact(name: string) {
  console.log("get latest artifact url for " + name);

  const config: AxiosRequestConfig = {
    method: "get",
    auth: {
      username: process.env.USER!,
      password: process.env.APIKEY!,
    },
  };

  const response: {
    data: {
      versions: { [key: string]: { dist: { tarball: string } } };
      "dist-tags": { latest: string };
    };
  } = await axios.get(
    "https://artifactory-no1.corp.adobe.com/artifactory/api/npm/npm-wxp-dev/@wxp/" +
      name +
      "/",
    config
  );

  const latestVersion: string = response.data["dist-tags"].latest;
  const url: string = response.data.versions[latestVersion]["dist"]["tarball"];
  const tarFile = url
    .substring(url.lastIndexOf("/") + 1)
    .replace(/-[\d]+\.[\d]+\.[\d]+\.tgz/, ".tgz");
  localModules.push("./libs/" + tarFile);
  console.log("url " + url);
  await downloadArtifact(tarFile, url);
}

export async function downloadArtifact(name: string, url: string) {
  const path = Path.resolve(__dirname, "..", "libs", name);
  const writer: fs.WriteStream = fs.createWriteStream(path);
  const config: AxiosRequestConfig = {
    method: "get",
    responseType: "stream",
    auth: {
      username: process.env.USER!,
      password: process.env.APIKEY!,
    },
  };

  const response: { data: { pipe: (writer: fs.WriteStream) => void } } =
    await axios.get(url, config);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
