/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ace = __webpack_require__(1);

	var _ace2 = _interopRequireDefault(_ace);

	var _AceExample = __webpack_require__(2);

	var _AceExample2 = _interopRequireDefault(_AceExample);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var suppressEvents = false;
	var users = {};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ace;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ace = __webpack_require__(3);

	var _Ace2 = _interopRequireDefault(_Ace);

	var _ReferenceHandler = __webpack_require__(4);

	var _ReferenceHandler2 = _interopRequireDefault(_ReferenceHandler);

	var _defaultText = __webpack_require__(5);

	var _defaultText2 = _interopRequireDefault(_defaultText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AceExample = function () {
	  function AceExample() {
	    _classCallCheck(this, AceExample);
	  }

	  _createClass(AceExample, [{
	    key: 'connect',
	    value: function connect() {
	      this.getDomElements();

	      var username = this.usernameSelect.options[this.usernameSelect.selectedIndex].value;
	      example.connectWithUser(username, "password").then(function (domain) {
	        this.toggleConnectionElements(true);
	        this.domain = domain;
	        return domain.models().open("example", "ace-demo", function (collectionId, modelId) {
	          return {
	            "text": _defaultText2.default
	          };
	        });
	      }.bind(this)).then(function (model) {
	        this.model = model;
	        // The RealTimeString that holds the text document
	        this.rtString = model.valueAt("text");

	        this.ace = new _Ace2.default(ace);
	        this.ace.initialize(this.rtString);

	        this.createListeners(this.rtString);
	      }.bind(this));
	    }
	  }, {
	    key: 'getDomElements',
	    value: function getDomElements() {
	      this.usersList = document.getElementById("sessions");
	      this.usernameSelect = document.getElementById("username");
	      this.connectButton = document.getElementById("connectButton");
	      this.disconnectButton = document.getElementById("disconnectButton");
	    }

	    ///////////////////////////////////////////////////////////////////////////////
	    // Two Way Binding from Ace to Convergence
	    ///////////////////////////////////////////////////////////////////////////////

	  }, {
	    key: 'createListeners',
	    value: function createListeners(rtString) {
	      this.registerUserListeners();
	      this.registerModelListeners();

	      this.handleAceEditEvent = this.handleAceEditEvent.bind(this);
	      this.ace.editor.on('change', this.handleAceEditEvent);

	      // create ref object
	      this.referenceHandler = new _ReferenceHandler2.default(rtString, this.ace);
	    }

	    ///////////////////////////////////////////////////////////////////////////////
	    // Incoming events
	    ///////////////////////////////////////////////////////////////////////////////

	  }, {
	    key: 'registerUserListeners',
	    value: function registerUserListeners() {
	      this.model.connectedSessions().forEach(function (session) {
	        this.addUser(session.username, session.sessionId);
	      }.bind(this));

	      this.model.on("session_opened", function (e) {
	        this.addUser(e.username, e.sessionId);
	      }.bind(this));

	      this.model.on("session_closed", function (e) {
	        this.removeUser(e.sessionId);
	      }.bind(this));
	    }
	  }, {
	    key: 'addUser',
	    value: function addUser(username, sessionId) {
	      var color = example.getConvergenceColor();
	      users[sessionId] = {
	        username: username,
	        sessionId: sessionId,
	        color: color
	      };

	      this.domain.identity().user(username).then(function (user) {
	        var userDiv = document.createElement("div");
	        userDiv.className = "session";
	        userDiv.id = "user" + sessionId;

	        var squareDiv = document.createElement("div");
	        squareDiv.className = "userSquare";
	        squareDiv.style.background = color;
	        userDiv.appendChild(squareDiv);

	        var usernameDiv = document.createElement("div");
	        if (!user.firstName && !user.lastName) {
	          usernameDiv.innerHTML = user.username;
	        } else {
	          usernameDiv.innerHTML = user.firstName + " " + user.lastName;
	        }

	        userDiv.appendChild(usernameDiv);

	        this.usersList.appendChild(userDiv);
	      }.bind(this));
	    }
	  }, {
	    key: 'removeUser',
	    value: function removeUser(sessionId) {
	      var user = document.getElementById("user" + sessionId);
	      user.parentNode.removeChild(user);
	      delete users[sessionId];
	    }
	  }, {
	    key: 'registerModelListeners',
	    value: function registerModelListeners() {
	      this.rtString.on("insert", function (e) {
	        this.ace.onRemoteInsert(e);
	      }.bind(this));

	      this.rtString.on("remove", function (e) {
	        this.ace.onRemoteDelete(e);
	      }.bind(this));

	      this.rtString.on("value", function (e) {
	        this.ace.onRemoteAdd(e);
	      }.bind(this));
	    }

	    ///////////////////////////////////////////////////////////////////////////////
	    // Outgoing events
	    ///////////////////////////////////////////////////////////////////////////////

	  }, {
	    key: 'handleAceEditEvent',
	    value: function handleAceEditEvent(delta) {
	      if (suppressEvents) {
	        return;
	      }

	      var pos = this.ace.document.positionToIndex(delta.start);
	      switch (delta.action) {
	        case "insert":
	          this.rtString.insert(pos, delta.lines.join("\n"));
	          break;
	        case "remove":
	          this.rtString.remove(pos, delta.lines.join("\n").length);
	          break;
	        default:
	          throw new Error("unknown action: " + delta.action);
	      }
	    }
	  }, {
	    key: 'toggleConnectionElements',
	    value: function toggleConnectionElements(isConnected) {
	      this.connectButton.disabled = isConnected;
	      this.disconnectButton.disabled = !isConnected;
	      this.usernameSelect.disabled = isConnected;
	    }
	  }, {
	    key: 'disconnect',
	    value: function disconnect() {
	      this.domain.dispose();
	      this.toggleConnectionElements(false);

	      this.ace.editor.off('change', this.handleAceEditEvent);

	      this.referenceHandler.detach();

	      this.ace.reset();

	      this.ace.cursorManager.removeAll();
	      this.ace.selectionManager.removeAll();

	      Object.getOwnPropertyNames(users).forEach(function (sessionId) {
	        this.removeUser(sessionId);
	      }.bind(this));
	    }
	  }]);

	  return AceExample;
	}();

	exports.default = AceExample;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ace = function () {
	  function Ace(ace) {
	    _classCallCheck(this, Ace);

	    this.editor = ace.edit("editor");
	    this.editor.setReadOnly(true);
	    this.session = this.editor.getSession();
	    this.document = this.session.getDocument();

	    this.session.setMode("ace/mode/javascript");
	    this.editor.setTheme("ace/theme/monokai");

	    this.cursorManager = new AceMultiCursorManager(this.session);
	    this.selectionManager = new AceMultiSelectionManager(this.session);
	  }

	  _createClass(Ace, [{
	    key: "initialize",
	    value: function initialize(rtString) {
	      this.editor.setReadOnly(false);

	      // Initialize editor with current text.
	      suppressEvents = true;
	      this.document.setValue(rtString.data());
	      suppressEvents = false;
	    }
	  }, {
	    key: "onRemoteInsert",
	    value: function onRemoteInsert(e) {
	      suppressEvents = true;
	      this.document.insert(this.document.indexToPosition(e.index), e.value);
	      suppressEvents = false;
	    }
	  }, {
	    key: "onRemoteDelete",
	    value: function onRemoteDelete(e) {
	      var start = this.document.indexToPosition(e.index);
	      var end = this.document.indexToPosition(e.index + e.value.length);
	      suppressEvents = true;
	      this.document.remove(new AceRange(start.row, start.column, end.row, end.column));
	      suppressEvents = false;
	    }
	  }, {
	    key: "onRemoteAdd",
	    value: function onRemoteAdd(e) {
	      suppressEvents = true;
	      this.document.setValue(e.value);
	      suppressEvents = false;
	    }
	  }, {
	    key: "setSelection",
	    value: function setSelection(id, value) {
	      this.selectionManager.setSelection(id, this.toAceRange(value));
	    }
	  }, {
	    key: "toAceRange",
	    value: function toAceRange(value) {
	      if (value === null || value === undefined) {
	        return null;
	      }

	      var start = value.start;
	      var end = value.end;

	      if (start > end) {
	        var temp = start;
	        start = end;
	        end = temp;
	      }

	      var selectionAnchor = this.document.indexToPosition(start);
	      var selectionLead = this.document.indexToPosition(end);
	      return new AceRange(selectionAnchor.row, selectionAnchor.column, selectionLead.row, selectionLead.column);
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.editor.setValue("");
	      this.editor.setReadOnly(true);
	    }
	  }]);

	  return Ace;
	}();

	exports.default = Ace;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ReferenceHandler = function () {
	  function ReferenceHandler(rtString, ace) {
	    _classCallCheck(this, ReferenceHandler);

	    this.ace = ace;
	    // Create and publish a local cursor.
	    this.localCursor = rtString.indexReference("cursor");
	    this.localCursor.publish();

	    // Create and publish a local selection.
	    this.localSelection = rtString.rangeReference("selection");
	    this.localSelection.publish();

	    this.initializeExistingReferences(rtString, ace);

	    // Listen for remote references.
	    rtString.on("reference", function (e) {
	      this.handleReference(e.reference);
	    }.bind(this));

	    this.handleAceCursorChanged = this.handleAceCursorChanged.bind(this);
	    this.handleAceSelectionChanged = this.handleAceSelectionChanged.bind(this);

	    this.ace.session.selection.on('changeCursor', this.handleAceCursorChanged);
	    this.ace.session.selection.on('changeSelection', this.handleAceSelectionChanged);
	  }

	  _createClass(ReferenceHandler, [{
	    key: "initializeExistingReferences",
	    value: function initializeExistingReferences(rtString) {
	      rtString.references().forEach(function (reference) {
	        if (!reference.isLocal()) {
	          this.handleReference(reference);
	          if (reference.key() === "cursor") {
	            this.ace.cursorManager.setCursor(reference.sessionId(), reference.value());
	          } else if (reference.key() === "selection") {
	            this.ace.setSelection(reference.sessionId(), reference.value());
	          }
	        }
	      }.bind(this));
	    }

	    ///////////////////////////////////////////////////////////////////////////////
	    // Incoming events
	    ///////////////////////////////////////////////////////////////////////////////

	  }, {
	    key: "handleReference",
	    value: function handleReference(reference) {
	      if (reference.key() === "cursor") {
	        this.handleRemoteCursorReference(reference);
	      } else if (reference.key() === "selection") {
	        this.handleRemoteSelectionReference(reference);
	      }
	    }
	  }, {
	    key: "handleRemoteCursorReference",
	    value: function handleRemoteCursorReference(reference) {
	      var color = users[reference.sessionId()].color;
	      this.ace.cursorManager.addCursor(reference.sessionId(), reference.username(), color);

	      reference.on("set", function () {
	        this.ace.cursorManager.setCursor(reference.sessionId(), reference.value());
	      }.bind(this));

	      reference.on("cleared", function () {
	        this.ace.cursorManager.clearCursor(reference.sessionId());
	      }.bind(this));

	      reference.on("disposed", function () {
	        this.ace.cursorManager.removeCursor(reference.sessionId());
	      }.bind(this));
	    }
	  }, {
	    key: "handleRemoteSelectionReference",
	    value: function handleRemoteSelectionReference(reference) {
	      var color = users[reference.sessionId()].color;
	      this.ace.selectionManager.addSelection(reference.sessionId(), reference.username(), color);

	      reference.on("set", function (e) {
	        this.ace.setSelection(reference.sessionId(), e.src.value());
	      }.bind(this));

	      reference.on("cleared", function () {
	        this.ace.selectionManager.clearSelection(reference.sessionId());
	      }.bind(this));

	      reference.on("disposed", function () {
	        this.ace.selectionManager.removeSelection(reference.sessionId());
	      }.bind(this));
	    }

	    ///////////////////////////////////////////////////////////////////////////////
	    // Outgoing events
	    ///////////////////////////////////////////////////////////////////////////////

	  }, {
	    key: "handleAceCursorChanged",
	    value: function handleAceCursorChanged() {
	      if (!suppressEvents) {
	        var pos = this.ace.document.positionToIndex(this.ace.editor.getCursorPosition());
	        this.localCursor.set(pos);
	      }
	    }
	  }, {
	    key: "handleAceSelectionChanged",
	    value: function handleAceSelectionChanged() {
	      if (!suppressEvents) {
	        if (!this.ace.editor.selection.isEmpty()) {
	          // todo ace has more complex seleciton capabilities beyond a single range.
	          var start = this.ace.document.positionToIndex(this.ace.editor.selection.anchor);
	          var end = this.ace.document.positionToIndex(this.ace.editor.selection.lead);
	          this.localSelection.set({ start: start, end: end });
	        } else if (this.localSelection.isSet()) {
	          this.localSelection.clear();
	        }
	      }
	    }
	  }, {
	    key: "detach",
	    value: function detach() {
	      this.ace.session.selection.off('changeCursor', this.handleAceCursorChanged);
	      this.ace.session.selection.off('changeSelection', this.handleAceSelectionChanged);
	    }
	  }]);

	  return ReferenceHandler;
	}();

	exports.default = ReferenceHandler;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultText = "(function(ConvergenceDomain, connectionConfig) {\n  function CodeEditor() { }\n  CodeEditor.prototype = {\n    connect: function() {\n      this.domain = new ConvergenceDomain(connectionConfig.DOMAIN_URL);\n      this.domain.on(\"connected\", function () {\n        this.connectButton.disabled = true;\n        this.disconnectButton.disabled = false;\n        this.usernameSelect.disabled = true;\n      }.bind(this));\n    \n      var username = this.usernameSelect.options[this.usernameSelect.selectedIndex].value;\n      this.domain.authenticateWithPassword(username, \"password\").then(function (username) {\n        return this.domain.modelService().open(\"example\", \"ace-demo\");\n      }.bind(this)).then(function (model) {\n        this.model = model;\n        // The RealTimeString that holds the text document\n        this.rtString = model.valueAt(\"text\");\n      }.bind(this));\n    }\n  };\n  return new CodeEditor();\n}(ConvergenceDomain, ConvergenceConfig));";

	exports.default = defaultText;

/***/ }
/******/ ]);