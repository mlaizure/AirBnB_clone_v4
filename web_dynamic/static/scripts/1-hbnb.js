// script that listens for changes on each INPUT checkbox tag
$(document).ready(function () {
  $('[type=checkbox]').change(function (e) {
    let data_name = $(e.target).attr("data-name")
    let amen_list = [];
    if ($(e.target).is(":checked")) {
      amen_list.push(data_name);
    }
    let filtered_list = amen_list.filter((item) => {$(e.target).is(":checked")});
    $('DIV.amenities H4').append(filtered_list);
  })
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
