/* global describe:true, it:true, assert:true, FireFoxCallSiteFactory:true */

var FireFoxExceptions = {
    firefox_36: {
      exception: {
        fileName: "http://127.0.0.1:8000/js/stacktrace.js",
        lineNumber: 44,
        message: "this.undef is not a function",
        name: "TypeError",
        stack: "()@http://127.0.0.1:8000/js/stacktrace.js:44\n" +
        "(null)@http://127.0.0.1:8000/js/stacktrace.js:31\n" +
        "printStackTrace()@http://127.0.0.1:8000/js/stacktrace.js:18\n" +
        "bar(1)@http://127.0.0.1:8000/js/test/functional/testcase1.html:13\n" +
        "bar(2)@http://127.0.0.1:8000/js/test/functional/testcase1.html:16\n" +
        "foo()@http://127.0.0.1:8000/js/test/functional/testcase1.html:20\n" +
        "@http://127.0.0.1:8000/js/test/functional/testcase1.html:24\n" +
        ""
      },
      expected: {
        name: "TypeError",
        message: "this.undef is not a function",
        frames: [
          {
            functionName: '',
            fileName: 'http://127.0.0.1:8000/js/stacktrace.js',
            lineNumber: 44,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: '',
            fileName: 'http://127.0.0.1:8000/js/stacktrace.js',
            lineNumber: 31,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'printStackTrace',
            fileName: 'http://127.0.0.1:8000/js/stacktrace.js',
            lineNumber: 18,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'bar',
            fileName: 'http://127.0.0.1:8000/js/test/functional/testcase1.html',
            lineNumber: 13,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'bar',
            fileName: 'http://127.0.0.1:8000/js/test/functional/testcase1.html',
            lineNumber: 16,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'foo',
            fileName: 'http://127.0.0.1:8000/js/test/functional/testcase1.html',
            lineNumber: 20,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: '',
            fileName: 'http://127.0.0.1:8000/js/test/functional/testcase1.html',
            lineNumber: 24,
            columnNumber: 0,
            'function': undefined
          }
        ]
      }
    },

    firefox_36_file: {
      exception: {
        fileName: "file:///home/user/js/stacktrace.js",
        lineNumber: 44,
        message: "this.undef is not a function",
        name: "TypeError",
        stack: "()@file:///home/user/js/stacktrace.js:44\n" +
        "(null)@file:///home/user/js/stacktrace.js:31\n" +
        "printStackTrace()@file:///home/user/js/stacktrace.js:18\n" +
        "bar(1)@file:///home/user/js/test/functional/testcase1.html:13\n" +
        "bar(2)@file:///home/user/js/test/functional/testcase1.html:16\n" +
        "foo()@file:///home/user/js/test/functional/testcase1.html:20\n" +
        "@file:///home/user/js/test/functional/testcase1.html:24\n" +
        ""
      },
      expected: {
        name: 'TypeError',
        message: 'this.undef is not a function',
        frames: [
          {
            functionName: '',
            fileName: 'file:///home/user/js/stacktrace.js',
            lineNumber: 44,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: '',
            fileName: 'file:///home/user/js/stacktrace.js',
            lineNumber: 31,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'printStackTrace',
            fileName: 'file:///home/user/js/stacktrace.js',
            lineNumber: 18,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'bar',
            fileName: 'file:///home/user/js/test/functional/testcase1.html',
            lineNumber: 13,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'bar',
            fileName: 'file:///home/user/js/test/functional/testcase1.html',
            lineNumber: 16,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: 'foo',
            fileName: 'file:///home/user/js/test/functional/testcase1.html',
            lineNumber: 20,
            columnNumber: 0,
            'function': undefined
          },
          {
            functionName: '',
            fileName: 'file:///home/user/js/test/functional/testcase1.html',
            lineNumber: 24,
            columnNumber: 0,
            'function': undefined
          }
        ]
      }
    },

    firefox_7: {
      exception: {
        fileName: "file:///G:/js/stacktrace.js",
        lineNumber: 44,
        stack: "()@file:///G:/js/stacktrace.js:44\n" +
        "(null)@file:///G:/js/stacktrace.js:31\n" +
        "printStackTrace()@file:///G:/js/stacktrace.js:18\n" +
        "bar(1)@file:///G:/js/test/functional/testcase1.html:13\n" +
        "bar(2)@file:///G:/js/test/functional/testcase1.html:16\n" +
        "foo()@file:///G:/js/test/functional/testcase1.html:20\n" +
        "@file:///G:/js/test/functional/testcase1.html:24\n" +
        ""
      },
      expected: {
        name: undefined,
        message: undefined,
        frames: []
      }
    },

    firefox_14: {
      exception: {
        message: "x is null",
        stack: "@file:///Users/eric/src/javascript-stacktrace/test/functional/ExceptionLab.html:48\n" +
            "dumpException3@file:///Users/eric/src/javascript-stacktrace/test/functional/ExceptionLab.html:52\n" +
            "onclick@file:///Users/eric/src/javascript-stacktrace/test/functional/ExceptionLab.html:1\n" +
            "",
        fileName: "file:///Users/eric/src/javascript-stacktrace/test/functional/ExceptionLab.html",
        lineNumber: 48
      },
      expected: {
        name: undefined,
        message: 'x is null',
        frames: []
      }
    }
  };

describe('FireFox', function () {
  for (var key in FireFoxExceptions) {
    describe(key, function () {
      var struct = FireFoxCallSiteFactory(FireFoxExceptions[key].exception);
      var expected = FireFoxExceptions[key].expected;

      it('should have the right name', function () {
        assert.equal(struct.name, expected.name);
      });

      it('should have the right message', function () {
        assert.equal(struct.message, expected.message);
      });

      describe('frames', function () {
        it('should have the right # of frames', function () {
          assert.equal(struct.frames.length, expected.frames.length);
        });

        for (var i = 0; i < struct.frames.length; i++) {
          var frame = struct.frames[i].__struct;
          var expectedFrame = expected.frames[i];

          it('should match frame '+ i, function () {
            assert.deepEqual(frame, expectedFrame);
          });
        }
      });
    });
  }
});
