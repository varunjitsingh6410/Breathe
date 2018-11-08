var count = 0;
var checkin_q2 = 'How many times did you smoke today?';
var checkin_q3 = 'When was the last time you smoked?';
var checkin_qs = [checkin_q2, checkin_q3];
var checkin_entry, checkin_submit;
var amt_today = 0;
var checkin_responses = [];
var responseCount = 0;
sessionStorage.setItem("isLoggedIn", false);
var arrTemp = [];



function loginStore() {
    var username = document.getElementById("username");
    sessionStorage.setItem('username', username.value);
    var password = document.getElementById('password');
    sessionStorage.setItem("password", password.value);
}

/** 
 * Stores data for checkin:
 * xSmoked is first checkin answer
 * hours is second
 * minutes is third
 **/
function checkinData() {
    if (arrTemp.length != 3) {
        console.log("Oops! Looks like something went wrong. Please click Check-In to start over.");
        console.error("Oops! Looks like something went wrong. Please click Check-In to start over.");
        alert("Oops! Looks like something went wrong. Please click Check-In to start over.");
        return;
    }
    //Using arrTemp, store data in sessionStorage
    sessionStorage.setItem('minutes', arrTemp.pop().value);
    sessionStorage.setItem('hours', arrTemp.pop().value);
    sessionStorage.setItem('xSmoked', arrTemp.pop().value);
}


/**
 * Dictates interaction with checkin questions  
 **/
function checkinChange(caseNum) {
    //
    var checkin_form = document.getElementById('checkin-responses');
    var button1 = document.getElementById('button-one');
    var button2 = document.getElementById('button-two');
    var default_b1_flag = false;

    switch (caseNum) {
        //Happens after user clicks "Yes" to answer "Did you smoke today?" (first question)
        case 1:
            //create necessary for second change
            var removed = document.getElementById('xSmoked');
            removed.parentNode.removeChild(removed);
            var hours = document.createElement('input');
            var minutes = document.createElement('input');
            var br = document.createElement('br');
            var br2 = document.createElement('br');
            var br3 = document.createElement('br');
            
            //question change
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "Roughly how long ago did you smoke?";

            //set input elem attributes and insert into checkin form
            hours.setAttribute('type', 'number');
            hours.setAttribute('id', 'hours');
            hours.setAttribute('min', '0');
            hours.setAttribute('max', '24');
            hours.setAttribute('placeholder', 'Hours')
            minutes.setAttribute('type', 'number');
            minutes.setAttribute('id', 'minutes')
            minutes.setAttribute('min', '0');
            minutes.setAttribute('max', '60')
            minutes.setAttribute('placeholder', 'Minutes');
            checkin_form.insertBefore(br, button1);
            checkin_form.insertBefore(br2, br);
            checkin_form.insertBefore(minutes, br2);
            checkin_form.insertBefore(br3, minutes);
            checkin_form.insertBefore(hours, br3);

            //use temp array to globally store checkin data for session storage transfer
            arrTemp.push(document.getElementById('hours'));
            arrTemp.push(document.getElementById('minutes'));

            //change the buttons
            button1.innerHTML = "Submit";
            //button1.setAttribute('onclick', 'checkinChange(2); checkinData()');
            button1.setAttribute('type', 'button');
            button2.innerHTML = "Start Over";
            button2.setAttribute('onclick', "window.location.href='health.html'");
            button2.setAttribute('type', 'button');

            //checks every 1000 milliseconds whether required input has been entered
            setInterval(function() { 
                if (hours.value.length < 1 || minutes.value.length < 1) {
                    button1.setAttribute('onclick', "alert('Please fill in both Hours and Minutes fields!')");
                }
                else {
                    button1.setAttribute('onclick', 'checkinChange(2); checkinData()');
                }
            }, 1000);
            break;

        //Happens after user clicks "Submit"(third question) 
        //OR after user selects "No" (first question)
        case 2:
            //remove buttons and change display
            checkin_form.parentNode.removeChild(checkin_form);
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "Thanks for Checking in!"

            //store items of tmp
            break;    
        
        //Default by convention, details what happens after user selects "Yes" (First question)
        default:
            //create variables necessary for first change
            var ans =  document.createElement('input');
            var br = document.createElement('br');
            var br2 = document.createElement('br');

            //question change
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "How many times did you smoke?";
            
            //set input elem attributes and insert into checkin form
            ans.setAttribute('type', 'number');
            ans.setAttribute('min', '1');
            ans.setAttribute('onkeydown', 'return false');
            ans.setAttribute('placeholder', 'number of times you smoked today');
            ans.setAttribute('autocomplete', 'off');
            ans.setAttribute('id', 'xSmoked');
            checkin_form.insertBefore(br, button1);
            checkin_form.insertBefore(br2, br);
            checkin_form.insertBefore(ans, br2);
            
            //use temp array to global store in order to transfer to session storage
            arrTemp.push(document.getElementById('xSmoked'));

            //change the buttons
            button1.innerHTML = "Enter";
            //button1.setAttribute('onclick',"checkinChange(1);");
            button1.setAttribute('type', 'button');
            button2.innerHTML = "Start Over";
            button2.setAttribute('onclick', "window.location.href='health.html'");
            button2.setAttribute('type', 'button');
            setInterval(function() { 
                if (ans.value.length < 1) {
                    button1.setAttribute('onclick', "alert('Please enter the number of times you smoked today!')");
                }
                else {
                    button1.setAttribute('onclick', 'checkinChange(1)');
                }
            }, 1000);
            break;
    }
    return false;
}

