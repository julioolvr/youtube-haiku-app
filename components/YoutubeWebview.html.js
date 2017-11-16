// TODO: Use some real templating library
export default function(videoId) {
  return `
    <!DOCTYPE html>
    <html>

    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: #000000;
        }

        html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: #000000;
        }

        .embed-container iframe,
        .embed-container object,
        .embed-container embed {
          border: none;
          position: absolute;
          top: 0;
          left: -100;
          width: 100% !important;
          height: 100% !important;
        }
      </style>
    </head>

    <body>
        <div class="embed-container">
      <iframe width="100%" height="100%" id="player" src="https://www.youtube.com/embed/${
  videoId
}?autoplay=1&controls=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1&modestbranding=1"></iframe></div>
      <script src="https://www.youtube.com/iframe_api"></script>

      <script>
        var player;
        document.addEventListener('message', onMessageReceived);

        YT.ready(function () {
          player = new YT.Player('player', {
            events: { onReady: onReady }
          });
        });

        function onReady() {
          postMessage('onReady');
        }

        function onMessageReceived(e) {
          switch (e.data) {
            case 'playVideo':
              player.playVideo();
              break;
            case 'backToStart':
              player.seekTo(0, true);
              break;
          }
        }
      </script>
    </body>

    </html>
  `;
}
