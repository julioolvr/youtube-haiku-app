const shortUrl = /https?:\/\/youtu.be\/([^?]+)/;
const longUrl = /https?:\/\/(?:www\.|m\.)?youtube\.com\/watch\?v=([^&]+)/; // TODO: v= might be in a different position
const embedUrl = /https?:\/\/(?:www)?\.youtube\.com\/embed\/([^?]+)/;

export default function(url) {
  if (shortUrl.test(url)) {
    return url.match(shortUrl)[1];
  } else if (longUrl.test(url)) {
    return url.match(longUrl)[1];
  } else if (embedUrl.test(url)) {
    return url.match(embedUrl)[1];
  } else {
    console.error('Failed to extract url from', url);
    return null;
  }
}
