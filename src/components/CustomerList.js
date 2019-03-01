import React, { Component } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView } from 'react-native';
import Loader from './Loader';
import { Input, Icon, Button, Text, Form, Item } from 'native-base';
import { getCustomers } from '../services/getCustomers';
import { searchCustomers } from '../services/searchCustomers';

class CustomerList extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		username: this.props.navigation.state.params.username,
		searchStr: '',
		error: '',
		loading: false,
		selectedCustomer: ''
	};

	componentDidMount() {
		this.setState({
			error: '',
			loading: true,
			customers: []
		});
		getCustomers(this.state.username)
			.then(response => {
				//console.log(response);
				if (response.response === 'OK') {
					//console.log('Got here');
					//console.log(response);
					this.setState({
						customers: response.customers
					});
					//console.log(response.customers)
					this.setState({
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
						data={this.state.customers}
						renderItem={({ item }) => (
							<View>
								<Button
									full
									light
									style={styles.Button}
									onPress={this.customerSelected.bind(this, item)}
								>
									<Icon name="ios-person" />
									<Text>
										{item.firstname} , {item.surname}{' '}
									</Text>
								</Button>
								<Text> </Text>
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
					<Text>Customers</Text>
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
							<Icon name="search" />
							<Text>Search</Text>
						</Button>
					</Form>
				</KeyboardAvoidingView>

				{this.renderLoader()}
			</View>
		);
	}

	customerSelected(item) {
		var username = this.state.username;
		//console.log('Function executing..' + item.firstname)
		this.props.navigation.navigate('ProductList', {
			username: username,
			customer: item
		});
	}

	search() {
		//console.log(this.state.searchStr)
		this.setState({
			error: '',
			loading: true,
			customers: []
		});
		searchCustomers(this.state.username, this.state.searchStr)
			.then(response => {
				//console.log(response);
				if (response.response === 'OK') {
					//console.log('Got here');
					//console.log(response);
					this.setState({
						customers: response.customers
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

export default CustomerList;

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
