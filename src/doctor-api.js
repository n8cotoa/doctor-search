export class DoctorService {

  getBySymptom(userSymptom, location) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      console.log(process.env.exports.apiKey);
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${userSymptom}&location=${location},20&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
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

  getByName(doctorName, location) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=${location},20&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
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
  getConditions() {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/conditions?user_key=${process.env.exports.apiKey}`;
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
  getSpecialties() {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${process.env.exports.apiKey}`;
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
}
