const slides = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let counter = 0;
const size = slides.children[0].clientWidth+20;

function slideNext() {
  if (counter === 6) {
    counter = 0;
  } else {
    counter++;
  }
  slides.style.transform = `translateX(${-size * counter}px)`;
}

function slidePrev() {
  if (counter === 0) {
    counter = 6;
  } else {
    counter--;
  }
  slides.style.transform = `translateX(${-size * counter}px)`;
}

nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);


//navbar buttons eventlistener
let localdata = localStorage.getItem("filterbyCat") || null

let Menbtn = document.querySelector(".men")
Menbtn.addEventListener("click", ()=>{
    localdata = "men"
    localStorage.setItem("filterbyCat", localdata)
  })
  
let womenbtn = document.querySelector(".women")
womenbtn.addEventListener("click", ()=>{
    localdata = "women"
    localStorage.setItem("filterbyCat", localdata)
  })
  
let jeans = document.querySelector(".jeans")
jeans.addEventListener("click", ()=>{
    localdata = "jeans"
    localStorage.setItem("filterbyCat", localdata)
})

