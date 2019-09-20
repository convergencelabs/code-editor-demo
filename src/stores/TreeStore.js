import {UserActions} from '../constants/ActionTypes';
import {BaseStore} from './BaseStore';
import {findChildParentId, isNodeFolder} from '../utils';
import { TREE_ROOT_ID } from '../constants/tree';

/**
 * Fixme the data structure for this could be cleaned up / simplified
 */
export default class TreeStore extends BaseStore {
  constructor(rtModel) {
    super();

    this.rtModel = rtModel;

    this.initState();
  }

  initState() {
    this.newNode = {};
  }

  getTreeState() {
    return {
      selectedId: this.selectedNode,
      newNode: this.newNode,
      folderMarkedForDeletion: this.folderMarkedForDeletion
    };
  }

  actionHandler(action) {
    const payload = action.payload;
    switch (action.type) {
      case UserActions.CREATE_FILE:
        this.createFile(payload.id, payload.name, payload.parentId);
        break;
      case UserActions.DELETE_FILE:
        this.deleteNode(payload.id);
        break;
      case UserActions.DELETE_FOLDER:
        this.folderMarkedForDeletion = payload.id;
        break;
      case UserActions.RENAME_FILE: 
        this.renameFile(payload.id, payload.newName);
        break;
      case UserActions.CREATE_FOLDER:
        this.createFolder(payload.id, payload.name, payload.parentId);
        break;
      case UserActions.RENAME_FOLDER:
        this.renameFolder(payload.id, payload.newName);
        break;
      case UserActions.SELECT_NODE:
        this.selectedNode = payload.id;
        break;
      case UserActions.ADD_NEW_NODE:
        this.addNewNode(payload.type, payload.folderId);
        break;
      case UserActions.CANCEL_NEW_NODE:
        this.newNode = {};
        break;
      case UserActions.SELECT_TAB:
        this.selectedNode = payload.id;
        break;
      default:
    }
    this.emitChange();
  }

  createFile(newId, name, parentId) {
    const nodes = this.getNodes();
    nodes.set(newId, {name: name});
    const parentFolder = this.rtModel.elementAt(['tree', 'nodes', parentId, 'children']);
    parentFolder.push(newId);
  }
  renameFile(id, newName) {
    const rtFile = this.getNode(id);
    rtFile.set('name', newName);
  }

  createFolder(newId, name, parentId) {
    const nodes = this.getNodes();
    nodes.set(newId, {name: name, children: []});
    nodes.elementAt([parentId, 'children']).push(newId);
  }

  renameFolder(id, newName) {
    const rtFolder = this.getNode(id);
    rtFolder.set('name', newName);
  }

  deleteNode(id) { 
    const nodes = this.getNodes();
    const parent = findChildParentId(nodes, id);

    // delete the parent's reference to this node 
    const parentsChildren = nodes.get(parent).get('children');
    const childIndex = parentsChildren.findIndex(childId => childId.value() === id);
    parentsChildren.remove(childIndex);

    // delete the node 
    nodes.remove(id);

    if(this.selectedNode === id) {
      delete this.selectedNode;
    }
  }

  addNewNode(type, nodeId) {
    const nodes = this.getNodes();
    nodeId = nodeId || TREE_ROOT_ID;
    let parentFolderId = nodeId;
    if(!isNodeFolder(nodes, nodeId)) {
      parentFolderId = findChildParentId(nodes, nodeId);
    } 
    this.newNode = {type, folderId: parentFolderId};
  }

  getNodes() {
    return this.rtModel.elementAt(['tree', 'nodes']);
  }
  getNode(id) {
    return this.rtModel.elementAt(['tree', 'nodes', id]);
  }
}
