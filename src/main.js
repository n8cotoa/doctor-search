import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorService } from './doctor-api.js'

$(document).ready(function() {
  $('#doctor-form').submit(function(e){
    e.preventDefault();
    let userSymptom = $("#user-symptom").val();
    let doctorName = $('#doctor-name').val();

    let doctorSearch = new DoctorService();
    let promiseOfHealth = doctorSearch.getDoctors({doctorName: doctorName, userSymptom: userSymptom});

    promiseOfHealth.then(function(response) {
      let body = JSON.parse(response);
      body.data.practices.forEach(function(practice) {
        let location = practice.visit_address;
        let address = `${location.street}, ${location.city}, ${location.state location.zip}`;
        $("#results").append(
          `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${practice.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${practice.phones[0].number, practice.phones[0].type}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${practice.phones[1].number, practice.phones[1].type}</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>`
        )
      });
    });
  });
});
