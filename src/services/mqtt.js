import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';

/**
 * This method creates a connection to the MQTT Broker and publishes a message to a topic.
 * @param {*} topic The topic to publish to
 * @param {*} publishMessage The message to publish to the topic
 */
export const publishMQTT = (topic, publishMessage, address) => {
  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
  });

  //On connection established with mosquitto broker
  function onConnect() {
    console.log('Connected to Broker');
    //Send message to broker (topic, message, QoS)
    client.publish(topic, publishMessage, 2);
  }

  //On Message delivery confirmed
  function onMessageDelivered() {
    console.log('Message was delivered, disconnecting from broker.');
  }

  //On Connection lost
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log(
        'Connection to broker lost! Error code: ' + responseObject.errorCode
      );
    }
  }

  //On attempt to connect failure
  function onFailure() {
    console.log('Failed to connect to broker, will attempt to reconnect...');
  }

  //On Message Arrives
  function onMessageArrived(message) {
    console.log('Message arrived from Broker: ' + message.payloadString);
  }

  //Create client object and set it's handlers.
  const client = new Paho.MQTT.Client(address, 1884, '/ws', 'ReactNative');
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.onMessageDelivered = onMessageDelivered;

  //Connect to the Mosquitto Broker
  client.connect({
    onSuccess: onConnect,
    onFailure: onFailure,
    /*
    This is REALLY important. You have to set this to false so that the broker tries to reconnect
     and persists the message for the client until the reconnection from this particular client is noted
    */
    cleanSession: false,
    reconnect: true
  });
};
