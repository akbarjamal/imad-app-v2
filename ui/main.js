console.log('Loaded!');
var button = document.getElementById('fan');
var span = document.getElementById('count');
var counter = 0;
button.onclick = function() {
    counter = counter + 1;
    span.innerHTML = counter.toString();
};
