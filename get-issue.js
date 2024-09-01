const {apiGet} = require('./helpers/api');
const {copyToNodeProp} = require("./helpers/nodes");

module.exports = function(RED) {
  function GetIssueNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.credentials = RED.nodes.getCredentials(config.server);

    copyToNodeProp(node, 'params', config, ['issue', 'fields', 'properties']);

    node.on('input', async function(msg) {
      node.status({ "fill": "gray", "shape": "dot", "text": "Starting" });
      const issue = msg.issue || node.params.issue
      const queryObject = {}
      if ( msg.fields ||node.params.fields) {
        queryObject.fields = (msg.fields || node.params.fields).split(',').map(prop => prop.trim())
      }
      if (msg.properties ||node.params.properties) {
        queryObject.properties = (msg.properties || node.params.properties).split(',').map(prop => prop.trim())
      }
      try {
        msg.payload = await apiGet(node.credentials, `/issue/${issue}`, queryObject);
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
  RED.nodes.registerType("jira-get-issue", GetIssueNode);
};
