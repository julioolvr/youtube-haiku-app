import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native';
import createEmbedHtml from './YoutubeWebview.html.js';

// Hack from https://github.com/facebook/react-native/issues/10865#issuecomment-269847703
const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      'hasOwnProperty',
      'postMessage'
    );
  };

  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

class YoutubeWebview extends React.Component {
  state = {
    playing: false
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.playing && this.state.playing) {
      this.pauseVideo();
    }

    if (nextProps.playing && !this.state.playing) {
      this.playVideo();
    }
  }

  playVideo() {
    this.webview.postMessage('playVideo');
    this.setState({ playing: true });
  }

  pauseVideo() {
    this.webview.postMessage('backToStart');
    this.setState({ playing: false });
  }

  onWebviewMessage(message) {
    switch (message) {
    case 'onReady':
      if (this.props.playing) {
        this.playVideo();
      }
      break;
    case 'onVideoEnd':
      this.props.onVideoEnd();
      break;
    }
  }

  render() {
    const { videoId } = this.props;

    return (
      <WebView
        key={videoId}
        ref={webview => (this.webview = webview)}
        onMessage={e => this.onWebviewMessage(e.nativeEvent.data)}
        injectedJavaScript={patchPostMessageJsCode}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        source={{ html: createEmbedHtml(videoId) }}
      />
    );
  }
}

YoutubeWebview.propTypes = {
  videoId: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  onVideoEnd: PropTypes.func
};

YoutubeWebview.defaultProps = {
  playing: false,
  onVideoEnd: () => {}
};

export default YoutubeWebview;
