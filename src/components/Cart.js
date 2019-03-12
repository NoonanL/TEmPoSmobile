import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import Loader from './Loader';
import { Input, Content, Button, Text, Form, Icon } from 'native-base';
import { createTransaction } from '../services/createTransaction';
import { publishMQTT } from '../services/mqttTransaction';

class Cart extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: this.props.navigation.state.params.username,
    customer: this.props.navigation.state.params.customer,
    products: this.props.navigation.state.params.products,
    address: this.props.navigation.state.params.address,
    total: this.props.navigation.state.params.total,
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
            {/* <Text>
							Product: {this.state.product.SKU}, {this.state.product.name}
            </Text> */}
            <FlatList
              data={this.state.products}
              renderItem={({ item }) => (
                <Text>
                  ITEM: {item.SKU} - QUANTITY: {item.quantity}
                </Text>
              )}
            />
          </View>
          <Text>Total Cost: {this.state.total}</Text>
          <Button
            full
            success
            style={styles.Button}
            onPress={this.completeTransaction.bind(this)}
          >
            <Icon name="ios-basket" />
            <Text>Complete Transaction</Text>
          </Button>
        </View>
      );
    }
  }

  completeTransaction() {
    var purchased = [];

    this.state.products.map(x => {
      var item = {
        productId: x.id,
        quantity: x.quantity
      };
      purchased.push(item);
    });

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
      products: purchased
    });
    //console.log(transaction);
    publishMQTT('Transactions', transaction, this.state.address);
    Alert.alert(
      'Complete!',
      'Transaction completed, returning to Home screen.',
      [{ text: 'OK' }],
      { cancelable: false }
    );
    this.props.navigation.navigate('Home', {
      address: this.state.address,
      username: this.state.username
    });
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
