import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
/*global google*/
/*global i*/
/*global n*/
/*global $*/

//Sets up map interface.
ReactDOM.render(
  <div id="nameMain">
    <h1>Neighborhood map</h1>
  </div>,
  document.getElementById("nameContainer")
);

const element = <div className="menu"><h1 className="resetfilters">Reset Filters</h1><h1 className="places">UDF</h1><h1 className="places">My first job at Richie's</h1><h1 className="places">The Scioto River</h1><h1 className="places">Pumpkin Show</h1><h1 className="places">Circleville's Juice Bar</h1></div>;
ReactDOM.render(
 element,
  document.getElementById("menu")
);

const btns = <div><div onClick={toggleMenu} className="typeMenuBtn"><span>Type</span></div><p className="menuType hide">Food</p><p className="menuType hide">Nature</p><p className="menuType hide">Events</p></div>;
ReactDOM.render(
  btns,
  document.getElementById("typeBox")
);


// Map element.
class Choice extends React.Component {
  render() {
    return <div id="map" />;
  }
}

var markers = [];
var i = 0;
var n = 0;
var removedMarkers = [];

ReactDOM.render(<Choice />, document.getElementById("mapArea"));

function toggleMenu(){
  $('.menuType').toggleClass('hide');
}

//Initializing map for google maps API
function initMap() {

  
  var cville = {lat: 39.6006, lng:-82.9460};
  var richies = {lat: 39.600571,lng: -82.945586};
  var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 16,
          gestureHandling: 'none',
          zoomControl: false,
          center: cville});
  // The marker, positioned at Uluru
  var locationMarker = new google.maps.Marker({position: cville, map: map});

// All of points of interests
      var poi = [
          {
            'lat': 39.600571,
            'lng': -82.945586,
            mapLocation: 39.600571 + ' -' + 82.945586,
            name: "My first job at Richie's",
            key:"Food",
            url:"https://logo.clearbit.com/http://www.rnycd.com/",
            urlId:"http://www.rnycd.com/",
            desc:"This was my first job. I was hired in 2015."
          },
                  {
            'lat':39.602079,
            'lng': -82.945397,
            mapLocation:39.602079 + ' -' + 82.945397,
            name: "Circleville's Juice Bar",
            key: "Food",
            url:"https://logo.clearbit.com/https://www.circlevilleherald.com//",
            urlId:"https://www.circlevilleherald.com/community/circleville-nutrition-opens/image_2eb92638-9079-5302-b075-821d5fb55793.html",
            desc:"An interesting gem in circleville for people who are interested in weight loss."
          },
           {
            'lat': 39.600035,
            'lng': -82.943400,
             mapLocation: 39.600035 + ' -' + 82.943400,
             name:"Pumpkin Show",
             key: "Events",
             url:"https://logo.clearbit.com/http://www.pumpkinshow.com/",
             urlId:"http://www.pumpkinshow.com/",
             desc:"Every year the annual circleville pumpkin show takes place. It's called the greatest free show on earth."
          },
          {
            'lat': 39.601089,
            'lng':-82.954745,
            mapLocation: 39.601089 + ' -' + 82.954745,
            name:"The Scioto River",
            key:"Nature",
            url:"https://logo.clearbit.com/http://hockinghills.com/",
            urlId:"http://hockinghills.com/",
            desc:"This river eventually connects to the Ohio river."
          },
          {
            'lat': 39.598510,
            'lng':-82.933032,
            mapLocation: 39.598510 + ' -' + 82.933032,
            name:"UDF",
            key:"Food",
            url:"https://logo.clearbit.com/https://www.udfinc.com/",
            urlId:"https://www.udfinc.com/",
            desc:"This is some of the best ice cream around the town."
          }
        ];
  
console.log(poi);
  
        // Create markers.
      for (i=0; i < poi.length; i++){
       
      var point = poi[i];
        
      var location = new google.maps.LatLng(point['lat'], point['lng']);
        
      var marker = new google.maps.Marker({
          position: location,
          map: map,
          desc:point['desc'],
          title: point['name'],
          key:point['key'],
          mapLocation:point['mapLocation'],
          url:point['url'],
          urlId:point['urlId']
      });
         markers.push(marker);
        console.log(markers);

$('.menuType').off().on().click(function(){
  console.log($(this)["0"].textContent)
  markersCheck($(this)["0"].textContent);
});   
        
        function returningMarkers() {
         for (n=0; n < removedMarkers.length; n++){
           console.log(removedMarkers)
     removedMarkers[n].setMap(map);
  }
     }

     $('.resetfilters').off().on().click(function(){
returningMarkers();
     });
        $('.places').off().on().click(function(){
          returningMarkers();
          var placeText = $(this)["0"].innerText;
          
          for (i=0; i < markers.length; i++){
  if (markers[i].title === placeText){
    console.log("MATCH")
    markers[i].setAnimation(google.maps.Animation.BOUNCE);
    markers[i].setAnimation(null);
    
    var filterPoint =
         `<div class="infoWindow">
          <h1>${markers[i].title}</h1>
           <p>${markers[i].desc}</p>
           <p>${markers[i].mapLocation}</p>
<a href="${markers[i].urlId}" target="_blank" ><img src="${markers[i].url}"></a>
                 </div>`;
    
              
                     var filterInfowindow = new google.maps.InfoWindow({
          content: filterPoint
        });
    filterInfowindow.open(map, markers[i]);
  }
  else{
    removedMarkers.push(markers[i]);
    markers[i].setMap(null);
    console.log(removedMarkers);
  }
          }
          
          
        });
        
// Checks all markers if they match the type selected, if not, it's pushed to an array.
function markersCheck(type) {
  
  returningMarkers();
  
for (i=0; i < markers.length; i++){
  if (markers[i].key === type){
  }
  else{
    removedMarkers.push(markers[i]);
    markers[i].setMap(null);
  
    console.log(removedMarkers);
  }
  
}
}  


        // Info window functionality
            window.google.maps.event.addListener(marker, 'click', function () {
              
              console.log(this);
               var point =
         `<div class="infoWindow">
          <h1>${this.title}</h1>
           <p>${this.desc}</p>
           <p>${this.mapLocation}</p>
<a href="${this.urlId}" target="_blank" ><img src="${this.url}"></a>
                 </div>`;
              
                     var infowindow = new google.maps.InfoWindow({
          content: point
        });
              var thisForAnimation = this;
              
              infowindow.open(map, this);
              
              
                  thisForAnimation.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){ thisForAnimation.setAnimation(null); }, 450);
              
    });
      }


  locationMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

}
setTimeout(function(){
  initMap();
  console.log('It Ran');
},700);



  export default Choice;