import React from 'react';
import { WebView } from 'react-native';
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  state = {
    videos: ['T-b3-8GDR8E', 'UZDuGjvXd1Q', 'Y9nDagqKL7Q'],
    index: 0
  };

  render() {
    return (
      <Swiper loop={false} index={this.state.index} showsPagination={false}>
        {this.state.videos.map(videoId => (
          <WebView
            key={videoId}
            source={{
              uri: `https://www.youtube.com/embed/${videoId}?autoplay=1`
            }}
          />
        ))}
      </Swiper>
    );
  }
}
