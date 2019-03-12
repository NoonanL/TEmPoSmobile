import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import ProductList from './components/ProductList';
import SettingsPage from './components/SettingsPage';
import Cart from './components/Cart';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppStackNavigator = createStackNavigator({
  Login: Login,
  Home: Home,
  CustomerList: CustomerList,
  ProductList: ProductList,
  Cart: Cart,
  SettingsPage: SettingsPage
});

const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
