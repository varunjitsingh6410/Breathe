var count = 0;
var checkin_q2 = 'How many times did you smoke today?';
var checkin_q3 = 'When was the last time you smoked?';
var checkin_qs = [checkin_q2, checkin_q3];
var checkin_entry, checkin_submit;
var amt_today = 0;
var checkin_responses = [];
var responseCount = 0;
sessionStorage.setItem("isLoggedIn", false);



function loginStore() {
    var username = document.getElementById("username");
    sessionStorage.setItem('username', username.value);
    var password = document.getElementById('password');
    sessionStorage.setItem("password", password.value);
}

function checkinChange(caseNum) {
    //
    var checkin_form = document.getElementById('checkin-responses');
    var button1 = document.getElementById('button-one');
    var button2 = document.getElementById('button-two');
    var default_b1_flag = false;

    switch (caseNum) {
        case 1:
            //create necessary for second change
            console.log(caseNum);
            var removed = document.getElementById('xSmoked');
            removed.parentNode.removeChild(removed);
            var hours = document.createElement('input');
            var minutes = document.createElement('input');
            var br = document.createElement('br');
            
            //question change
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "Roughly how long ago did you smoke?"; 
            break;
        case 2: 
        default:
            //create variables necessary for first change
            var ans =  document.createElement('input');
            var br = document.createElement('br');
            var br2 = document.createElement('br');

            //question change
            var checkin_q = document.getElementById('checkin-q');
            checkin_q.innerHTML = "How many times did you smoke?";
            
            //set input elem attributes and insert into checkin form
            ans.setAttribute('type', 'text');
            ans.setAttribute('id', 'xSmoked');
            checkin_form.insertBefore(br, button1);
            checkin_form.insertBefore(br2, br);
            checkin_form.insertBefore(ans, br2);

            //change the buttons
            button1.innerHTML = "Enter";
            button1.setAttribute('onclick',"checkinChange(1);");
            button2.innerHTML = "Back";
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