import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import NewGame from './NewGame';

const mapStateToProps = (state) => {
	return {
    match: state.match,
    people: state.people
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(NewGame);

export default App;
