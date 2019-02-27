import React, { Component } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView } from 'react-native';
import Loader from './Loader';
import { Input, Content, Button, Text, Form, Item } from 'native-base';
import { getProducts } from '../services/getProducts';
import { searchProducts } from '../services/searchProducts';

class ProductList extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		username: this.props.navigation.state.params.username,
		customer: this.props.navigation.state.params.customer,
		selected: [],
		searchStr: '',
		error: '',
		loading: false
	};

	componentDidMount() {
		this.setState({
			error: '',
			loading: true,
			products: [],
			selected: []
		});
		getProducts(this.state.username)
			.then(response => {
				//console.log(response);
				if (response.response === 'OK') {
					//console.log('Got here');
					//console.log(response);
					this.setState({
						products: response.products,
						loading: false
					});
				} else {
					console.log('Failed');
				}
			})
			.catch(function(error) {
				console.log('Problem with request ');
				throw error;
			});
		//console.log(this.state.customers);
	}

	renderLoader() {
		if (this.state.loading) {
			return <Loader size={'large'} />;
		} else {
			return (
				<View style={styles.listContainer}>
					<FlatList
						data={this.state.products}
						renderItem={({ item }) => (
							<View>
								<Text>
									{item.SKU} | {item.name} | {item.RRP}{' '}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										flexWrap: 'wrap'
									}}
								>
									<Button
										light
										style={styles.Button}
										onPress={this.productSelected.bind(this, item)}
									>
										<Text>Purchase</Text>
									</Button>
								</View>
							</View>
						)}
					/>
				</View>
			);
		}
	}

	render() {
		return (
			<View>
				<View style={styles.logoContainer}>
					<Text style={styles.logo}>TEmPoS</Text>
					<Text>Products</Text>
				</View>
				<KeyboardAvoidingView>
					<Form style={styles.form}>
						<Item rounded>
							<Input
								placeholder="Search..."
								text={this.state.searchStr}
								onChangeText={searchStr =>
									this.setState({
										searchStr
									})
								}
							/>
						</Item>
						<Button full onPress={this.search.bind(this)}>
							<Text>Search</Text>
						</Button>
					</Form>
				</KeyboardAvoidingView>

				{this.renderLoader()}
			</View>
		);
	}

	//SO.. this is working other than the fact that you have to press the button twice for it to register. Something to do
	//with state immutability or how the selected state is declared? Figure it out.
	// incrementProduct(item) {
	//     var present = false;
	//     this.state.selected.map((product) => {
	//         if (product === item) {
	//             console.log(product)
	//             present = true;
	//             var number = parseInt(product.quantity);
	//             number = number + 1;
	//             product.quantity = number.toString();
	//         }
	//     });
	//     if (present === false) {
	//         var newState = this.state.selected.concat(item);
	//         this.setState({
	//             selected: newState
	//         })
	//     }

	// }

	productSelected(item) {
		var username = this.state.username;
		var customer = this.state.customer;
		//console.log('Function executing..' + item.firstname)
		this.props.navigation.navigate('Cart', {
			username: username,
			customer: customer,
			product: item
		});
	}

	search() {
		console.log(this.state.searchStr);
		this.setState({
			error: '',
			loading: true,
			products: []
		});
		searchProducts(this.state.username, this.state.searchStr)
			.then(response => {
				console.log(response);
				if (response.response === 'OK') {
					//console.log('Got here');
					//console.log(response);
					this.setState({
						products: response.products
					});
					this.setState({
						loading: false
					});
				} else {
					console.log('Failed');
				}
			})
			.catch(function(error) {
				console.log('Problem with search request ');
				throw error;
			});
		//console.log(this.state.customers);
	}
}

export default ProductList;

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
		marginTop: '5%'
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
