/**
 * Simplewebservice Sift. DAG's 'Simple RPC' node implementation
 */
'use strict';

// Entry point for DAG node
// got ={
//   in: ... // contains the key/value pairs that match the given query
//   with: ... // key/value pairs selected based on the with selection
//   lookup: ... // an array with result of lookup for a specific key
//   query: ... // an array containing the key hierarchy
// }
// for more info have a look at:
// http://docs.redsift.com/docs/server-code-implementation

const newResponse = (status_code, header, body) => {
  return { status_code, header,
    body: Buffer.from(JSON.stringify(body) || '').toString('base64')
  }
}

module.exports = function (got) {
  const inData = got.in.data;
  console.log('simplewebservice: simple.js: data received:', inData);

  return inData.map(d => {
    let req = JSON.parse(d.value);
    console.log(`${req.method}: ${req.request_uri}`);
    let res = newResponse(200, req.header, 'Nice one Mike!');

    return {
      name: 'api_rpc',
      key: d.key,
      value: res
    };
  })
};
