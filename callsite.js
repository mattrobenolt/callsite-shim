;(function(window, Error) {

  function CallSite(line) {
    var self = this;

    this.getThis = function getThis() {
      return self;
    };

    this.getTypeName = function getTypeName() {
      //
    };

    this.getFunction = function getFunction() {
      //
    };

    this.getFunctionName = function getFunctionName() {
      //
    };

    this.getMethodName = function getMethodName() {
      //
    };

    this.getFileName = function getFileName() {
      //
    };

    this.getLineNumber = function getLineNumber() {
      //
    };

    this.getColumnNumber = function getColumnNumber() {
      //
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
  }

  Error.captureStackTrace = function captureStackTrace(error, topLevel) {
    // Simultaneously traverse the frames in error.stack and the arguments.caller
    // to build a list of CallSite objects
    var nativeStack = error.stack;
    var frames = [];

    // Pass the raw callsite objects through and get back a formatted stack trace
    error.stack = Error.prepareStackTrace(error, frames);
  };

  Error.prepareStackTrace = function prepareStackTrace(error, frames) {
    // Do magic to return the default stack trace that mimics V8 as much as possible
    return frames;
  };

})(this, Error);
