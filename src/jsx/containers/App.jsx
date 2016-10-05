import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CodeEditor from '../CodeEditor.jsx';
import * as Actions from '../../js/actions'

const App = ({fileManager, editors, actions}) => (
  <CodeEditor file-manager={fileManager} editors={editors} actions={actions} />
)

App.propTypes = {
  fileManager: PropTypes.array.isRequired,
  editors: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  fileManager: state.projectFiles,
  editors: state.editors
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)