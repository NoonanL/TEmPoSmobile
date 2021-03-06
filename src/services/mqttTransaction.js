import { Client, Message } from 'react-native-paho-mqtt';

/**
 * This method creates a connection to the MQTT Broker and publishes a message to a topic.
 * @param {*} topic The topic to publish to
 * @param {*} publishMessage The message to publish to the topic
 */
export const publishMQTT = (topic, publishMessage, address) => {
  //Some storage is required to buffer the messages should they need to wait in the queue
  const myStorage = {
    setItem: (key, item) => {
      myStorage[key] = item;
    },
    getItem: key => myStorage[key],
    removeItem: key => {
      delete myStorage[key];
    }
  };

  // Create a client instance
  const client = new Client({
    uri: 'ws://' + address + ':1884/ws',
    clientId: 'ReactNative',
    storage: myStorage
  });

  //   const message = new Message(publishMessage);
  //   message.destinationName = topic;
  //   client.send(message);

  // set event handlers
  client.on('connectionLost', responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log(responseObject);
    }
  });
  client.on('messageReceived', message => {
    console.log(message.payloadString);
  });

  let options = {};

  // connect the client
  client
    .connect(options)
    .then(() => {
      // Once a connection has been made
      console.log('Connected to broker.');
      return client.subscribe('Transactions');
    })
    .then(() => {
      const message = new Message(publishMessage);
      message.destinationName = topic;
      message.qos = 1;
      client.send(message);
    })
    // .then(() => {
    //   client.disconnect();
    // })
    .catch(responseObject => {
      if (responseObject.errorCode !== 0) {
        console.log('Connection to Broker lost:' + responseObject);
      }
    });
};
