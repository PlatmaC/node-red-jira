Fork of the node-red-contrib-jiira-api package.
[node-red-contrib-jiira-api repository](https://github.com/Boohja/node-red-contrib-jira-api.git)

# node-red-contrib-jira-api
[Atlassian Jira API v2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about) nodes for [Node-RED](https://nodered.org/).\
In contrast to other packages, this one does not rely on the users actual password but an access token.

You need an Atlassian Jira access token to use these nodes.

## Features
Add new, update and retrieve issues on jira.

## Use Cases
**1. Automated issue creation**

**2. Automated updating or changing status of issues**

**3. Create custom dashboards with issues**

## Installation

You can either install this package from within Node-RED using the command palette and search for "node-red-jira-api", or you run the following command in your Node-RED user directory (typically `~/.node
red` on Linux, `%APPDATA%\node-red` on Windows):

```bash
npm install node-red-jira-api
``` 

## List nodes

## Node has 4 functions for using: ##
* get issue - retrieve issue by ID or name
* add issue - create new issue 
* edit issue - change specified by id or name issue properties

## Node input properties: ##
All properties have to be inside msg object.

**issue** - issue id or name either
**fields** - object with all issue data 
**update** - object with data to update
**properties** - represents issue properties, which provides for storing custom data against an issue.
**historyMetadata** - represents the complete set of metadata for a history changegroup.

Instructions of how to describe document you can find at jira api website.

[pdfmake website doc](https://developer.atlassian.com/cloud/jira/platform/rest/v2/i)