import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import NewGame from './NewGame';
import io from 'socket.io-client';

let socket = io('http://localhost:7771');

socket.on('connect', () => {console.log('connect');});
socket.on('event', (data) => {console.log(data);});
socket.on('disconnect', () => {console.log('disconnect');});

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
