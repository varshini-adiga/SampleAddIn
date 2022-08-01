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

import fs from "fs";
import { execSync } from "child_process";

let fileWxpCore = "";
let fileWxpScripts = "";
let fileWxpCreateApp = "";
let fileWxpScaffolder = "";
let fileWxpManagedPluginTemplate = "";
let fileWxpQuickjsPluginTemplate = "";
let fileWxpIframeWidgetTemplate = "";

export function getInstallCommand(): string {
  const files = fs.readdirSync("./libs/");

  for (const file of files) {
    if (file.includes("wxp-core")) {
      fileWxpCore = "./libs/" + file;
    } else if (file.includes("wxp-scripts")) {
      fileWxpScripts = "./libs/" + file;
    } else if (file.includes("create-wxp-app")) {
      fileWxpCreateApp = "./libs/" + file;
    } else if (file.includes("cwa-scaffolder")) {
      fileWxpScaffolder = "./libs/" + file;
    } else if (file.includes("cwa-managed")) {
      fileWxpManagedPluginTemplate = "./libs/" + file;
    } else if (file.includes("cwa-quickjs")) {
      fileWxpQuickjsPluginTemplate = "./libs/" + file;
    } else if (file.includes("cwa-iframe")) {
      fileWxpIframeWidgetTemplate = "./libs/" + file;
    }
  }

  return (
    "npm install " +
    fileWxpCore +
    " " +
    fileWxpScripts +
    " " +
    fileWxpCreateApp +
    " " +
    fileWxpScaffolder +
    " " +
    fileWxpManagedPluginTemplate +
    " " +
    fileWxpQuickjsPluginTemplate +
    " " +
    fileWxpIframeWidgetTemplate +
    " "
  );
}

const installCmd = getInstallCommand();

console.log(installCmd);

const stdout = execSync(installCmd).toString();

console.log(stdout);
