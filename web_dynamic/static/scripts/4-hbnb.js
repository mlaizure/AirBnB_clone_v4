// script that listens for changes on each INPUT checkbox tag
$(function () {
  let amenList = [];
  $('[type=checkbox]').change(function (e) {
    const dataName = $(e.target).attr('data-name');
    if ($(e.target).is(':checked')) {
      amenList.push(dataName);
    } else {
      amenList = amenList.filter((item) => item !== dataName);
    }
    $('DIV.amenities H4').html(amenList.join(', '));
  });
});

$.getJSON(
  'http://0.0.0.0:5001/api/v1/status/',
  function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }
);

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  contentType: 'application/json',
  data: '{}',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      $('.places').append(
        '<article><div class="title_box"><h2>' + place.name +
              '</h2><div class="price_by_night">$' + place.price_by_night +
              '</div></div><div class="information"><div class="max_guest">' +
              pluralize(place.max_guest, 'Guest') +
              '</div><div class="number_rooms">' +
              pluralize(place.number_rooms, 'Bedroom') +
              '</div><div class="number_bathrooms">' +
              pluralize(place.number_bathrooms, 'Bathroom') +
              '</div></div><div class="description">' +
              place.description + '</div></article>');
    }
  }
});

function pluralize (num, name) {
  if (num === 1) { return `${num} ${name}`; } else { return `${num} ${name}s`; }
}

$('[type=checkbox]').click(function () {
  amenList = JSON.stringify({ amenities: amenList });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: amenList,
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('.places').append(
          '<article><div class="title_box"><h2>' + place.name +
                '</h2><div class="price_by_night">$' + place.price_by_night +
                '</div></div><div class="information"><div class="max_guest">' +
                pluralize(place.max_guest, 'Guest') +
                '</div><div class="number_rooms">' +
                pluralize(place.number_rooms, 'Bedroom') +
                '</div><div class="number_bathrooms">' +
                pluralize(place.number_bathrooms, 'Bathroom') +
                '</div></div><div class="description">' +
                place.description + '</div></article>');
      }
    }
  });
});
