var defaultText = `(function(ConvergenceDomain, connectionConfig) {
  function CodeEditor() { }
  CodeEditor.prototype = {
    connect: function() {
      this.domain = new ConvergenceDomain(connectionConfig.DOMAIN_URL);
      this.domain.on("connected", function () {
        this.connectButton.disabled = true;
        this.disconnectButton.disabled = false;
        this.usernameSelect.disabled = true;
      }.bind(this));
    
      var username = this.usernameSelect.options[this.usernameSelect.selectedIndex].value;
      this.domain.authenticateWithPassword(username, "password").then(function (username) {
        return this.domain.modelService().open("example", "ace-demo");
      }.bind(this)).then(function (model) {
        this.model = model;
        // The RealTimeString that holds the text document
        this.rtString = model.valueAt("text");
      }.bind(this));
    }
  };
  return new CodeEditor();
}(ConvergenceDomain, ConvergenceConfig));`;

export default defaultText;
