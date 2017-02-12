console.log('Loaded!');
var button = document.getElementById('fan');
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystagechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var count = request.responseText;
                print(count);
                var span = document.getElementById("count");
                span.innerHTML = count.toString();
            }
        }
    };
    request.open('GET', 'http://akbarjamal.imad.hasura-app.io/yes', true);
    request.send(null);
};
