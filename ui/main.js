console.log('Loaded!');
var img=document.getElementById('team');
var marginLeft=0;
function moveRight()
{
    marginLeft= marginLeft + 10;
    img.style.marginLeft=marginLeft+'px';
}
var onClick=function()
{
    var interval = setInterval(moveRight,50);
};
console.log('Executed!!');
