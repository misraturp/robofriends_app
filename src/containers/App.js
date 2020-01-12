import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestrobots: () => dispatch(requestRobots()) // same as this: requestRobots(dispatch)
		
	}
}


class App extends React.Component {

	// change after thunk
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		// searchfield: ''

		// }
	// }

	componentDidMount(){
		this.props.onRequestrobots();

	// change after thunk
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 	.then(response=> response.json())
	// 	.then(users=>this.setState({robots:users}));
	}

	// onSearchChange = (event) => {
	// 	this.setState({ searchfield: event.target.value});
	// }


	render(){
		// const {robots, searchfield} = this.state;
		// const {robots} = this.state;
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ?
			<h1> Loading </h1> :
			(
			<div className='tc'>
				<h1 className='f1'> RoboFriends </h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots}/>
					</ErrorBoundry>
				</Scroll>
			</div>
			)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
