import base64 from 'base-64';
import querystring from 'querystring';
import { REDDIT_CLIENT_ID, REDDIT_USER_AGENT } from 'react-native-dotenv';

// TODO: Check device_id generation
const deviceId = Math.floor(Math.random() * 1000000);

const credentials = fetch(
  'https://www.reddit.com/api/v1/access_token?scope=read',
  {
    method: 'POST',
    body: `grant_type=https://oauth.reddit.com/grants/installed_client&device_id=youtube-haiku-app-${
      deviceId
    }`,
    headers: {
      Authorization: `Basic ${base64.encode(`${REDDIT_CLIENT_ID}:`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
).then(response => response.json());

async function getHotHaikus(options) {
  const creds = await credentials;

  const posts = await fetch(
    `https://oauth.reddit.com/r/youtubehaiku/hot?${querystring.stringify(
      options
    )}`,
    {
      headers: {
        Authorization: `bearer ${creds.access_token}`,
        'User-Agent': REDDIT_USER_AGENT
      }
    }
  ).then(response => response.json());

  return posts.data;
}

export { getHotHaikus };
