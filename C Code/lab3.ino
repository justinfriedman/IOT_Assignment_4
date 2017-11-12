

// This #include statement was automatically added by the Particle IDE.

#include "garageHardware.h"



void setup() {
    setupHardware(); // from API

}

void loop() {
   fault(); //check for fault
   atTop();// check if at top
    atBottom(); // check if at bottom
    deltaTimingStart(); // start delta timing
   deltaTimingTrigger(); // fire delta timing
   endFault(); // check for fault off
}
