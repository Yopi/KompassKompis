window.fbAsyncInit = function() {
  FB.init({
    appId      : '325873250932813',
    xfbml      : true,
    version    : 'v2.2'
  });
  initLogin();
};

var name;
var email;
var id;
var user_friends;

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
          name = response.name;
          email = response.email;
          id = response.id;
          checkUserState(email); // check database for user
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile,email,user_friends', return_scopes: true});
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
    //initLogin();
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    });
  }

  // Here we get the list of friends using the app.
  function friends(){
    FB.api(
    "/me/friends",
    function (response) {
      if (response && !response.error) {
        console.log(response);
      }
    }
  );
}


  // Check email for in database
  function checkUserState(user_email){
    $.ajax({
      type: "GET",
      url: "/users",
      data: { email: user_email},
      complete: function(xhr, status){
        if(xhr.status == 404){

        }
      }
    })
  }

   // register user
   function registerUser(){

   }
