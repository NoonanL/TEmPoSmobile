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
    reconnect: true,
    sync: {}
  });

  function onConnect() {
    console.log('Connected to Broker');
    //Send message to broker (topic, message, QoS)
    client.send(topic, publishMessage, 1);
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection to broker lost!');
    }
  }

  function onMessageArrived(message) {
    console.log('Message arrived from Broker: ' + message.payloadString);
  }

  //console.log(address);
  const client = new Paho.MQTT.Client(address, 1884, '/ws', 'ReactNative');
  // console.log(client);
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({ onSuccess: onConnect });
};
