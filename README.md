# node-red-contrib-jira-api
[Atlassian Jira API v2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about) nodes for [Node-RED](https://nodered.org/).\
In contrast to other packages, this one does not rely on the users actual password but an access token.

You need an Atlassian Jira access token to use these nodes.

## Features

### Nodes
* Get a specific issue
* Edit n issue

More nodes will be added over time.
I don't expect a high demand for this package anyways, but if missing nodes get requested, I should be able to add them rather quickly.


## Installation

You can either install this package from within Node-RED using the command palette and search for "node-red-contrib-jira-api", or you run the following command in your Node-RED user directory (typically `~/.node
red` on Linux, `%APPDATA%\node-red` on Windows):

```bash
npm install node-red-contrib-jira-api
```