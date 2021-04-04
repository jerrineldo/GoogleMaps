function initializeMap() {
    var map = new google.maps.Map(document.getElementById('map'), 
    {zoom: 14}); 
    var gcoder = new google.maps.Geocoder();
    //grab address via AJAX
    var ajax;
    try {
        ajax = new XMLHttpRequest();
    } catch (e) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Error retrieving address");
                return false;
            }
        }
    }
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            //the callback: get the data
            var address = JSON.parse(ajax.responseText);
            gcoder.geocode({ 'address':address.address},
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
        }
    }
    ajax.open("POST", "test.php", true);
    ajax.send(null);//no variables to send
}