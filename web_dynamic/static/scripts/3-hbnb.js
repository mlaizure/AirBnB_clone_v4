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

$(function () {
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
});

$(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest</div><div class="number_rooms">' + place.number_rooms + ' Bedroom</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div></div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
});

/*
$(".checkbox").change(function() {
  if(this.checked) {
    let amen_list = [];
    amen_list.append(this.data-id);
    console.log(amen_list);
    // store Amenity ID in amen_list
  }
  else {
    amen_list.remove(this.data-id);
    // remove Amenity ID from amen_list
  }
  $('DIV#Amenities H4').append(amen_list); // need to update the H4 tag specifically
});
*/
