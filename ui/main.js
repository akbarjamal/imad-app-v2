console.log('Loaded!');
var button = document.getElementById('fan');
var span = document.getElementById('count');
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystagechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var counter = request.responseText;
                span.innerHTML = counter.toString();
            }
        }
    }
    request.open('GET','http://akbarjamal.imad.hasura-app.io/yes',true);
    request.send(null);
};
