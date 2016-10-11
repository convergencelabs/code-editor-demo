import {ActionTypes} from '../constants/ActionTypes';
import {BaseStore} from './BaseStore';
import {findChildParent} from '../utils';

export default class TreeStore extends BaseStore {
  constructor(rtModel) {
    super();

    this.rtModel = rtModel;

    this.initState();
  }

  initState() {
    this.selectedNode = undefined;
  }

  getTree() {
    return {
      nodes: this.rtModel.valueAt(['tree', 'nodes']),
      selected: this.selectedNode
    };
  }

  actionHandler(action) {
    const payload = action.payload;
    switch (action.type) {
      case ActionTypes.CREATE_FILE:
        this.createFile(payload.id, payload.name, payload.parentId);
        break;
      case ActionTypes.DELETE_FILE:
        this.deleteFile(payload.id);
        break;
      case ActionTypes.RENAME_FILE: 
        this.renameFile(payload.id, payload.newName);
        break;
      case ActionTypes.CREATE_FOLDER:
        this.createFolder(payload.id, payload.name, payload.parentId);
        break;
      case ActionTypes.DELETE_FOLDER:
        this.deleteFolder(payload.id);
        break;
      case ActionTypes.RENAME_FOLDER:
        this.renameFolder(payload.id, payload.newName);
        break;
      case ActionTypes.SELECT_NODE:
        this.selectedNode = payload.id;
        break;
    }
    this.emitChange(action);
  }

  createFile(newId, name, parentId) {
    const nodes = this.rtModel.valueAt(['nodes']);
    nodes.set(newId, {name: name, content: ''});
    const parentFolder = this.rtModel.valueAt(['nodes', parentId, 'children']);
    parentFolder.push(newId);
  }
  deleteFile(id) {  
    const nodes = this.rtModel.valueAt(['nodes']);
    const children = findChildParent(nodes, id).get('children');
    children.forEach((childId, index) => { 
      if(childId.data() === id) {
        children.remove(index);
      }
    });
    this.rtModel.valueAt(['nodes']).remove(id);
  }
  renameFile(id, newName) {
    const rtFile = this.rtModel.valueAt(['nodes', id]);
    rtFile.set('name', newName);
  }

  createFolder(newId, name, parentId) {
    const nodes = this.rtModel.valueAt(['nodes']);
    nodes.set(newId, {name: name, children: []});
    nodes.valueAt([parentId, 'children']).push(newId);
  }
  deleteFolder(id) {
    const nodes = this.rtModel.valueAt(['nodes']);
    const children = findChildParent(nodes, id).get('children');
    children.forEach((childId, index) => { 
      if(childId.data() === id) {
        children.remove(index);
      }
    });
    nodes.remove(id);
  }
  renameFolder(id, newName) {
    const rtFolder = this.rtModel.valueAt(['nodes', id]);
    rtFolder.set('name', newName);
  }

}
