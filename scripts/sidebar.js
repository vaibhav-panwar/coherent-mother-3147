var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

var k;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// for(k=0;k<gen.length;k++){
//   gen[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var optn = this.nextElementSibling;
//     if (optn.style.display === "block") {
//       optn.style.display = "none";
//     } else {
//       optn.style.display = "block";
//     }
//   });
// }
// let cat=document.getElementById("choose")
// var gen = document.getElementById("sel-gen")
// gen.addEventListener("change",function(){
//   console.log(gen.value)
//   cat.innerHTML=""
// if(gen.value=="male"){
//   let c1 = document.createElement("p")
//  // c1.setAttribute("name",jeans)
//   c1.textContent="jeans"
//   let c2 = document.createElement("p")
//   // c2.setAttribute("value",tshirt)
//   c2.textContent="tshirt"
//   let c3 = document.createElement("p")
//   // c3.setAttribute("value",shirt)
//   c3.textContent="shirt"
//   let c4 = document.createElement("p")
//   // c4.setAttribute("value",shorts)
//   c4.textContent="shorts"
//   cat.append(c1,c2,c3,c4)
// }else{
//   let c1 = document.createElement("p")
//   // c1.setAttribute("value",jeans)
//   c1.textContent="jeans"
//   let c2 = document.createElement("p")
//   // c2.setAttribute("value",tshirt)
//   c2.textContent="tshirt"
//   let c3 = document.createElement("p")
//   // c3.setAttribute("value",dress)
//   c3.textContent="dress"
//   let c4 = document.createElement("p")
//   // c4.setAttribute("value",shorts)
//   c4.textContent="shorts"
//   cat.append(c1,c2,c3,c4)
// }
// })