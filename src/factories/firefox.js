/* global CallSite:true */

var FireFox_re = /^([^@]*)@(.*?):(\d+)(?::(\d+))?$/;

function FireFoxCallSiteFactory(error, fn) {
  var lines = error.stack.split('\n'),
      frames = [], i = 0, line, match;

  while (line = lines[i++]) {
    match = line.match(FireFox_re);
    frames.push(new CallSite({
      functionName: match[1],
      fileName: match[2] || '',
      lineNumber: ~~match[3] || 0,
      columnNumber: ~~match[4] || error.columnNumber || 0,
      'function': fn
    }));
    fn = fn.caller;
  }

  return {
    name: error.name,
    message: error.message,
    frames: frames
  };
}
