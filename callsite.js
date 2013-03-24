;(function(window, Error) {

  function CallSite(struct) {
    var self = this;

    this.func = struct['function'];

    this.getThis = function getThis() {
      return self;
    };

    this.getTypeName = function getTypeName() {
      //
    };

    this.getFunction = function getFunction() {
      return this.func;
    };

    this.getFunctionName = function getFunctionName() {
      return struct.functionName;
    };

    this.getMethodName = function getMethodName() {
      return struct.methodName;
    };

    this.getFileName = function getFileName() {
      return struct.fileName;
    };

    this.getLineNumber = function getLineNumber() {
      return struct.lineNumber || 0;
    };

    this.getColumnNumber = function getColumnNumber() {
      return struct.columnNumber || 0;
    };

    this.getEvalOrigin = function getEvalOrigin() {
      //
    };

    this.isTopLevel = function isTopLevel() {
      //
    };

    this.isEval = function isEval() {
      //
    };

    this.isNative = function isNative() {
      //
    };

    this.isConstructor = function isConstructor() {
      //
    };

    this.getArguments = function getArguments() {
      // lol, I'm going to add this
    };

    this.toString = function toString() {
      var location = [struct.fileName, struct.lineNumber, struct.columnNumber].join(':');
      return struct.functionName + ' (' + location + ')';
    };
  }

  function callSiteFactory(error) {
    var factory,
        stack = error.stack,
        name = error.name,
        message = error.message;

    if (error.stacktrace) {
      factory = makeOperaCallSite;
      stack = error.stacktrace;
    }

    return {
      makeStruct: factory || makeFireFoxCallSite,
      name: name,
      message: message,
      stack: stack
    };
  }

  var FireFox_re = /^([^@]*)@(.*?):(\d+)(?::(\d+))?$/;

  function makeFireFoxCallSite(line, func) {
    var match = line.match(FireFox_re);
    return {
      functionName: match[1] || '<anonymous>',
      fileName: match[2] || '',
      lineNumber: ~~match[3] || 0,
      columnNumber: ~~match[4] || 0,
      'function': func
    };
  }

  function makeOperaCallSite(line) {
    // derp
  }

  var function_re = /function\s*(.*?)\((.*?)\)/;

  Error.captureStackTrace = function captureStackTrace(error, topLevel) {
    // Simultaneously traverse the frames in error.stack and the arguments.caller
    // to build a list of CallSite objects
    var factory = callSiteFactory(error);
    var nativeStack = factory.stack.split('\n');
    var c = arguments.callee;
    var frames = [];
    while (c = c.caller) {
      frames.push(new CallSite(factory.makeStruct(nativeStack.shift(), c)));
    }

    // Explicitly set back the error.name and error.message
    error.name = factory.name;
    error.message = factory.message;

    var error_string = error.name + ': ' + error.message;

    // Pass the raw callsite objects through and get back a formatted stack trace
    var makeStack = Error.prepareStackTrace || defaultPrepareStackTrace;
    error.stack = makeStack(error_string, frames);
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

})(this, Error);
