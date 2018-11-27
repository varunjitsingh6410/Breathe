sessionStorage.setItem('count', 0);
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
    sessionStorage.setItem('count', 1);

    //store last-smoked as a date
    var date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()-sessionStorage.getItem('hours'),
         date.getMinutes()-sessionStorage.getItem('minutes'), date.getSeconds(), date.getMilliseconds());
    sessionStorage.setItem('last-smoked', date);
}


/**
 * Dictates interaction with checkin questions  
 **/
function checkinChange(caseNum) {
    //Form functionality vars
    var checkin_form = document.getElementById('checkin-responses');
    var button1 = document.getElementById('button-one');
    var button2 = document.getElementById('button-two');

    switch (caseNum) {
        //Happens after user clicks "Yes" to answer "Did you smoke today?" (first question)
        case 1:
            //remove old content
            if (document.getElementById('xSmoked')) {
                var removed = document.getElementById('xSmoked');
                removed.parentNode.removeChild(removed);
                removed = document.getElementById('button-one');
                removed.parentNode.removeChild(removed);
                removed = document.getElementById('button-two');
                var parent = removed.parentNode;
                removed.parentNode.removeChild(removed);
                var rm1 = document.getElementById('rm1');
                var rm2 = document.getElementById('rm2');
                rm1.parentNode.removeChild(rm1);
                rm2.parentNode.removeChild(rm2);
            }

            //create necessary for second change
            var hours = document.createElement('input');
            var minutes = document.createElement('input');
            button1 = document.createElement('button');
            button2 = document.createElement('button');
            var br = document.createElement('br');
            var br2 = document.createElement('br');
            var br3 = document.createElement('br');
            var br4 = document.createElement('br');
            var br5 = document.createElement('br');

            //question change
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "Roughly how long ago did you smoke?";

            //input attributes
            hours.setAttribute('type', 'number');
            hours.setAttribute('id', 'hours');
            hours.setAttribute('min', '0');
            hours.setAttribute('max', '24');
            hours.setAttribute('placeholder', 'Hours')
            hours.setAttribute('onkeydown', 'return false');
            hours.setAttribute('style', "width: 30%; border-color: cyan");
            minutes.setAttribute('type', 'number');
            minutes.setAttribute('id', 'minutes')
            minutes.setAttribute('min', '0');
            minutes.setAttribute('max', '60')
            minutes.setAttribute('placeholder', 'Minutes');
            minutes.setAttribute('onkeydown', 'return false');
            minutes.setAttribute('style', "width: 30%; border-color: cyan");

            //change the buttons
            button1.innerHTML = "Submit";
            button1.setAttribute('type', 'button');
            button1.setAttribute('onclick', 'checkinChange(2)')
            button2.innerHTML = "Start Over";
            button2.setAttribute('onclick', "window.location.href='health.html'");
            button2.setAttribute('type', 'button');

            checkin_form.appendChild(button1);
            checkin_form.appendChild(document.createElement('br'));
            checkin_form.appendChild(button2);
            checkin_form.insertBefore(br, button1);
            checkin_form.insertBefore(br2, br);
            checkin_form.insertBefore(minutes, br2);
            checkin_form.insertBefore(br3, minutes);
            checkin_form.insertBefore(br4, br3);
            checkin_form.insertBefore(hours, br4);

            //use temp array to globally store checkin data for session storage transfer
            arrTemp.push(document.getElementById('hours'));
            arrTemp.push(document.getElementById('minutes'));

            //checks every millisecond whether required input has been entered
            setInterval(function () {
                if (hours.value.length < 1 || minutes.value.length < 1) {
                    button1.setAttribute('onclick', "alert('Please fill in both Hours and Minutes fields!')");
                }
                else {
                    button1.setAttribute('onclick', 'checkinChange(2); checkinData()');
                }
                if (arrTemp.length != 3) {
                    button1.setAttribute('disabled', '');
                }
                else {
                    button1.removeAttribute('disabled');
                }
            }, 1);
            break;

        //Happens after user clicks "Submit"(third question) 
        //OR after user selects "No" (first question)
        case 2:
            sessionStorage.setItem('count', 1);
            //remove old input
            if (document.getElementById('xSmoked')) {
                var removed = document.getElementById('hours');
                removed.parentNode.removeChild(removed);
                removed = document.getElementById('minutes');
                removed.parentNode.removeChild(removed);
            }
            //remove buttons and change display
            checkin_form.parentNode.removeChild(checkin_form);
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "Thanks for Checking in!"
            break;

        //Default by convention, details what happens after user selects "Yes" (First question)
        default:
            //create variables necessary for first change
            var ans = document.createElement('input');
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
            ans.setAttribute('style', "width: 30%; border-color: cyan");
            checkin_form.insertBefore(br, button1);
            checkin_form.insertBefore(br2, br);
            checkin_form.insertBefore(ans, br2);

            //use temp array to global store in order to transfer to session storage
            arrTemp.push(document.getElementById('xSmoked'));

            //change the buttons
            button1.innerHTML = "Enter";
            button1.setAttribute('type', 'button');
            button2.innerHTML = "Start Over";
            button2.setAttribute('onclick', "window.location.href='health.html'");
            button2.setAttribute('type', 'button');

            //checks every millisecond whether required input has been entered
            setInterval(function () {
                if (ans.value.length < 1) {
                    button1.setAttribute('onclick', "alert('Please enter the number of times you smoked today!')");
                }
                else {
                    button1.setAttribute('onclick', 'checkinChange(1)');
                }

            }, 1);
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

function upTime() {
    var now = new Date().getTime();
    var last = new Date(sessionStorage.getItem('last-smoked'));
    last = last.getTime();
    var difference = now - last;

    var days = Math.floor(difference/(60*60*1000*24));
    var hours = Math.floor((difference%(60*60*1000*24))/(60*60*1000));
    var mins = Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000));
    var secs = Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);

    var timeElapsed = document.getElementById('time-tracking');
    timeElapsed.innerHTML = days + " days, " + hours + " hrs, " + mins + " mins, and " + secs + " secs";
    clearTimeout(upTime.to);
    upTime.to = setTimeout(function() {upTime();}, 1000);
}

function display(time) {

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

function changeText() {
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