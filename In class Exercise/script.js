function initializeMap() {
    
    var humber = {
        lat: 43.7291338, lng: -79.6087013
    }; //JSON Value

    var humberMap = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 16,center: humber}
    );

    var marker = new google.maps.Marker(
        {position: humber,
        map: humberMap}
    );
}

function initializeMapGeocode() {

    var humberMap = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 19
        }
    );
    
    var humberAddress = "Eloor Road, Eloor, Kochi, Kerala, India";
    
    var gcoder = new google.maps.Geocoder();
    gcoder.geocode(
            { 'address': humberAddress},
            //Callback function
            function (results, status) {
                if (status == 'OK') {
                    //address geocoded successfully
                    //center map on Humber
                    humberMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: humberMap
                    });
                }
            }
        ); 
    
}

function initlializeMapAjax() {

    var gcoder = new google.maps.Geocoder();

    var humberMap = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 1
        }
    );

    try {
        ajax = new XMLHttpRequest();
    } catch {
        console.log("Error retrieving files");
        return false;
    }
    ajax.open("POST","test.php",true); //retrieve test.php
    ajax.send();//send request
    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4) {
            //console.log(ajax.responseText);
            let addr = JSON.parse(ajax.responseText);
            gcoder.geocode(
                { address : addr.address }, //or just write address , 
                //since it returns only an address
                function (results, status) {
                    if (status == 'OK') {
                        //address geocoded successfully
                        //center map on Humber
                        humberMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: humberMap
                        });
                    }
                }

            )
        }
    }

}

function initializeMapJQuery() {

    let marker;
    var humberMap = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 19
        }
    );
    $.post("test.php",function(result){
        let gcoder = new google.maps.Geocoder();
        let addr = JSON.parse(result);
        gcoder.geocode(
            { address : addr.address }, //or just write address , 
            //since it returns only an address
            function (results, status) {
                if (status == 'OK') {
                    //address geocoded successfully
                    //center map on Humber
                    humberMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: humberMap
                    });
                }
            }

        );
    });
}