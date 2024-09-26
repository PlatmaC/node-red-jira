const {apiPost} = require('./helpers/api');
const {copyToNodeProp, convertInputToJson} = require("./helpers/nodes");

module.exports = function(RED) {
  function AddIssueNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.credentials = RED.nodes.getCredentials(config.server);

    copyToNodeProp(node, 'params', config, ['issue', 'fields', 'properties', 'historyMetadata', 'update']);

    node.on('input', async function(msg) {
      node.status({ "fill": "gray", "shape": "dot", "text": "Starting" });
      //const issue = msg.issue || node.params.issue
      
      const bodyObject = {}
      try {
        const fields = convertInputToJson(msg.fields, node.params.fields)
        if (fields) {
          bodyObject.fields = fields
        }
      }
      catch (error) {
        msg.error = `Could not parse fields: ${error.message}`
        return node.send([null, msg])
      }

      try {
        const properties = convertInputToJson(msg.properties, node.params.properties)
        if (properties) {
          bodyObject.properties = properties
        }
      }
      catch (error) {
        msg.error = `Could not parse properties: ${error.message}`
        return node.send([null, msg])
      }

      try {
        const historyMetadata = convertInputToJson(msg.historyMetadata, node.params.historyMetadata)
        if (historyMetadata) {
          bodyObject.historyMetadata = historyMetadata
        }
      }
      catch (error) {
        msg.error = `Could not parse historyMetadata: ${error.message}`
        return node.send([null, msg])
      }

      try {
        const update = convertInputToJson(msg.update, node.params.update)
        if (update) {
          bodyObject.update = update
        }
      }
      catch (error) {
        msg.error = `Could not parse update: ${error.message}`
        return node.send([null, msg])
      }

      try {
        msg.payload = await apiPost(node.credentials, `/issue/`, { returnIssue: true }, bodyObject);
        node.status({ "fill": "green", "shape": "dot", "text": "Done" });
        node.send([msg, null]);
      }
      catch (error) {
        msg.error = `Unexpected error: ${error.message}`;
        node.status({ "fill": "red", "shape": "dot", "text": "Error" });
        node.send([null, msg]);
      }
    });
  }
  RED.nodes.registerType("jira-add-issue", AddIssueNode);
};
