

// This #include statement was automatically added by the Particle IDE.

#include "GarageHardware.h"



void setup() {
    setupHardware(); // from API
  
}
 
void loop() {
   fault();
   atTop();
    atBottom();
    deltaTimingStart();
   deltaTimingTrigger();
   endFault();
}


