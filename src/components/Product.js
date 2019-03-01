import React, { Component } from 'react';
import { Input, Content, Button, Text, Form, Item, Icon } from 'native-base';
import { Platform, StyleSheet, View } from 'react-native';

class Product extends Component {
	constructor(props) {
		super(props);
		//console.log(props);
	}
	state = {
		error: 'HI IM AN ERROR MESSAGE',
		loading: false,
		value: '0'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>{this.props.item.name}</Text>
				<Text style={styles.sku}>~{this.props.item.SKU}~</Text>
				<Text style={styles.price}>£{this.props.item.RRP}</Text>

				<View style={styles.test}>
					<Button warning onPress={this.decrement.bind(this)}>
						<Icon name="ios-remove-circle-outline" />
					</Button>

					<View>
						<Text style={styles.qty}> {this.state.value} </Text>
					</View>

					<Button success onPress={this.increment.bind(this)}>
						<Icon name="ios-add-circle-outline" />
					</Button>
				</View>
			</View>
		);
	}

	//Function to increment items
	increment() {
		//console.log('Increment pressed!');
		//console.log(this.props.item.SKU);
		//console.log(this.state.products);
		var quantity = parseInt(this.props.item.quantity);
		//console.log('Initial value is: ' + quantity);
		quantity = quantity + 1;
		this.props.item.quantity = quantity.toString();
		this.setState({ value: quantity.toString() });
		//console.log('Incremented value is: ' + this.props.item.quantity);
		this.props.updateItem(this.props.item);
	}

	decrement() {
		//console.log('Decrement pressed!');
		//console.log(this.props.item.SKU);
		//console.log(this.state.products);
		var quantity = parseInt(this.props.item.quantity);
		//console.log('Initial value is: ' + quantity);
		if (quantity > 0) {
			quantity = quantity - 1;
			this.props.item.quantity = quantity.toString();
			//this.state.quantity = quantity.toString();
			this.setState({ value: quantity.toString() });
			//console.log('Decremented value is: ' + this.props.item.quantity);
			this.props.updateItem(this.props.item);
		}
	}
}

export default Product;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	test: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	sku: {
		fontStyle: 'italic'
	},
	qty: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	price: {
		fontSize: 20
	},
	buttonContainer: {
		//padding: '5%',
		flex: 1,
		flexDirection: 'row'
		//flexDirection: 'row',
		//alignItems: 'center',
		//justifyContent: 'center'
	}
});
