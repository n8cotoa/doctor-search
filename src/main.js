import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorService } from './doctor-api.js';
import { getLatLong } from './geocode-api.js';

$(document).ready(function() {
  let conditionSearch = new DoctorService();
  let conditions = conditionSearch.getConditions();

  conditions.then(function(response){
    let body = JSON.parse(response);
    body.data.forEach(function(condition){
      $("#conditions").append(`<option>${condition.name}</option>`);
    });
  },function(error) {
    $('.showError').text(`There was an error: ${error.message}`);
  });

  $('#symptomSearch').click(function() {
    $('#symptom-form').show();
    $('#doctor-form').hide();
    $('#results').text("");
    $('.showError').text('');
  });

  $('#doctorSearch').click(function() {
    $('#symptom-form').hide();
    $('#doctor-form').show();
    $('#results').text("");
    $('.showError').text('');
  });

  $('#symptom-form').submit(function(e){
    e.preventDefault();
    $('#results').text("");
    $('.showError').text('');
    let userSymptom = $("#conditions").val();
    let doctorSearch = new DoctorService();
    let promiseOfHealth = doctorSearch.getBySymptom(userSymptom);

    promiseOfHealth.then(function(response) {
      let body = JSON.parse(response);
      if (body.data !== []) {
        body.data.forEach(function(data) {
          data.practices.forEach(function(practice) {
            let location = practice.visit_address;
            let address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;
            $("#results").append(
              `<div class="card" style="width: 20rem;">
                <div class="card-body">
                  <h5 class="card-title">${practice.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Phone: ${(practice.phones[0].type == 'fax' ? practice.phones[1].number : practice.phones[0].number)}</h6>
                  <p class="card-text">${address}</p>
                  <p>${(practice.accepts_new_patients ? "Accepting new patients" : "Not accepting new patients")}</p>
                </div>
              </div>`
            );
          });
        });
      } else {
        $('.showError').text('No doctors meet this search query');
      }
    },function(error) {
      $('.showError').text(`There was an error: ${error.message}`);
    });
  });
  $('#doctor-form').submit(function(e){
    $('#results').text("");
    $('.showError').text('');
    e.preventDefault();
    let doctorName = $('#doctor-name').val();
    let doctorSearch = new DoctorService();
    let promiseOfHealth = doctorSearch.getByName(doctorName);

    promiseOfHealth.then(function(response) {
      let body = JSON.parse(response);
      if (body.meta.total !== 0) {
        body.data.forEach(function(data) {
          data.practices.forEach(function(practice) {
            let location = practice.visit_address;
            let address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;
            $("#results").append(
              `<div class="card" style="width: 20rem;">
                <div class="card-body">
                  <h5 class="card-title">${practice.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Phone: ${(practice.phones[0].type == 'fax' ? practice.phones[1].number : practice.phones[0].number)}</h6>
                  <p class="card-text">${address}</p>
                  <p>${(practice.accepts_new_patients ? "Accepting new patients" : "Not accepting new patients")}</p>
                </div>
              </div>`
            );
          });
        });
      } else {
        $('.showError').text('No doctors meet this search query');
      }
    },function(error) {
      $('.showError').text(`There was an error: ${error.message}`);
    });
  });
});
