import React from 'react';
import Swiper from 'react-native-swiper';

import YoutubeWebview from './components/YoutubeWebview';

export default class App extends React.Component {
  state = {
    videos: ['T-b3-8GDR8E', 'UZDuGjvXd1Q', 'Y9nDagqKL7Q'],
    index: 0
  };

  render() {
    return (
      <Swiper
        ref={swiper => (this.swiper = swiper)}
        loop={false}
        index={this.state.index}
        showsPagination={false}
        onIndexChanged={index => this.setState({ index })}
      >
        {this.state.videos.map((videoId, i) => (
          <YoutubeWebview
            key={videoId}
            videoId={videoId}
            playing={i === this.state.index}
            onVideoEnd={() => {
              if (this.state.index < this.state.videos.length - 1) {
                this.swiper.scrollBy(1);
              }
            }}
          />
        ))}
      </Swiper>
    );
  }
}
