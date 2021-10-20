
var pinchoose = document.querySelector(".choose2");
var dischoose = document.querySelector(".choose1");
var dispin = document.getElementById("pinselect");
var disdis = document.getElementById("disselect");
dispin.style.display="none"
pinchoose.addEventListener("click",function(){
    console.log("hello");
    disdis.style.display="none";
    dispin.style.display="block"
});
dischoose.addEventListener("click",function(){
    console.log("hello");
    disdis.style.display="block";
    dispin.style.display="none"
});


