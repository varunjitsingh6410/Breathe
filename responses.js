var count = 0;
var checkin_q = document.getElementById("checkin-q");
var checkin_q2 = 'How much did you smoke today?';
var checkin_q3 = 'When was the last time you smoked?';
var checkin_qs = [checkin_q2, checkin_q3];

function changeText(){
    count++;
    switch (count) {
        case 1:
            checkin_q.innerHTML = checkin_qs[0];
            break;

        case 2:
            checkin_q.innerHTML = checkin_qs[1];
            break;
        
        default:
            break;
        
    }
}

function display() {
    
}