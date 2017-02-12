console.log('Loaded!');
var button = document.getElementById('fan');
var counter = 0;
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystagechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var counter = request.responseText;
                console.log(counter);
                var no = document.getElementById('count-no');
                no.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET', 'http://akbarjamal.imad.hasura-app.io/yes', true);
    request.send(null);
};
