console.log('Loaded!');
var img=document.getElementById('crest');
var margin=0;
function moveRight()
{
    margin+=1;
    img.style.marginLeft = margin + 'px';
}
var onClick = function()
{
    var interval = setInterval(moveRight,50);
}