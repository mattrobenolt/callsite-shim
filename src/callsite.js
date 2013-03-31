/* global
  SafariCallSiteFactory:true,
  FireFoxCallSiteFactory:true,
  IECallSiteFactory:true,
  OtherCallSiteFactory:true,
  Opera9CallSiteFactory:true,
  Opera10aCallSiteFactory:true,
  Opera10bCallSiteFactory:true,
  Opera11CallSiteFactory:true
  */

// if (Error.captureStackTrace) return;

function CallSite(struct) {
  this.receiver = window;  // I don't know when this is ever NOT window
  this.func = struct['function'];
  this.__struct = struct;
}

CallSite.prototype = {
  getThis: function CallSiteGetThis() {
    return this.receiver;
  },

  getTypeName: function CallSiteGetTypeName() {
    //
  },

  getFunction: function CallSiteGetFunction() {
    return this.func;
  },

  getFunctionName: function CallSiteGetFunctionName() {
    return this.__struct.functionName;
  },

  getMethodName: function CallSiteGetMethodName() {
    return this.__struct.methodName;
  },

  getFileName: function CallSiteGetFileName() {
    return this.__struct.fileName;
  },

  getLineNumber: function CallSiteGetLineNumber() {
    return this.__struct.lineNumber > 0 ? this.__struct.lineNumber : null;
  },

  getColumnNumber: function CallSiteGetColumnNumber() {
    return this.__struct.columnNumber > 0 ? this.__struct.columnNumber : null;
  },

  getEvalOrigin: function CallSiteGetEvalOrigin() {
    //
  },

  isTopLevel: function CallSiteIsTopLevel() {
    //
  },

  isEval: function CallSiteIsEval() {
    return false;
  },

  isNative: function CallSiteIsNative() {
    //
  },

  isConstructor: function CallSiteIsConstructor() {
    //
  },

  getArguments: function CallSiteGetArguments() {
    return this.fun && this.fun['arguments'] || null;
  },

  toString: function CallSiteToString() {
    var location = [this.getFileName()];
    if (this.getLineNumber()) {
      location.push(this.getLineNumber());
      if (this.getColumnNumber()) {
        location.push(this.getColumnNumber());
      }
    }
    if (this.getFunctionName()) {
      return this.getFunctionName() + ' (' + location.join(':') + ')';
    }
    return location.join(':');
  }
};

function CallSiteFactory(error) {
  if (error.stack && error.sourceURL) {
    return SafariCallSiteFactory;
  }
  if (error.stack && error.number) {
    return IECallSiteFactory;
  }
  if (typeof error.message === 'string' && window.opera) {
    if (!error.stacktrace) {
      return Opera9CallSiteFactory;
    }
    if (~error.message.indexOf('\n') && error.message.split('\n').length > error.stacktrace.split('\n').length) {
      return Opera9CallSiteFactory;
    }
    if (!error.stack) {
      return Opera10aCallSiteFactory;
    }
    if (!~error.stacktrace.indexOf('called from line')) {
      return Opera10bCallSiteFactory;
    }
    return Opera11CallSiteFactory;
  }

  if (error.stack) {
    return FireFoxCallSiteFactory;
  }
  return OtherCallSiteFactory;
}


// var function_re = /function\s*(.*?)\((.*?)\)/;

Error.captureStackTrace = function captureStackTrace(error, topLevel) {
  // Simultaneously traverse the frames in error.stack and the arguments.caller
  // to build a list of CallSite objects
  var factory = CallSiteFactory(error),
      frames = factory(error, arguments.callee);

  // Explicitly set back the error.name and error.message
  error.name = frames.name;
  error.message = frames.message;

  var error_string = error.name + ': ' + error.message;

  // Pass the raw callsite objects through and get back a formatted stack trace
  var makeStack = Error.prepareStackTrace || defaultPrepareStackTrace;
  error.stack = makeStack(error_string, frames.frames);
};

function defaultPrepareStackTrace(error_string, frames) {
  // Adapted from V8 source:
  // https://github.com/v8/v8/blob/1613b7/src/messages.js#L1051-L1070
  var lines = [];
  lines.push(error_string);
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var line;
    try {
      line = frame.toString();
    } catch (e) {
      try {
        line = "<error: " + e + ">";
      } catch (ee) {
        // Any code that reaches this point is seriously nasty!
        line = "<error>";
      }
    }
    lines.push("    at " + line);
  }
  return lines.join('\n');
}
