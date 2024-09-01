module.exports = function(RED) {
  function JiraServerNode(n) {
    RED.nodes.createNode(this,n);
    this.name = n.name;
    this.apiUrl = n.credentials?.apiUrl;
    this.apiEmail = n.credentials?.apiEmail;
    this.apiKey = n.credentials?.apiKey;
  }
  RED.nodes.registerType("jira-server",JiraServerNode, {
    credentials: {
      apiUrl: {type: "text", required: true},
      apiEmail: {type: "text", required: true},
      apiKey: {type: "password", required: true}
    }
  });
}