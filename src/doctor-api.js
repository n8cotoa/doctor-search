export class DoctorService {
  getDoctors(attributes) {
    return new Promise(resolve, reject) {
      let doctorName = attributes.name, "";
      let userSymptom = attributes.symptom, "";

      const request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${userSymptom}&name=${doctorName}&location=or-portland&skip=0&limit=10&user_key=${process.env.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open('GET', url, true);
      request.send();
    }
  }
}
