let products=document.getElementById("products")
let url = "https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products"
let prod=JSON.parse(localStorage.getItem("prod"))||[]
let paginate=document.getElementById("pagination")
let pdata
fetch(url)
  .then((res)=>{
   return res.json()})
  .then((data)=>{
    pdata=data.length
})

let displaycat=document.getElementById("choose")
var gen = document.getElementById("sel-gen")

// let sortp = document.querySelectorAll("sort")
// sortp.addEventListener("click",()=>{
//   alert("value", sortp.value)
// })

gen.addEventListener("change",function(){
    console.log(gen.value)
    displaycat.innerHTML=""
  if(gen.value=="male"){
    let c1 = document.createElement("p")
   // c1.setAttribute("name",jeans)
    c1.textContent="jeans"
    let c2 = document.createElement("p")
    // c2.setAttribute("value",tshirt)
    c2.textContent="tshirt"
    let c3 = document.createElement("p")
    // c3.setAttribute("value",shirt)
    c3.textContent="shirt"
    let c4 = document.createElement("p")
    // c4.setAttribute("value",shorts)
    c4.textContent="shorts"
    displaycat.append(c1,c2,c3,c4)
  }else{
    let c1 = document.createElement("p")
    // c1.setAttribute("value",jeans)
    c1.textContent="jeans"
    let c2 = document.createElement("p")
    // c2.setAttribute("value",tshirt)
    c2.textContent="tshirt"
    let c3 = document.createElement("p")
    // c3.setAttribute("value",dress)
    c3.textContent="dress"
    let c4 = document.createElement("p")
    // c4.setAttribute("value",shorts)
    c4.textContent="shorts"
    displaycat.append(c1,c2,c3,c4)
  }
  })

renderprod(1)
function renderprod(page){
    page=+page
    // console.log(typeof(page))
    let purl=url+`?limit=9&page=${+page}`
  fetch(purl)
  .then((res)=>{
   return res.json()})
  .then((data)=>{
    let btncnt=Math.ceil(pdata/9)
    paginate.innerHTML=null
    for(let i=1;i<=btncnt;i++){
      paginate.append(getbuttons(i))
    }
    products.innerHTML=null
    console.log(data)
    createcardlist(data)
  })
}
function createcardlist(data){
    let cardlist = document.createElement('div')
        cardlist.classList.add("card-list")
        products.append((cardlist))
        data.forEach((ele) => {
            let card=getcard(
                ele.id,
                ele.name,
                ele.image1,
                ele.image2,
                ele.catagory,
                ele.gender,
                ele.price,
                ele.addDate,
                ele.shipping,
                ele.description,
                ele.size,
                ele.discount,
                ele.quantity,
            );
            cardlist.append(card)
        });
    return cardlist
}
function getcard(id,name,image1,image2,cat,gen,price,date,ship,desc,size,dis,qty){
    let card = document.createElement("div")
    card.classList.add("card")
    card.setAttribute("data-id",id)

    let cardimg = document.createElement('div')
    cardimg.classList.add("card-img")
    cardimg.addEventListener("click",()=>{
      let prod={
        id:id,
        name:name,
        image1:image1,
        image2:image2,
        catagory:cat,
        gender:gen,
        price:price,
        addDate:date,
        shipping:ship,
        description:desc,
        size:size,
        discount:dis,
        quantity:qty
      }
      localStorage.setItem("prod",JSON.stringify(prod))
      window.location.href="./productDetails.html"
    })

    let pimg = document.createElement("img")
    pimg.setAttribute("src",image1)
    pimg.addEventListener("mouseenter",()=>{
      pimg.setAttribute("src",image2)
    })
    pimg.addEventListener("mouseleave",()=>{
      pimg.setAttribute("src",image1)
    })
    let icon =document.createElement("i")
    icon.classList.add("fa", "fa-heart","heart-icon")
   // icon.classList.add("heart", "fa", "fa-heart-o")
    icon.setAttribute("id","heart")

    let add = document.createElement("button")
    add.classList.add("add-prod")
    add.textContent="Add to Cart"
    cardimg.appendChild(add)
    cardimg.appendChild(icon)
    cardimg.appendChild(pimg)

    let cardbody = document.createElement("div")
    cardbody.classList.add("card-body")
    let title = document.createElement("h5")
    title.classList.add("card-title")
    title.textContent=name
    let cprice=document.createElement("h6")
    cprice.classList.add("card-price")
    if(dis!=0){
    let p = (price-(price*(dis/100))).toFixed(2)
    let ap=document.createElement("span")
    ap.classList.add("price")
    ap.textContent=`$${p}USD`
    let d = document.createElement("span")
    d.classList.add("aprice")
    d.textContent=`$${price} USD`
    cprice.append(ap,d)
    }else{
        cprice.textContent=`$${price}USD`
    }

    // let view = document.createElement("button")
    // view.classList.add("view-prod")
    // view.textContent="Details"

    cardbody.append(title,cprice)
    card.append(cardimg,cardbody)

    return card

}

function getbuttons(page){
  let btn=document.createElement("button")
  console.log(page)
  btn.setAttribute("data-id",page)
  btn.classList.add("pagebtn")
  btn.textContent=page

  btn.addEventListener("click",(e)=>{
  let num=e.target.dataset.id;
  renderprod(num)
})
return btn
}