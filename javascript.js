//users
var user1; //user object for the session
var currentView; //current display
var newUser = false; //has a new user been created?


var particle = new Particle();
var token = "7c83775c4059f279dac14fd2b15424b79ea336ba"; // from result of particle.login

particle.login({username: 'jordangonen1@gmail.com', password: 'password'}).then(
  function(data) {
    token = data.body.access_token;
    console.log('we logged in');
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);





//array of user account objects
var users = [

         user1 = {
                door: {
                        state:3,  // 0 for down, 1 for coming down, 2 for going up, 3 for up
                        temp: "72f",
                        hum: "34%",
                        motion: true, // boolean

                },
                email:"test@test.com",
                password:"test",
                phone:"5555555555",
                id:1234563,
                settings: {
                        name: "Home",
                        temp: true,
                        hum: true,
                        motion: true,
                        autoClose: 14,
                        autoOpen: 200,
                        mobile: {
                                open: true,
                                close: true,
                                openFor: 11,
                        }

                }
        },
         user2 = {
                door: {
                        state:0,  // 0 for down, 1 for coming down, 2 for going up, 3 for up
                        temp: "72f",
                        hum: "34%",
                        motion: true, // boolean

                },
                email:"dotard@down.us",
                password:"maga",
                phone:"5555555566",
                id:9876123,
                settings: {
                        name: "Home",
                        temp: true,
                        hum: true,
                        motion: true,
                        autoClose: 14,
                        autoOpen: 200,
                        mobile: {
                                open: true,
                                close: true,
                                openFor: 11,
                        }

                }
        }



];




//main page initilization function

function mainSetter() {
        titleSetter();
        settingsSetter();

        if (user1.door.state == 0) {
                document.getElementById('open').style.backgroundColor = 'rgb(65, 159, 49)';
        }
        if (user1.door.state == 3) {
                document.getElementById('open').style.backgroundColor = 'rgb(247, 47, 47)';
        }



}

function titleSetter() { //initilizes the page title
        if (user1.door.state == 0) {
                stateName = "Down";
                document.getElementById('close-btn').innerHTML = "Open"
        }

        if (user1.door.state == 3) {
                stateName = "Up";
                document.getElementById('close-btn').innerHTML = "Close"
        }
        if (user1.door.state == 1) {
                stateName = "Goin Up";

        }
        if (user1.door.state == 2) {
                stateName = "Going Down";

        }
        document.getElementById('card-title').innerHTML = "Door is " + stateName;

}

function settingsSetter() { //initilies the settings states
        document.getElementById('garage-name').value =user1.settings.name;
        document.getElementById('garage-id').value =user1.id;
        document.getElementById('temp-check').checked =user1.settings.temp;
        document.getElementById('hum-check').checked =user1.settings.hum;
        document.getElementById('motion-check').checked =user1.settings.motion
        document.getElementById('example-number-input').value =user1.settings.autoClose;
        document.getElementById('yard-input').value =user1.settings.autoOpen;
        document.getElementById('door-opens-check').checked =user1.settings.mobile.open;
        document.getElementById('door-closes-check').checked =user1.settings.mobile.close;
        document.getElementById('door-open-check').checked =user1.settings.mobile.openFor;
}

function sensorDisplay() {
        var tempState = document.getElementById('temp-check').checked;
        console.log(document.getElementById('temp-check').checked);
        var humState = document.getElementById('hum-check').checked;
        var motionState = document.getElementById('motion-check').checked;

        if (tempState == true) {
                document.getElementById('temp-display').innerHTML = user1.door.temp;
        }
        if (tempState == false) {
                document.getElementById('temp-display').innerHTML = "";
        }
        if (humState == true) {
                document.getElementById('hum-display').innerHTML = user1.door.hum;
        }
        if (humState == false) {
                document.getElementById('hum-display').innerHTML = "";
        }
        if (motionState == true) {
                document.getElementById('motion-display').innerHTML = user1.door.motion;
        }
        if (motionState == false) {
                document.getElementById('motion-display').innerHTML = "";
        }
}


// Display Element

function displayElement(hide, show) {
  document.getElementById(hide).style.display = 'none';
  document.getElementById(show).style.display = 'block';
  currentView = show;
}
function singleDisplay(x) {
  document.getElementById(x).style.display ='block';
}

// login button
document.getElementById("login-btn").addEventListener("click", function() {

        var email = document.getElementById('email').value;
        var password = document.getElementById('pw').value;
        if (email == user1.email && password == user1.password ) {

                console.log("USER 1 LOGIN"); //replace with call to display function
                user1 = user1;
                mainSetter();
                displayElement("login-page","main-page");
                document.getElementById('logout-li').innerHTML = '<a href="#" id="logout">Logout</a>';
                document.getElementById("logout").addEventListener("click", function() {
                    displayElement(currentView,"login-page");
                    user1 = '';
                    currentView = 'login-page';
                    document.getElementById('logout-li').innerHTML = '';

                });

        }
        if (email == user2.email && password == user2.password) {

                console.log("USER 2 LOGIN");//replace with call to display function
                user1 = user2;

                mainSetter();
                displayElement("login-page","main-page");
                document.getElementById('logout-li').innerHTML = '<a href="#" id="logout">Logout</a>';
                document.getElementById("logout").addEventListener("click", function() {
                        displayElement(currentView,"login-page");
                        user1 = '';
                        currentView = 'login-page';
                        document.getElementById('logout-li').innerHTML = '';
                });


        }

                if (newUser == true) {
                        if (email == user3.email && password == user3.password) {

                                console.log("USER 3 LOGIN");//replace with call to display function
                                user1 = user3;
                                mainSetter();
                                displayElement("login-page","main-page");
                                document.getElementById('logout-li').innerHTML = '<a href="#" id="logout">Logout</a>';
                                document.getElementById("logout").addEventListener("click", function() {
                                        displayElement(currentView,"login-page");
                                        user1 = '';
                                        currentView = 'login-page';
                                        document.getElementById('logout-li').innerHTML = '';
                                });
                        }
                        if(email != user1.email && email != user2.email && email != user3.email) {
                                alert("Wrong Login Details. Try Again.");
                                console.log("WRONG LOGIN INFO");//replace with print to page of inncorrect password or email
                        }

                }
        if(newUser == false && email != user1.email && email != user2.email) {
                alert("Wrong Login Details. Try Again.");
                console.log("WRONG LOGIN INFO");//replace with print to page of inncorrect password or email
        }

});

// forgot-password-button
document.getElementById("forgot-pwd-btn").addEventListener("click", function() {
    displayElement("login-page","request-page");
});
// forgot-password-button
document.getElementById("forgot-pwd-btn").addEventListener("click", function() {
    displayElement("login-page","request-page");
});
document.getElementById("create-account-btn").addEventListener("click", function() {
    displayElement("login-page","create-page");
});
document.getElementById("complete-creation-btn").addEventListener("click", function() {


    if(document.getElementById("email-registration").value != "" &&
    document.getElementById("email-registration").value != "" &&
    document.getElementById("pw-registration").value != "" &&
    document.getElementById("phone-registration").value != "" &&
    document.getElementById("id-registration").value != "") {


      user3 = {
             door: {
                     state:3,  // 0 for down, 1 for coming down, 2 for going up, 3 for up
                     temp: "72f",
                     hum: "34%",
                     motion: true, // boolean

             },
             email:"",
             password:"",
             phone:"",
             id:"",
             settings: {
                     name: "Home",
                     temp: true,
                     hum: true,
                     motion: true,
                     autoClose: 14,
                     autoOpen: 200,
                     mobile: {
                             open: true,
                             close: true,
                             openFor: 11,
                     }

             }
      };

      user3.email = document.getElementById("email-registration").value;
      user3.password = document.getElementById("pw-registration").value;
      user3.phone = document.getElementById("phone-registration").value;
      user3.id = document.getElementById("id-registration").value;
      newUser=true;
      users.push["user3"];
      displayElement("create-page","login-page");

    } else {
      alert("Please fill out the entire form.")
    }



});
document.getElementById("request-pwd-btn").addEventListener("click", function() {
    passWrite();
});


document.getElementById("settings-btn").addEventListener("click", function() {
    displayElement("main-page","edit-page");
});
document.getElementById("save-btn").addEventListener("click", function() {
        sensorDisplay();
    displayElement("edit-page","main-page");
});
document.getElementById('nav-doors').addEventListener('click', function() {
        if (currentView != 'login-page' && currentView != 'request-page' && currentView != 'create-page') {
                displayElement(currentView,"main-page");
        }

});
document.getElementById("close-btn").addEventListener("click", function() {
    stateChange();
});

// document.getElementById("back-to-main").addEventListener("click", function() {
//         passScrape();
//     displayElement("request-page","login-page");
// });




// state change animation function for door open and close
function stateChange() {
        //
        // green rgb(65, 159, 49)
        // red rgb(247, 47, 47)
        if (user1.door.state == 0) { //down to up animation
                user1.door.state = 1;
                console.log(user1.door.state);
                titleSetter();

                document.getElementById('open').style.backgroundColor  = 'rgb(247, 231, 12)';//waiting color

                setTimeout(function(){ document.getElementById('open').style.backgroundColor  = 'rgb(247, 47, 49)';
                user1.door.state = 3;
                console.log(user1.door.state);
                titleSetter();

                }, 5000);

        }
        if (user1.door.state == 3) { // up to down animation
                user1.door.state = 2;
                titleSetter();
                document.getElementById('open').style.backgroundColor  = 'rgb(247, 231, 12)';

                setTimeout(function(){ document.getElementById('open').style.backgroundColor  = 'rgb(65, 159, 49)';
                user1.door.state = 0;
                titleSetter();

                }, 5000);

        }

}

//retrive forgoten passwords

function passWrite() {
        var requestUser;
        if (document.getElementById('request-email').value == user1.email) {
                requestUser = user1;

        }
        if (document.getElementById('request-email').value == user2.email) {
                requestUser = user2;
        }
        if (newUser == true) {
                if (document.getElementById('request-email').value == user3.email) {
                        requestUser = user3;

                }
        }

        console.log(requestUser);
        alert('Your password is ' + requestUser.password);


}
function passScrape() {

}
