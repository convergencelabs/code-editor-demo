import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CodeEditor from '../CodeEditor.jsx';
import * as Actions from '../../js/actions'

const App = ({projectFiles, editors, actions}) => (
  <CodeEditor project-files={projectFiles} editors={editors} actions={actions} />
)

App.propTypes = {
  projectFiles: PropTypes.object.isRequired,
  editors: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  projectFiles: state.projectFiles,
  editors: state.editors
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)