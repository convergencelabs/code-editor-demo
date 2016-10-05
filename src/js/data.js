const data = {
  "files": {
    "byId": {
      "1": {
        "id": "1",
        "name": "index.js",
        "content": "/**\n * Represents a push-style collection.\n */\nvar Observable = Rx.Observable = (function () {\n\n  function makeSubscribe(self, subscribe) {\n    return function (o) {\n      var oldOnError = o.onError;\n      o.onError = function (e) {\n        makeStackTraceLong(e, self);\n        oldOnError.call(o, e);\n      };\n\n      return subscribe.call(self, o);\n    };\n  }\n\n  function Observable() {\n    if (Rx.config.longStackSupport && hasStacks) {\n      var oldSubscribe = this._subscribe;\n      var e = tryCatch(thrower)(new Error()).e;\n      this.stack = e.stack.substring(e.stack.indexOf('\\n') + 1);\n      this._subscribe = makeSubscribe(this, oldSubscribe);\n    }\n  }\n});",

      },
      "2": {
        "id": "2",
        "name": "app.js",
        "content": "observableProto = Observable.prototype;\n\n  /**\n  * Determines whether the given object is an Observable\n  * @param {Any} An object to determine whether it is an Observable\n  * @returns {Boolean} true if an Observable, else false.\n  */\n  Observable.isObservable = function (o) {\n    return o && isFunction(o.subscribe);\n  };\n\n  /**\n   *  Subscribes an o to the observable sequence.\n   *  @param {Mixed} [oOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.\n   *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.\n   *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.\n   *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.\n   */\n  observableProto.subscribe = observableProto.forEach = function (oOrOnNext, onError, onCompleted) {\n    return this._subscribe(typeof oOrOnNext === 'object' ?\n      oOrOnNext :\n      observerCreate(oOrOnNext, onError, onCompleted));\n  };",
      },
      "3": {
        "id": "3",
        "name": "header.js",
        "content": "/**\n   * Subscribes to the next value in the sequence with an optional \"this\" argument.\n   * @param {Function} onNext The function to invoke on each element in the observable sequence.\n   * @param {Any} [thisArg] Object to use as this when executing callback.\n   * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.\n   */\n  observableProto.subscribeOnNext = function (onNext, thisArg) {\n    return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));\n  };\n\n  /**\n   * Subscribes to an exceptional condition in the sequence with an optional \"this\" argument.\n   * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.\n   * @param {Any} [thisArg] Object to use as this when executing callback.\n   * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.\n   */\n  observableProto.subscribeOnError = function (onError, thisArg) {\n    return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));\n  };\n\n  /**\n   * Subscribes to the next value in the sequence with an optional \"this\" argument.\n   * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.\n   * @param {Any} [thisArg] Object to use as this when executing callback.\n   * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.\n   */\n  observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {\n    return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));\n  };",
      },
      "4": {
        "id": "4",
        "name": "footer.js",
        "content": "var foo = bar;"
      }
    }
  },
  "editors": {
    "byId": {
      "1": {"fileId": "1", "cursorPosition": {"line": 1, "column": 1}},
      "2": {"fileId": "2", "cursorPosition": {"line": 1, "column": 1}},
      "3": {"fileId": "3", "cursorPosition": {"line": 3, "column": 25}}
    },
    "allIds": ["2", "3", "1"],
    "active": "2"
  },
  "tree": [{
    "id": "f1",
    "name": "js",
    "children": [{
      "fileId": "1"
    }, {
      "fileId": "2"
    }, {
      "id": "f11",
      "name": "controllers",
      "selected": true,
      "children": [{
        "fileId": "3"
      }, {
        "fileId": "4"
      }]
    }]
  }, {
    "id": "f2",
    "name": "sass",
    "children": []
  }]
};
export default data;
