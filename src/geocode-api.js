export function getLatLong(city) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyA3VzmGRskU1yDeJhMvhNsS_YdIiPLhQYM`;
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
