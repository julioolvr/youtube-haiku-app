const shortUrl = /https?:\/\/youtu.be\/([^?]+)/;
const longUrl = /https?:\/\/(?:www\.|m\.)?youtube\.com\/watch\?v=([^&]+)/; // TODO: v= might be in a different position

export default function(url) {
  if (shortUrl.test(url)) {
    return url.match(shortUrl)[1];
  } else if (longUrl.test(url)) {
    return url.match(longUrl)[1];
  } else {
    return null;
  }
}
