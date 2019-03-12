import React, { Component } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView } from 'react-native';
import Loader from './Loader';
import { Input, Content, Button, Text, Form, Item, Icon } from 'native-base';
import { getProducts } from '../services/getProducts';
import { searchProducts } from '../services/searchProducts';
import Product from './Product';
import { ScrollView } from 'react-native-gesture-handler';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.updateItem = this.updateItem.bind(this);
  }
  state = {
    username: this.props.navigation.state.params.username,
    customer: this.props.navigation.state.params.customer,
    address: this.props.navigation.state.params.address,
    searchStr: '',
    error: '',
    loading: false
  };

  componentDidMount() {
    this.setState({
      error: '',
      loading: true,
      products: []
    });
    getProducts(this.state.username, this.state.address)
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.products}
            renderItem={({ item }) => (
              <Product item={item} updateItem={this.updateItem} />
            )}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <Content>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>TEmPoS</Text>
          <Text>Products</Text>
        </View>

        <Form>
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
          <Button full success onPress={this.viewCart.bind(this)}>
            <Icon name="ios-cart" />
            <Text>Shopping Cart</Text>
          </Button>
          {this.renderLoader()}
        </Form>
      </Content>
    );
  }

  viewCart() {
    var total = 0;
    var items = [];
    this.state.products.map(x => {
      if (parseInt(x.quantity) > 0) {
        total = total + parseInt(x.quantity) * parseInt(x.RRP);
        items.push(x);
      }
    });
    //console.log(items);
    //console.log('total is ' + total);
    //console.log('Function executing..' + item.firstname)
    this.props.navigation.navigate('Cart', {
      username: this.state.username,
      customer: this.state.customer,
      products: items,
      total: total,
      address: this.state.address
    });
  }

  //Function to update item quantity
  updateItem(item) {
    //console.log('Changing quantity for item ' + item.SKU);
    //console.log(this.state.products);
    this.state.products.map(x => {
      if (item.id == x.id) {
        x.quantity = item.quantity;
        //console.log('Successfully changed');
      }
    });
  }

  search() {
    //console.log(this.state.searchStr);
    this.setState({
      error: '',
      loading: true,
      products: []
    });
    searchProducts(
      this.state.username,
      this.state.searchStr,
      this.state.address
    )
      .then(response => {
        //console.log(response);
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
  form: {
    marginTop: '25%'
  },
  button: {
    flex: 1,
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
