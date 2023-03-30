

let adminuser = document.getElementById("adminuser");
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;



let names=document.getElementById('name').value;
let imgs1=document.getElementById('name').value;
let imgs2=document.getElementById('name').value;
let categorys=document.getElementById('name').value;
let genders=document.getElementById('name').value;
let prices=document.getElementById('name').value;
let addates=document.getElementById('name').value;
let shippings=document.getElementById('name').value;
let descriptions=document.getElementById('name').value;
let sizes=document.getElementById('name').value;
let discounts=document.getElementById('name').value;
let quantitys=document.getElementById('name').value;
let submit=document.getElementById('submit');


submit.addEventListener('click',(e)=>{
    e.preventDefault()
    fetched()
})



async function fetched(){
    

try{
    let res=await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products`,{
     
     method:'POST',
     headers:{
        'Content-Type':'application/json',
     },
     body:await JSON.stringify({
        name:names,
        image1:imgs1,
        image2:imgs2,
        category:categorys,
        gender:genders,
        price:prices,
        addDate:addates,
        shipping:shippings,
        description:descriptions,
        size:sizes,
        discount:discounts,
        quantity:quantitys
     })

    })
    let data=await res.json()
    console.log(data);
}
catch(e){
    console.log(e)
}


}





