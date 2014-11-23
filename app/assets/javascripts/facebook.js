window.fbAsyncInit = function() {
  FB.init({
    appId      : '325873250932813',
    xfbml      : true,
    version    : 'v2.2'
  });
};

var name;
var email;
var id;
var user_friends = [];

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


//login function to call if button not used
function initLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log(response.name);
        console.log(response.email);
        console.log(response.id);
        name = response.name;
        email = response.email;
        id = response.id;
        checkUserState(response); // check database for user
        friends();
        geolocation();
        updateHTML();
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'public_profile,email', return_scopes: true});
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log('Connected');
    friends(); // Get the friends using the app.
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
  }
}

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    initLogin();
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //     'Thanks for logging in, ' + response.name + '!';
  //   });
  // }

  // Here we get the list of friends using the app.
  function friends(){
    FB.api(
    "/me/friends",
    function (response) {
      if (response && !response.error) {
        for(key in response.data) {
          friend = response.data[key]
          user_friends[friend.name] = {id: friend.id};
          $.ajax({
            type: "POST",
            url:"/friends",
            data: { name: name, friend_name: friend.name }
          });
        }
        console.log(response);
      }
    }
  );
}


  // Check email for in database
  function checkUserState(response){
    $.ajax({
      type: "GET",
      url: "/users",
      data: { email: response.email},
      complete: function(xhr, status){
        if(xhr.status == 404){
          registerUser(response);
        }
      }
    })
  }

   // register user
   function registerUser(response){
     $.ajax({
       type: "POST",
       url:"/users",
       data: { user: {email: response.email, facebook_id: response.id, name: response.name}},
       complete: function(xhr, status){
         if(xhr.status == 400){

         }
       }
     });
   }

   // if desktop
   function noCompass(){
     Compass.noSupport(function () {
       $('.compass').hide();
     });
   }

   // if android
   function androidCompass(){
     Compass.needGPS(function () {
       $('.go-outside-message').show();          // Step 1: we need GPS signal
     }).needMove(function () {
       $('.go-outside-message').hide()
       $('.move-and-hold-ahead-message').show(); // Step 2: user must go forward
     }).init(function () {
       $('.move-and-hold-ahead-message').hide(); // GPS hack is enabled
     });
   }

   // compass heading listener
   function headingCompass(){
   Compass.watch(function (heading) {
     $('.degrees').text(heading);
     $('.compass').css('transform', 'rotate(' + (-heading) + 'deg)');
   });
 }

   // init compass
   Compass.init(function (method) {
     console.log('Compass heading by ' + method);
   });




function geolocation() {
  navigator.geolocation.watchPosition(useGeoData,
      handleGeoError,
      {enableHighAccuracy: true}
  );

  setInterval(eventLoop, 500);
}

function useGeoData(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  console.log(latitude + ", " + longitude);

  // Send geodata to server
  $.ajax({
    type: "POST",
    url:"/geodata",
    data: { email: email, position: {latitude: latitude, longitude: longitude}},
  });

  direction(latitude, longitude);

}

function handleGeoError(err) {
  if(err == -1) {
    // User said no
    console.log("User does not allow us to check their pos");
  }
}

function eventLoop() {
  // Push my location
  // Get their location

  /*$.ajax({
    type: "GET"
    url: "/geodata/1",
    data: {}
  })*/
  // Update compass
  // ???
  // Profit
}

function updateHTML() {
  $.get('/compass', function(data){
    $('body').html($(data).find('body'));
  });
}

function direction(lat, long){
  for(name in user_friends){
    var friend_data = $.get('/geodata', {name: name}, function(data){});
    break;
  }
  var friend_lat = friend_data.push[0];
  var friend_long = friend_data.push[1];
  var bear = bearing(lat, long, friend_lat, friend_long);
  console.log(bear);

}

/**
* Calculate the bearing between two positions as a value from 0-360
*
* @param lat1 - The latitude of the first position
* @param lng1 - The longitude of the first position
* @param lat2 - The latitude of the second position
* @param lng2 - The longitude of the second position
*
* @return int - The bearing between 0 and 360
*/
function bearing(lat1,lng1,lat2,lng2) {
  var dLon = (lng2-lng1);
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  var brng = this._toDeg(Math.atan2(y, x));
  return 360 - ((brng + 360) % 360);
}

/**
* Since not all browsers implement this we have our own utility that will
* convert from degrees into radians
*
* @param deg - The degrees to be converted into radians
* @return radians
*/
function _toRad(deg) {
  return deg * Math.PI / 180;
}
/**
* Since not all browsers implement this we have our own utility that will
* convert from radians into degrees
*
* @param rad - The radians to be converted into degrees
* @return degrees
*/
