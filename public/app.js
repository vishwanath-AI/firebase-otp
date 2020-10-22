
function getUiConfig() {
  return {
    'callbacks': {
      'signInSuccess': function(user, credential, redirectUrl) {
        handleSignedInUser(user);
        return false;
      }
    },
    'signInFlow': 'popup',
    'signInOptions': [
	
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', 
          size: 'invisible',
          badge: 'bottomleft' 
        },
	      defaultCountry: 'IN', 
	      defaultNationalNumber: '1234567890',
	      loginHint: '+11234567890'
	}
        ],
    'tosUrl': 'https://www.google.com'
  };
}

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var handleSignedInUser = function(user) {
  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('phone').textContent = user.phoneNumber;
};

var handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
};

firebase.auth().onAuthStateChanged(function(user) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
.then(function() {
  var provider = new firebase.auth.phoneAuthProvider();
  // In memory persistence will be applied to the signed in Google user
  // even though the persistence was set to 'none' and a page redirect
  // occurred.
  return firebase.auth().signInWithRedirect(provider);
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});

var initApp = function() {
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
};

window.addEventListener('load', initApp);

/*generateing coupencode dynamically*/

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
   document.getElementById('demo').innerHTML = makeid(10);

