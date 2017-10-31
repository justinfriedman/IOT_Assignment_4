#include"GarageHardware.h"




// TODO: Define any variables or constants here

int state = 0; //state of FSM 
const int millisDelay = 100; //delta time delay 
int remainingTime;
int passedTime;
Timer timer(5000, lightOff, true); //  garage light timer we used on board LED
boolean timerStarted = false; // for garage light auto off s
int lastRGB [6] = {0,0,0,41, 170, 270}; // return led state after error 
boolean called = true;
boolean fullyOpen = false;
boolean fullyClosed  = true;

const int redPin = A4;
const int greenPin = D0;
const int bluePin = D2;
const int faultPin = D5;
const int endStopUpPin = D3;
const int endStopDownPin = D4;
const int controlButtonPin = D1;
int millisButtonPress; // delta time 
 bool buttonState; // delta time 
 int errorState; // for error throwing 
/**
 * Setup the door hardware (all I/O should be configured here)
 *
 * This routine should be called only once from setup()
 */
void setupHardware() {
    
  // TODO: Your code to setup your "simulated" hardware
  
    Serial.begin(9600); //set up serial connection
    Particle.publish("state", String(state));
   
    

    
   pinMode(D7, OUTPUT);
// Button 
    pinMode(controlButtonPin, INPUT_PULLUP);
    
      pinMode(endStopUpPin, INPUT_PULLUP);
       pinMode(endStopDownPin, INPUT_PULLUP);
      
// RGB LED
pinMode( redPin, OUTPUT);
  pinMode( greenPin, OUTPUT);
  pinMode( bluePin, OUTPUT);
  rgbSetter(41, 170, 27);
// Normal LED
Serial.print("Welcome"); // if i time it perfectly i see this
}

/**
 * Return true if the door open/close button is pressed
 *
 * Note: this is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if buttons is currently pressed, false otherwise
 */
bool isButtonPressed() {
  int upDown;
    //check if the button is currently pressed by digital read
    if(digitalRead(controlButtonPin)==0) { 
        return true; 
    } else {
        return false; 
    }
}

/**
 * Return true if the door is fully closed
 *
 * Note: This is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if the door is completely closed, false otherwise
 */
bool isDoorFullyClosed() {
  // TODO: Your code to simulate the closed switch
  //       Use a button, switch, or wired (connected to 3V or GND)
 //end stop sensor simulated with a bool
 
 if ( digitalRead(endStopDownPin) == 0) {
     fullyClosed = true;
     fullyOpen = false;
     return true;
 }

  
  else {
      return fullyClosed;
  }
}

/**
 * Return true if the door has experienced a fault
 *
 * Note: This is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if the door is has experienced a fault
 */
bool isFaultActive() {
  // TODO: Your code to simulate the fault
  //       Use a button, switch, or wired (connected to 3V or GND)
  if (digitalRead(faultPin) == 0) {
      return true;
  }
  else {
      return false;
  }
  
}

/**
 * Return true if the door is fully open
 *
 * Note: This is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if the door is completely open, false otherwise
 */
bool isDoorFullyOpen() {
  // TODO: Your code to simulate the opened switch
  //       Use a button, switch, or wired (connected to 3V or GND)
   
 if ( digitalRead(endStopUpPin) ==0) {
     fullyClosed = false;
     fullyOpen = true;
     return true;
 }

  
  else {
      return fullyOpen;
  }
}

/**
 * This function will start the motor moving in a direction that opens the door.
 *
 * Note: This is a non-blocking function.  It will return immediately
 *       and the motor will continue to opperate until stopped or reversed.
 *
 * return void
 */
void startMotorOpening() {
  // TODO: Your code to simulate the motor opening
  //       Use an individual LED
   rgbSetter(165, 24, 97); //set LED
  fullyClosed = false; // simulate change in state of end stop sensor
}

/**
 * This function will start the motor moving in a direction closes the door.
 *
 * Note: This is a non-blocking function.  It will return immediately
 *       and the motor will continue to opperate until stopped or reversed.
 *
 * return void
 */
void startMotorClosing() {
  // TODO: Your code to simulate the motor closing
  //       Use an individual LED
   rgbSetter(255, 0, 255); // set LED
  state = 1; // increment state
  Particle.publish("state", String(state));
  fullyOpen = false; // simulate change in end state sensor 
}

