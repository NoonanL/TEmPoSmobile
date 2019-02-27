import React, { Component } from 'react';
import {Platform, StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Form, Item, Label, Input, Button, Text, Content, Header, Container} from 'native-base';
import Loader from './Loader';

import {authenticate} from '../services/auth';
import {publishMQTT} from '../services/mqttTransaction';
import {getCustomers} from '../services/getCustomers';
// import ButtonEx from './Button';


 class LoginScreen extends Component{
	constructor(props){
		super(props);
		//console.log(props);
	}
	state = {
		username: '',
		password: '',
		error: 'HI IM AN ERROR MESSAGE',
		loading: false,
		customers: ''
	};


	
	renderLoader(){
		
		if(this.state.loading){
			return <Loader size={"large"}/>
		}else{
			return (
					<View style={styles.button}>
						<Button full onPress={this.onButtonPress.bind(this)}>
						<Text>
							Login
						</Text>
						</Button>
				 </View>
				)
		 }
	}

	onButtonPress(){
		
// publishMQTT("Test", "I'm sending a message from the publishMQTT function!");

		// console.log(this.state.error);
		this.setState({error: '', loading: true});
		const{username, password} = this.state;
		authenticate(username,password)
		.then((response) => {
			//console.log(response);
			if(response.auth === 'OK'){
				//console.log('Got here');
				this.onAuthSuccess();
				//this.props.view();
			}else{
				this.onAuthFailed();
			};
		}).catch(function(error) {
			console.log('Problem with onButtonPress: ' + error.message);
			throw error;
		});
	}

	onAuthSuccess(){
		console.log('Successful Login')
		//console.log(this.state.username)
		//console.log('username is : ' + this.state.username)
		var username = this.state.username;
		//console.log('Variable is : ' + username)
		//this.props.username(this.state.username);
		// this.setState({
		// 	username: '',
		// 	password: '',
		// 	error: '',
		// 	loading: false,
		// });
		this.setState({
			loading:false
		});
		this.props.navigation.navigate('Home', {username:username});
	}

	onAuthFailed(){
		console.log('Failed Login')
		this.setState({
			error:'Authentication Failed',
			loading:false,
		});
	}



	render() {
    return (
          <Content>

          <View style={styles.logoContainer}>
	          <Text style={styles.logo}>TEmPoS</Text>
	      	</View> 
	       
          <Form >
            <Item fixedLabel>
              <Label>Username</Label>
              <Input text={this.state.username} onChangeText={username=>this.setState({username})}/>
            </Item>
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input text={this.state.password} secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
            </Item>
          </Form>
					
					{this.renderLoader()}

</Content>

    );
  }
}

export default LoginScreen;


const styles = StyleSheet.create({
	button:{
		flex:1,
	},
	form:{
		flex:1,
		marginTop: '30%',
	},
	errorMessage:{
		textAlign: 'center',
		color: '#FF0000',
		marginBottom: 5,
	},
	logoContainer: {
		flex: 1,
		marginTop: '15%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
			fontWeight: 'bold',
    	fontSize: 80,
    	paddingBottom: 100
	}
})


