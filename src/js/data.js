const data = {
  "editors": {
    "test1": {
      "tabs": [{
        "modelId": "1f7b0255-8348-4c4d-925c-3e5c52ce63e9"
      }, {
        "modelId": "c50e5e1e-ad88-4cd7-8748-f8eb977a0525"
      }, {
        "modelId": "acb74ec3-2854-4565-86fb-9a9ecb4b949f"
      }]
    }
  },
  "tree": {
    "nodes": {
      "root": {
        "name": "Project",
        "children": ["f1", "f2"]
      },
      "f1": {
        "name": "js",
        "children": ["acb74ec3-2854-4565-86fb-9a9ecb4b949f", "1f7b0255-8348-4c4d-925c-3e5c52ce63e9", "f11"]
      }, 
      "f11": {
        "name": "controllers",
        "children": ["c50e5e1e-ad88-4cd7-8748-f8eb977a0525", "131dde3f-5874-4687-abd1-a5c5e4c7885c"]
      },
      "f2": {
        "name": "sass",
        "children": []
      }, 
      "acb74ec3-2854-4565-86fb-9a9ecb4b949f": {
        "name": "index.js"
      },
      "1f7b0255-8348-4c4d-925c-3e5c52ce63e9": {
        "name": "app.js"
      },
      "c50e5e1e-ad88-4cd7-8748-f8eb977a0525": {
        "name": "header.js"
      },
      "131dde3f-5874-4687-abd1-a5c5e4c7885c": {
        "name": "footer.js"
      }
    }
  }
};
export default data;