/**
 * This function will stop all motor movement.
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void stopMotor() {
  // TODO: Your code to simulate the motor being stopped
  //       Should impact the opening/closing LEDs
}

/**
 * This function will control the state of the light on the opener.
 *
 * Parameter: on: true indicates the light should enter the "on" state;
 *                false indicates the light should enter the "off" state
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void setLight(boolean on) {
  // TODO: Your code to simulate the light
  //       Use an individual LED
  
   if (on == true) {
    digitalWrite(D7, HIGH);
    //  Serial.println("light on");
    }
    if (on == false) {
        digitalWrite(D7, LOW);
     timerStarted = false;
    }
}


/**
 * This function will control the state of the light on the opener.
 * (OPTIONAL:  This is only needed for the extra credit part of assignment 3)
 *
 * Parameter: cycle (0-100).  0 indicates completely Off, 100 indicates completely on.
 *            intermediate values are the duty cycle (as a percent)
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void setLightPWM(int cyclePct) {
  // TODO: Your code to simulate the light
  //       Use an individual LED
}





// OUR METHODS

// void timerOver(){
    
//     switch (state) {
//     case 0:
//     //down 
    
      
//       break;
//     case 1:
//     //going down
//     Serial.println("down");
//     state = 0;
//       break;
//     case 2:
//     //going up
   
//     Serial.println("up");
//      state = 3;
//       break;
//     case 3:
//     //up
      
//       break;
//     case 4:
//      //stopped going down
//       break;
//     case 5:
//   //stopped going up
//         break;
//     case 6:
//     //error
        
//         break;
    
//   }
// }

void rgbSetter(int r, int g, int b) { // parameters are the 0-255 r,g,b values
    //this section sets the start of the array of two rgb 
    //color numbers to the last color used so that, in 
    //the case of a service error, color can be restored
    lastRGB[0] = lastRGB[3]; 
    lastRGB[1] = lastRGB[4];
    lastRGB[2] = lastRGB[5];
    //set 3,4,5 -> r,g,b
    lastRGB[3] = r;
    lastRGB[4] = g;
    lastRGB[5] = b;
    //write the new color to the LED
    analogWrite(redPin, r);
    analogWrite(greenPin, g);
    analogWrite(bluePin, b);
    
    //colors
    //up
    //255, 0, 16
    //going up
    //165, 24, 97
    //stopped going up
    //25, 22, 173
    //down
    //41, 170, 27
    //going down
    //255, 0, 255
    //stopped going down
    //255, 225, 0
    
}


void lightOff() {
    setLight(false);
}

void goUp() {
    state = 2; // increment state
    Particle.publish("state", String(state));
    timer.stop(); // stop active timer
    timerStarted = false; 
    setLight(true); // change state of overhead light
    rgbSetter(165,24,97);
    startMotorOpening(); // call API
    // timer.changePeriod(param);
    // timer.start();
    // passedTime = millis();
    Serial.println("going up");
}

void goDown() {
    
    state = 1; // increment state
    // Particle.publish("state", String(state));
    startMotorClosing(); // call API
    timer.stop();
     timerStarted = false;
    setLight(true); // change overhead light state
    rgbSetter(255,0,255);
    // timer.changePeriod(param);
    // timer.start();
    // passedTime = millis();
    Serial.println("going down");
}

void goingUp(){
    state = 5; // increment state
   Particle.publish("state", String(state));
    stopMotor(); // call API
    // timer.stop();
    // remainingTime = millis() - passedTime;
    // timer.changePeriod(remainingTime);
    Serial.println("stopped going up, will go down on next press");
    rgbSetter(25, 22, 173); // change lED state
}

void goingDown(){
    
    state = 4; // increment state 
    Particle.publish("state", String(state));
    stopMotor(); // call API
    // timer.stop();
    // remainingTime = millis() - passedTime;
    // timer.changePeriod(remainingTime);
    Serial.println("stopped going down, will go up on next press");
    rgbSetter(255, 225, 0); // change lED 
}



//FSM diagram with key can be found at https://goo.gl/SGu56w
void fSM(int param) { // param is the state passed into the state machine
    switch (param) {
    case 0: //if the state is 0 (the door was down when the fsm was called) call goUp()
    goUp();
    
      
      break;
    case 1: // if the state is 1(going down) when the fsm was called, call goingDown()
    //going down
      goingDown();
      break;
    case 2: // if the state is 2(going up) when the fsm was called, call goingUp()
    goingUp(); 
      break;
    case 3: // if the state is 3(up) when the fsm was called, call goDown()
    //up
      goDown();
     break;
    case 4: // if the state is 4(stopped going down) when the fsm was called, call goUp()
     //stopped going down
     goUp();
      break;
    case 5: // if the state is 5(stopped going up) when the fsm was called, call goDown()
    goDown();
        break;
    case 6: // due to the manner in which we simulated the fault trigger, this state is empty
    //error
        
        break;
    
  }
}

void fault() {
     if (isFaultActive() && state != 6) { // if the fault is triggered and we are not in the fault state
        errorState = state; // save the last state
        state = 6; // state is now the error state
       Particle.publish("state", String(state));
        rgbSetter(0,0,0); // LED off
        Serial.println("error"); 
        delay(100);
       
        
    }
}

void atTop(){
    if (state == 2 && isDoorFullyOpen()) { // if the state is going up and we hit an endstop
        state = 3; // state is up
       Particle.publish("state", String(state));
        fullyOpen = true;
        rgbSetter(255, 0, 16);
        Serial.println("up");
        
       timerStarted = true;
       timer.start(); //start overhead light
        // Serial.println("light timer started");
        
        
    }
}

void atBottom() {
    if (state == 1 && isDoorFullyClosed()) { // if the state is going down and we hit an endstop
        state = 0;
        Particle.publish("state", String(state));
        fullyClosed = true;
        rgbSetter(41, 170, 27);
        Serial.println("down");
        
       timerStarted = true;
       timer.start(); // start overhead light
    //   Serial.println("light timer started");
       
    }
}

void deltaTimingStart(){
    if (isButtonPressed() == true && buttonState == false){ // delta timing  start, if api call is true and the button wasnt already pressed
       buttonState = true;  // button is pressed
       millisButtonPress = millis(); // record time at time of button press
       called = false; // we have not called the trigger yet
   }
}

void deltaTimingTrigger() {
    if((millis() - millisButtonPress) > millisDelay  ) { // delta timing trigger, if current time - button pressed time > 100ms delay
       if (called == false) { // if we have not called the trigger yet
           fSM(state); // call to FSM 
           setLight(true); // call to change light state
           called = true; // we have called trigger
       }
       if(buttonState != isButtonPressed()) { // if the button is no longer pressed, change state
            
            buttonState = false;
       }
       
   }
}

void internetButton() {
    fSM(state); // call to FSM 
   setLight(true); // call to change light state
   
}

void endFault() {
    if (isButtonPressed() == true && state == 6) { //come out of fault 
   
        while(isButtonPressed() == true) {
            
        }
        Serial.println("out of error");
        rgbSetter(lastRGB[1],lastRGB[2],lastRGB[3]); // reset color
        state = errorState; //reset state
       
        
        
    }
   
}
