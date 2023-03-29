let products=document.getElementById("products")
let url = "https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products"
let paginate=document.getElementById("pagination")


let displaycat=document.getElementById("choose")
var gen = document.getElementById("sel-gen")

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
url=url+`?limit=12&page=${page}`
  fetch(url)
  .then((res)=>{
    console.log(res.length)
   return res.json()})
  .then((data)=>{
    let count=data.length
    let btncnt=Math.ceil(count/12)
    paginate.innerHTML=null
    for(let i=1;i<=btncnt;i++){
        console.log(i)
      paginate.append(getbuttons(i))
    }
    products.innerHTML=null
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

    let pimg1 = document.createElement("img")
    pimg1.setAttribute("src",image1)
    cardimg.append(pimg1)

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
    let add = document.createElement("button")
    add.classList.add("add-prod")
    add.textContent="Add to Cart"

    let view = document.createElement("button")
    view.classList.add("add-prod")
    view.textContent="Details"

    let wish = document.createElement("button")
    wish.classList.add("add-prod")
    wish.textContent="Add to Wishlist"

    cardbody.append(title,cprice,view,add,wish)
    card.append(cardimg,cardbody)

    return card

}

function getbuttons(page){
  let btn=document.createElement("button")
  btn.setAttribute("data-id",page)
  btn.classList.add("pagebtn")
  btn.textContent=page

  btn.addEventListener("click",(e)=>{
  let num=e.target.dataset.id;
  console.log(num)
 
  renderprod(num)
})
return btn
}