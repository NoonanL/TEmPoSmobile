import React, { Component } from 'react';
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
import { Platform, StyleSheet, View } from 'react-native';

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
  }
  state = {
    error: 'HI IM AN ERROR MESSAGE',
    loading: false,
    address: ''
  };

  render() {
    return (
      <Content>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>TEmPoS</Text>
        </View>

        <Form>
          <Item fixedLabel>
            <Label>Server IP Address</Label>
            <Input
              text={this.state.address}
              onChangeText={address => this.setState({ address })}
            />
          </Item>
        </Form>

        <Button full onPress={this.onButtonPress.bind(this)}>
          <Icon type="FontAwesome" name="save" />
          <Text>Save Settings</Text>
        </Button>
      </Content>
    );
  }

  onButtonPress() {
    //console.log(this.state.address);
    this.props.navigation.state.params.updateAddress(this.state.address);
    this.props.navigation.goBack();
  }
}

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  button: {
    flex: 1,
    marginTop: '25%'
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
    paddingBottom: 100
  }
});
