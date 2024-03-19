/**
 * 
 * Timer to track the players time to completion
 * 
 */



class gameTimer {
    //Units of time
    this.hours = 0;
    this.min = 0;
    this.sec = 0;
    this.milisec = 0;   //Used for internal tracking, not displayed

    //Switch to turn on an off the timer
    this.timerInterval = null;


    function tick() {
        //Already checks for valid ticking (interval)
        this.milisec += 10;

        //Second update
        if (sec != 60 && this.milisec == 1000) {
            sec += 1;
            milisec = 0;
        }


        
    }

    function startTicking() {
        //Based on one second interval (1000 milliseconds)
        this.timerInterval = setInterval(tick, 10);
    }


    function getSeconds(){
        return sec;
    }

    function getMin() {
        return min;
    }

    function getHour() {
        return hours;
    }



    function toString() {
        return hours + ":" + min + ":" + sec + "\n";
    }

}