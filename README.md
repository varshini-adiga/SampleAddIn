## Accessing dev tools CLI
* Clone this repository.
* Download and Install NodeJS.
* Open terminal and cd into the directory, where this repository was cloned.
* Run `npm install`, this will install all the dev tools packages present in libs folder.

## Set up Chrome
* Open chrome://flags
* Enable this flag: *Allow invalid certificates for resources loaded from localhost*.
* Restart Chrome

## Create and Host Add-in 
* Run command `npx @wxp/create-wxp-app <add-in-name> --kind <widget> <--verbose>`

Described below are the arguments used with npx @wxp/create-wxp-app:

Argument  | Optional | Default Value | Description
------------- | ------------- | ------------- | -------------
verbose   | Yes | False | Setting this argument enables the verbose flag on the underlying operations.
kind | Yes | Widget | This is the kind of Add-In which will be created. This can be a widget or a plugin.
add-in-name | No | | Name of the Add-In. A new Add-In project with this argument will be created in the user's current working directory.

* Run `cd <add-in-name>`
* Build it using `npm run build`
* Host the Add-In `npm run start -- --url '<https://...spice-base-url.../id/urn:aaid:sc:AP:...>`

Described below are the arguments used with npm run start:

Argument  | Optional | Default Value | Description
------------- | ------------- | ------------- | -------------
url   | no |  | This is the URL of the Spice document where the developer wants to sideload the Add-In. This document must be created before executing npm run start.

The start script after being executed with the Spice document URL option, returns the same URL with the hosted Add-In's port details appended as query string parameters

## Sideloading the Add-In in a Spice Document
* Create new Spice document URL.
* Open the Developer Console in the Browser and execute the below command:
`
DEBUG.setBrowserFlag("add-ins", true);
DEBUG.setBrowserFlag("iframe-widgets-enabled", true);
DEBUG.setBrowserFlag("demo-iframe-widget-shortcuts", true);
DEBUG.setBrowserFlag("add-in-dev-tools-enabled", true);
`
* In the Browser URL replace `/is/urn:...` by `/new`
* Copy the new document URL and run `cd <add-in-name>`, and run `npm run start -- --url '<copied new document URL>`.
* Append the URL params appearing in terminal in the Browser URL and press Enter.
* Open the Developer Console in the Browser and execute command `DEBUG.enableAddInDeveloperMode()`. Executing this enables Developer mode in the Spice document for the current Browser's session. 
* Now to sideload the hosted Add-In in the Spice document, execute the below command in the Developer Console
`DEBUG.loadAddIn('<add-in-name>')`