/**
 * Checks whether the user is logged in by verifying username isn't null. Redirects
 * user from any page on site to login if username is null (sessionStorage)
 **/
function isLoggedIn() {
    if (sessionStorage.getItem('username') != null) {
        return;
    }
    else {
        window.location.assign("login.html");
    }
}

/**
 * Starts count up on home screen after a user has checked in on the health page
 **/
function startTimer() {
    var yr = new Date().getFullYear();
    var day = new Date().getDay();
}







function renderHTML(tag, id, attribute, attVal, inner, parent) {
    var btn = document.createElement(tag);
    var text = document.createTextNode(inner);
    btn.setAttribute('id', 'checkin-amount');
    btn.setAttribute(attribute, attVal);
    btn.appendChild(text);
    parent.appendChild(btn);
    return btn;
}

function storeVar() {
    responseCount++;
    checkin_responses.push();
}

function displayTime(time) {

}

function changeText(){
    count++;
    switch (count) {
        case 1:
            checkin_q.innerHTML = checkin_qs[0];
            replaceYN(1);
            break;

        case 2:
            checkin_q.innerHTML = checkin_qs[1];
            replaceYN(2);
            break;
        
        default:
            break;
        
    }
}

/* */
function replaceYN(num) {
    switch (num) {
        case 1:
            var parent = checkin_yes.parentNode;
            parent.removeChild(checkin_no);
            parent.removeChild(checkin_yes);
            checkin_entry = renderHTML("input", "checkin-entry", "type", "number", "", parent);
            checkin_responses.push(document.getElementById('checkin-entry'));
            checkin_entry.setAttribute("min", "1");
            parent.appendChild(document.createElement("br"));
            parent.appendChild(document.createElement("br"));
            checkin_submit = renderHTML("button", "checkin-submit", "onclick", "changeText(); storeVar(document.getElementById('checkin-entry'));", "Submit", parent);
            checkin_submit.setAttribute('class', 'checkin-submit');
            break;

        case 2:
            var parent = checkin_submit.parentNode;
            parent.removeChild(checkin_submit);
            parent.removeChild(checkin_entry);
            checkin_entry = renderHTML("input", "checkin-entry2", "type", "number", "", parent);
            checkin_entry.setAttribute('placeholder', 'Hours');
            checkin_entry.setAttribute("min", "0");
            parent.appendChild(document.createElement("br"));
            checkin_entry = renderHTML("input", "checkin-entry2", "type", "number", "", parent);
            checkin_entry.setAttribute('placeholder', 'Minutes')
            checkin_entry.setAttribute("min", "1");
            checkin_entry.innerHTML = "Hours";
            checkin_entry.setAttribute("min", "1");
            parent.appendChild(document.createElement("br"));
            parent.appendChild(document.createElement("br"));
            checkin_submit = renderHTML("button", "checkin-submit2", "onclick", "changeText()", "Submit", parent);
            checkin_submit.setAttribute('class', 'checkin-submit');
            break;

        default:
            break;
    }
}