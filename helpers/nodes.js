function copyToNodeProp (node, field, from, fields) {
  node[field] = fields.reduce((prev, curr) => ({ ...prev, [curr]: from[curr] }), {})
}

function convertInputToJson (msg, param) {
  let result = msg || param
  if (!result) {
    return null
  }
  if (typeof result === 'string') {
    result = JSON.parse(result)
  }
  return result
}

module.exports = {
  copyToNodeProp,
  convertInputToJson
}
