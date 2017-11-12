
var particle = new Particle();

// Define all the values that we'll be using

//*************************************************************************************
//******* Part 1: In an actual application these values would be included in the app

// The "Product" that this customer will be using
var productId = "6153"

// The OAuth ID and Token that will be used to create customers for the Product
var clientId = "washu-garage-door-5162"
var clientToken = "882ec3178524a02ad8bdb1473fd6aaa143f5a38c"

//*************************************************************************************
// ****** Part 2: In an actual application these values would be retrieved from the devices
// ****** while configuring Wi-Fi
// The two devices that will be registered to the customer
var deviceOneId = "2e0060000e51353338363333"
// var deviceTwoId = "2e0060000e51353338363333"



//*************************************************************************************
// ****** Part 3: In an actual application these values would be entered by the user at run time
// ****** (You should get them from your user when you update your work, but you can hardcode them
// ****** here to test the process)
// The email/password the customer wants to use
var email = "test@gmail.com"
var password = "test"


//*************************************************************************************
// The customer's token after they login. This will be returned by particle.
var customerToken = "LEAVE ALONE"

// The Particle API does not come with a "create customer" function, so we'll add one to the
// particle object (Don't use this for a true web based app --- use Particle's
// web app mechanism instead. Since we will be migrating all this work to a mobile this
// approach is acceptable for now)

/**
 * Add a new customer to the database (not officially added until they add a device to their account)
 * @param {Object} options Options for this API call
 * @param {String} options.productId Use the Product ID number
 * @param {String} options.clientId The OAuth Client ID
 * @param {String} options.clientToken The OAuth token
 * @param {String} options.customerEmail The customer's e-mail
 * @param {String} options.customerPassword The customer's password
 * @return {Promise}
 */
particle.createCustomer = function ({ productId, clientId, clientToken, customerEmail, customerPassword }) {
 const auth = clientId + ':' + clientToken;
 const uri = `/v1/products/${productId}/customers`;
 return this.post(uri, {productIdOrSlug:productId, client_id:clientId, client_secret:clientToken, email:customerEmail, password:customerPassword
 }, auth, this.context);
}


// Create a customer and, if successful, register devices.
// This "chains promises":
//    If creating the customer works, then it will get the claim code.
//    If getting the claim code works too, then it will claim device one
//    If claiming device one also works, then it will claim device two
particle.createCustomer( {productId:productId, clientId:clientId, clientToken:clientToken, customerEmail:email, customerPassword:password} )
 .then(saveTokenAndClaimDeviceOne)
 // .then(claimDeviceTwo)
 .then(doneClaimingDevices)
 .catch(errorClaimingDevices)

//*************************************************************************************
// Helper functions: Each prints some debugging info and makes a request

function saveTokenAndClaimDeviceOne(data) {
 console.log("Success creating customer; Claiming Device One");
 console.dir(data)
 customerToken = data.body.access_token;
 // Return a "promise" object (so .then() can be used)
 return particle.claimDevice({deviceId:deviceOneId, requestTransfer:true, auth:customerToken})
}

// function claimDeviceTwo(data) {
//  console.log("Success claiming device one; Claiming Device Two");
//  console.dir(data)
//  // Return a "promise" object (so .then() can be used)
//  return particle.claimDevice({deviceId:deviceTwoId, requestTransfer:true, auth:customerToken})
// }

function doneClaimingDevices() {
 console.log("Done Claiming Devices");
}

function errorClaimingDevices() {
 console.log("Error Claiming Devices");
}
