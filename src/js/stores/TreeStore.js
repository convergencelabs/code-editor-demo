import {UserActions} from '../constants/ActionTypes';
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
    this.newNode = {};
  }

  getNodes() {
    return this.rtModel.valueAt(['tree', 'nodes']);
  }
  getTreeState() {
    return {
      selectedId: this.selectedNode,
      newNode: this.newNode
    };
  }

  actionHandler(action) {
    const payload = action.payload;
    switch (action.type) {
      case UserActions.CREATE_FILE:
        this.createFile(payload.id, payload.name, payload.parentId);
        break;
      case UserActions.DELETE_FILE:
        this.deleteFile(payload.id);
        break;
      case UserActions.RENAME_FILE: 
        this.renameFile(payload.id, payload.newName);
        break;
      case UserActions.CREATE_FOLDER:
        this.createFolder(payload.id, payload.name, payload.parentId);
        break;
      case UserActions.DELETE_FOLDER:
        this.deleteFolder(payload.id);
        break;
      case UserActions.RENAME_FOLDER:
        this.renameFolder(payload.id, payload.newName);
        break;
      case UserActions.SELECT_NODE:
        this.selectedNode = payload.id;
        break;
      case UserActions.ADD_NEW_NODE:
        this.newNode = {type: payload.type, folderId: payload.folderId};
        break;
      case UserActions.CANCEL_NEW_NODE:
        this.newNode = {};
        break;
      case UserActions.SELECT_TAB:
        this.selectedNode = payload.id;
        break;
    }
    this.emitChange();
  }

  createFile(newId, name, parentId) {
    const nodes = this.rtModel.valueAt(['tree', 'nodes']);
    nodes.set(newId, {name: name});
    const parentFolder = this.rtModel.valueAt(['tree', 'nodes', parentId, 'children']);
    parentFolder.push(newId);
  }
  deleteFile(id) {  
    const nodes = this.rtModel.valueAt(['tree', 'nodes']);
    const children = findChildParent(nodes, id).get('children');
    children.forEach((childId, index) => { 
      if(childId.data() === id) {
        children.remove(index);
      }
    });
    this.rtModel.valueAt(['tree', 'nodes']).remove(id);
  }
  renameFile(id, newName) {
    const rtFile = this.rtModel.valueAt(['tree', 'nodes', id]);
    rtFile.set('name', newName);
  }

  createFolder(newId, name, parentId) {
    const nodes = this.rtModel.valueAt(['tree', 'nodes']);
    nodes.set(newId, {name: name, children: []});
    nodes.valueAt([parentId, 'children']).push(newId);
  }
  deleteFolder(id) {
    const nodes = this.rtModel.valueAt(['tree', 'nodes']);
    const children = findChildParent(nodes, id).get('children');
    children.forEach((childId, index) => { 
      if(childId.data() === id) {
        children.remove(index);
      }
    });
    nodes.remove(id);
  }
  renameFolder(id, newName) {
    const rtFolder = this.rtModel.valueAt(['tree', 'nodes', id]);
    rtFolder.set('name', newName);
  }

}
