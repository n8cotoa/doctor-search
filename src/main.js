import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorService } from './doctor-api.js';

$(document).ready(function() {
  $('#doctor-form').submit(function(e){
    e.preventDefault();
    let userSymptom = $("#user-symptom").val();
    // let doctorName = $('#doctor-name').val();

    let doctorSearch = new DoctorService();
    let promiseOfHealth = doctorSearch.getBySymptom(userSymptom);

    promiseOfHealth.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      body.data.forEach(function(data) {
        data.practices.forEach(function(practice) {
          let location = practice.visit_address;
          let address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;
          $("#results").append(
            `<div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${practice.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${practice.phones[0].number}, ${practice.phones[0].type}</h6>
                <p class="card-text">${address}</p>
              </div>
            </div>`
          );
        });
      });
    });
  });
});
