import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CodeEditor from '../CodeEditor.jsx';
import * as Actions from '../../js/actions'

const App = ({tree, editors, actions}) => (
  <CodeEditor tree={tree} editors={editors} actions={actions} />
)

App.propTypes = {
  tree: PropTypes.array.isRequired,
  editors: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  tree: state.tree,
  editors: state.editors
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)