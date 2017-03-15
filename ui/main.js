console.log('Loaded!');
var button = document.getElementById('fan');
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET', 'http://akbarjamal.imad.hasura-app.io/yes', true);
    request.send(null);
};
var counter = 0;
button.onclick = function() {
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};


var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var names=request.responseText;
                names=JSON.parse(names);
                var list = '';
                for (var i = 0;i<names.length;i++) {
                    list+='<li>'+ names[i] +'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET', 'http://akbarjamal.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
};

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                alert('User logged in');
                console.log('Credentials are correct');
            } else if (request.status === 403) {
                alert('Wrong username/password');
            } else if (request.status === 500) {
                alert('Server down');
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://akbarjamal.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};



