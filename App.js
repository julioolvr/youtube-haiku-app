import React from 'react';
import { WebView } from 'react-native';
import Swiper from 'react-native-swiper';
import createEmbedHtml from './embedded.html.js';

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

export default class App extends React.Component {
  state = {
    videos: ['T-b3-8GDR8E', 'UZDuGjvXd1Q', 'Y9nDagqKL7Q'],
    index: 0
  };

  onWebviewMessage(message) {
    switch (message) {
    case 'onReady':
      this.webview.postMessage('playVideo');
      break;
    }
  }

  render() {
    return (
      <Swiper loop={false} index={this.state.index} showsPagination={false}>
        {this.state.videos.map((videoId, i) => (
          <WebView
            key={videoId}
            ref={webview => i === 0 && (this.webview = webview)}
            onMessage={e => this.onWebviewMessage(e.nativeEvent.data)}
            injectedJavaScript={patchPostMessageJsCode}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
            source={{ html: createEmbedHtml(videoId) }}
          />
        ))}
      </Swiper>
    );
  }
}
