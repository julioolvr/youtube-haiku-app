import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  state = {
    messages: ['First', 'Second', 'Third'],
    index: 0
  };

  render() {
    return (
      <Swiper
        loop={false}
        index={this.state.index}
        onIndexChanged={i => {
          this.setState(state => ({
            messages: [...state.messages, `Other ${i}`],
            index: i
          }));
        }}
      >
        {this.state.messages.map(message => (
          <View key={message} style={styles.container}>
            <Text> {message} </Text>
          </View>
        ))}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
