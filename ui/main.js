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
/*var counter = 0;
button.onclick = function() {
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};*/

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var names=['akbar','ameer','abbas'];
    var list = '';
    for (var i = 0;i<names.length;i++) {
        list+='<li>'+ names[i] +'</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};