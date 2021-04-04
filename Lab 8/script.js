function initializeMap() {
    
    //set center of map
    var humberlocation = {
        lat: 43.7291338, lng: -79.6087013
    }; //JSON Value

    //Initialize map
    var Map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 10,
            center:humberlocation
        }
    );

    //adding an event listener for a click event to the map
    Map.addListener("click",(event)=> {

        //set a marker at the clicked location of the map
        new google.maps.Marker(
            {
                position: event.latLng,
                map: Map
            }
        );
        
        //set center of the map to the clicked location
        Map.setCenter(event.latLng);
        //set a zoomed in value to the map
        Map.setZoom(12);

    })
}
