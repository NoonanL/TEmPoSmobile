import React, { Component } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView } from 'react-native';
import Loader from './Loader';
import { Input, Content, Button, Text, Form, Item } from 'native-base';
import { createTransaction } from '../services/createTransaction';
import { publishMQTT } from '../services/mqttTransaction';

class Cart extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		username: this.props.navigation.state.params.username,
		customer: this.props.navigation.state.params.customer,
		product: this.props.navigation.state.params.product,
		error: '',
		loading: false
	};

	renderLoader() {
		if (this.state.loading) {
			return <Loader size={'large'} />;
		} else {
			return (
				<View style={styles.listContainer}>
					<View style={styles.form}>
						<Text>
							Customer: {this.state.customer.firstname},{' '}
							{this.state.customer.surname}
						</Text>
						<Text>
							Product: {this.state.product.SKU}, {this.state.product.name}
						</Text>
					</View>

					<Button
						full
						success
						style={styles.Button}
						onPress={this.completeTransaction.bind(this)}
					>
						<Text>Complete Transaction</Text>
					</Button>
				</View>
			);
		}
	}

	completeTransaction() {
		//console.log(this.state.searchStr)
		this.setState({
			error: '',
			loading: true
		});
		transaction = JSON.stringify({
			requestUser: this.state.username,
			customerId: this.state.customer.id,
			customerName:
				this.state.customer.firstname + ' ' + this.state.customer.surname,
			productId: this.state.product.id,
			productName: this.state.product.name
		});
		console.log(transaction);
		publishMQTT('Transactions', transaction);
		this.props.navigation.navigate('Home');
		//transaction = "username:" + this.state.username + ", customerId:" + this.state.customer.id + "," + this.state.product.id
		// createTransaction(this.state.username, this.state.customer.id, this.state.product.id)
		//   .then((response) => {
		//     //console.log(response);
		//     if (response.response === 'OK') {
		//       //console.log('Got here');
		//       //console.log(response);
		//       this.setState({
		//         loading: false
		//       })
		//       this.props.navigation.navigate('ProductList')
		//     } else {
		//       console.log('Failed')
		//     }
		//     ;
		//   }).catch(function(error) {
		//   console.log('Problem with create Transaction request ');
		//   throw error;
		// });
		//console.log(this.state.customers);
	}

	render() {
		return (
			<View>
				<View style={styles.logoContainer}>
					<Text style={styles.logo}>TEmPoS</Text>
					<Text>Shopping Cart</Text>
				</View>
				{this.renderLoader()}
			</View>
		);
	}
}

export default Cart;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		marginTop: '20%'
	},
	form: {
		marginTop: '25%'
	},
	button: {
		flex: 1,
		marginTop: '10%'
	},
	listContainer: {
		marginTop: '10%'
	},
	logoContainer: {
		flex: 1,
		marginTop: '15%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 60,
		paddingBottom: '5%'
	}
});
