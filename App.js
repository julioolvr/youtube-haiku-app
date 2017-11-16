import React from 'react';
import { Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { getHotHaikus } from './api/reddit';
import { extractYoutubeId } from './utils';

import YoutubeWebview from './components/YoutubeWebview';

export default class App extends React.Component {
  state = {
    videos: [],
    index: 0,
    loading: true
  };

  componentDidMount() {
    getHotHaikus().then(response => {
      this.setState(prevState => ({
        videos: [
          ...prevState.videos,
          ...response.children
            .filter(post => !post.data.stickied)
            .map(post => post.data.url)
            .map(extractYoutubeId)
        ],
        loading: false
      }));
    });
  }

  render() {
    return this.state.loading ? (
      <Text>Loading...</Text>
    ) : (
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
