import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Loader from './Loader';
import { Form, Item, Label, Input, Button, Text, Content } from 'native-base';
import { getCustomers } from '../services/getCustomers'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: this.props.navigation.state.params.username,
    error: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({
      error: '',
      loading: false
    })

  }

  renderLoader() {
    if (this.state.loading) {
      return <Loader size={"large"}/>
    } else {
      return (
        <Content>
				
				<View style={styles.logoContainer}>
	          	<Text style={styles.logo}>TEmPoS</Text>
	          	<Text>Home Screen</Text>
	      		</View>  

	      <View style={styles.button}>
				<Button full onPress={this.customerListPressed.bind(this)}>
					<Text>
						Customers >
					</Text>
				</Button>
				<Text> </Text>
				</View>
				</Content>
      )
    }
  }

  customerListPressed() {
    var username = this.state.username;
    this.props.navigation.navigate('CustomerList', {
      username: username
    });
  }

  productListPressed() {
    var username = this.state.username;
    this.props.navigation.navigate('ProductList', {
      username: username
    });
  }

  cartPressed() {
    console.log('Cart pressed.')
  }

  render() {
    return (
      <View style={styles.container}>
			{this.renderLoader()}
	        </View>
    );
  }



}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: '20%'
  },
  button: {
    flex: 1,
    marginTop: '25%',
  //alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 60,
    paddingBottom: 100
  }
});