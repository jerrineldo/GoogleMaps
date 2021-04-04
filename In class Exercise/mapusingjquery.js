var map = new google.maps.Map(document.getElementById('map'), 
{zoom: 14}); 
var gcoder = new google.maps.Geocoder();
$.post("test.php", function( result ) {
    //callbackon success
    var address = result;
    gcoder.geocode(
        { address: address },
        function (results, status) {
            if (status == 'OK') {
                //address geocoded successfully
                //center map on Humber
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map
                });
            }    
        });   
    });