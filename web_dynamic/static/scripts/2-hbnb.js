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
      if (data.status === "OK") {
	$('DIV#api_status').addClass('available');
      } else {
	$('DIV#api_status').removeClass('available');
      }
    }
  );
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
