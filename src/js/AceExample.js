import Ace from './Ace';
import ReferenceHandler from './ReferenceHandler';
import defaultText from './default-text';

export default class AceExample {
  connect() {
    this.getDomElements();

    var username = this.usernameSelect.options[this.usernameSelect.selectedIndex].value;
    example.connectWithUser(username, "password").then(function (domain) {
      this.toggleConnectionElements(true);
      this.domain = domain;
      return domain.models().open("example", "ace-demo", function (collectionId, modelId) {
        return {
          "text": defaultText
        };
      });
    }.bind(this)).then(function (model) {
      this.model = model;
      // The RealTimeString that holds the text document
      this.rtString = model.valueAt("text");

      this.ace = new Ace(ace);
      this.ace.initialize(this.rtString);

      this.createListeners(this.rtString);
    }.bind(this));
  }

  getDomElements() {
    this.usersList = document.getElementById("sessions");
    this.usernameSelect = document.getElementById("username");
    this.connectButton = document.getElementById("connectButton");
    this.disconnectButton = document.getElementById("disconnectButton");
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Two Way Binding from Ace to Convergence
  ///////////////////////////////////////////////////////////////////////////////
  createListeners(rtString) {
    this.registerUserListeners();
    this.registerModelListeners();

    this.handleAceEditEvent = this.handleAceEditEvent.bind(this);
    this.ace.editor.on('change', this.handleAceEditEvent);

    // create ref object
    this.referenceHandler = new ReferenceHandler(rtString, this.ace);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Incoming events
  ///////////////////////////////////////////////////////////////////////////////
  registerUserListeners() {
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

  addUser(username, sessionId) {
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

  removeUser(sessionId) {
    var user = document.getElementById("user" + sessionId);
    user.parentNode.removeChild(user);
    delete users[sessionId];
  }

  registerModelListeners() {
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
  handleAceEditEvent(delta) {
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

  toggleConnectionElements(isConnected) {
    this.connectButton.disabled = isConnected;
    this.disconnectButton.disabled = !isConnected;
    this.usernameSelect.disabled = isConnected;
  }

  disconnect() {
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
}