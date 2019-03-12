import React, { Component } from 'react';
import { Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import {
  Input,
  Content,
  Button,
  Text,
  Form,
  Item,
  Icon,
  Label
} from 'native-base';
import Loader from './Loader';
import { authenticate } from '../services/auth';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
  }
  state = {
    username: '',
    password: '',
    error: 'HI IM AN ERROR MESSAGE',
    loading: false,
    address: ''
  };

  renderLoader() {
    if (this.state.loading) {
      return <Loader size={'large'} />;
    } else {
      return (
        <View style={styles.button}>
          <Button full onPress={this.onButtonPress.bind(this)}>
            <Icon name="ios-log-in" />
            <Text>Login</Text>
          </Button>
          <Button full iconLeft light onPress={this.settingsPressed.bind(this)}>
            <Icon type="MaterialIcons" name="settings" />
            <Text>Settings</Text>
          </Button>
        </View>
      );
    }
  }

  settingsPressed() {
    this.props.navigation.navigate('SettingsPage', {
      updateAddress: this.updateAddress.bind(this)
    });
  }

  updateAddress(address) {
    //console.log(address);
    this.setState({ address: address });
  }

  onButtonPress() {
    // console.log(this.state.error);
    this.setState({ error: '', loading: true });
    const { username, password } = this.state;
    authenticate(username, password, this.state.address)
      .then(response => {
        //console.log(response);
        if (response.auth === 'OK') {
          //console.log('Got here');
          this.onAuthSuccess();
          //this.props.view();
        } else {
          this.onAuthFailed();
        }
      })
      .catch(function(error) {
        console.log('Problem with onButtonPress: ' + error.message);
        throw error;
      });
  }

  onAuthSuccess() {
    console.log('Successful Login');
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
      loading: false
    });
    this.props.navigation.navigate('Home', {
      username: username,
      address: this.state.address
    });
  }

  onAuthFailed() {
    console.log('Failed Login');
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }

  render() {
    return (
      <Content>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>TEmPoS</Text>
        </View>

        <Form>
          <Item fixedLabel>
            <Label>Username</Label>
            <Input
              text={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
          </Item>
          <Item fixedLabel last>
            <Label>Password</Label>
            <Input
              text={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
        </Form>

        {this.renderLoader()}
      </Content>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    flex: 1
  },
  form: {
    flex: 1,
    marginTop: '30%'
  },
  errorMessage: {
    textAlign: 'center',
    color: '#FF0000',
    marginBottom: 5
  },
  logoContainer: {
    flex: 1,
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 80,
    paddingBottom: 100
  }
});
