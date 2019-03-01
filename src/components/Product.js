import React, { Component } from 'react';
import { Input, Content, Button, Text, Form, Item } from 'native-base';
import { Platform, StyleSheet, View } from 'react-native';

class Product extends Component {
	constructor(props) {
		super(props);
		//console.log(props);
	}
	state = {
		error: 'HI IM AN ERROR MESSAGE',
		loading: false,
		value: ''
	};

	render() {
		return (
			<View>
				<Text>
					{this.props.item.SKU} | {this.props.item.name} | {this.props.item.RRP}{' '}
				</Text>
				<View style={styles.Product}>
					{/* <Button
						light
						style={styles.Button}
						onPress={this.productSelected.bind(this, this.props.item)}
					>
						<Text>Purchase</Text>
					</Button> */}
					<Text>{this.state.value}</Text>
					<Button onPress={this.increment.bind(this)}>
						<Text>+</Text>
					</Button>
					<Button onPress={this.decrement.bind(this)}>
						<Text>-</Text>
					</Button>
				</View>
			</View>
		);
	}

	productSelected(item) {
		console.log('Hello!');
		console.log(item.SKU);
	}

	//Function to increment items
	increment() {
		console.log('Increment pressed!');
		console.log(this.props.item.SKU);
		//console.log(this.state.products);
		var quantity = parseInt(this.props.item.quantity);
		console.log('Initial value is: ' + quantity);
		quantity = quantity + 1;
		this.props.item.quantity = quantity.toString();
		this.setState({ value: quantity.toString() });
		console.log('Incremented value is: ' + this.props.item.quantity);
		this.props.updateItem(this.props.item);
	}

	decrement(item) {
		console.log('Decrement pressed!');
		console.log(this.props.item.SKU);
		//console.log(this.state.products);
		var quantity = parseInt(this.props.item.quantity);
		console.log('Initial value is: ' + quantity);
		if (quantity > 0) {
			quantity = quantity - 1;
			this.props.item.quantity = quantity.toString();
			//this.state.quantity = quantity.toString();
			this.setState({ value: quantity.toString() });
			console.log('Decremented value is: ' + this.props.item.quantity);
			this.props.updateItem(this.props.item);
		}
	}
}

// productSelected(item) {
//     var username = this.state.username;
//     var customer = this.state.customer;
//     //console.log('Function executing..' + item.firstname)
//     this.props.navigation.navigate('Cart', {
//         username: "test",
//         customer: "test",
//         product: item
//     });
// }

export default Product;

const styles = StyleSheet.create({
	product: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});
