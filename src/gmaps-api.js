export function getMap(location) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=13&size=600x300&maptype=roadmap
&markers=color:red%7Clabel:S%7C${location}&key=${process.env.MAPS_API_KEY}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.open('GET', url, true);
    request.send();
  });
}
