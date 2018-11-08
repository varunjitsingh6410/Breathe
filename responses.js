var count = 0;
var checkin_q2 = 'How many times did you smoke today?';
var checkin_q3 = 'When was the last time you smoked?';
var checkin_qs = [checkin_q2, checkin_q3];
var checkin_entry, checkin_submit;
var amt_today = 0;
var checkin_responses = [];
var responseCount = 0;
sessionStorage.setItem("isLoggedIn", false);



function localStore() {
    var username = document.getElementById("username");
    sessionStorage.setItem('username', username.value);
    var password = document.getElementById('password');
    sessionStorage.setItem("password", password.value);
    sessionStorage.setItem("isLoggedIn", true);
}



function isLoggedIn() {
    if (sessionStorage.getItem('username') != null) {
        return;
    }
    else {
        window.location.assign("login.html");
    }
}


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