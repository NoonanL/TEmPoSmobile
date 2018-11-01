import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import Login from './components/Login';
import Home from './components/Home';


export default class App extends Component{
	constructor(props){
		super(props);
		this.state={view: 'login',
					username: '',
					products: '',
					customers: ''};
	}

	changeView(){
		this.setState({
			view: 'home',
		})
	}

	setUsername(newUsername, customers){
		console.log("Got to the function!")
		console.log("New username is " + newUsername)
		this.setState({
			username: newUsername,
			customers: customers
		})
	}

	render(){
		return(
			<View style = {styles.container}>
			{this.renderInitialView()}
			</View>
			);
	}

	renderInitialView(){
		switch(this.state.view){
			case 'login':
			return(<Login
				view={this.changeView.bind(this)}
				username={this.setUsername.bind(this)
				}
				/>
				)
			case 'home':
			return <Home username={this.state.username}/>;
			default:
			return <Loader size={"large"}/>;
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#F5FCFF'
	}
});