
// progress bar
function setProgress(progress){
    let bar = document.getElementById("bar");
    let shipping_free_amt = document.getElementById("shipping_amt");
    let deliveryChrg = document.getElementById("deliveryChrg");
    
    if(progress<100){
        bar.style.width = `${progress}%`;
        shipping_free_amt.innerText = "$"+(100-progress);
    }
    else{
        bar.style.width = `100%`;
        need_to_buy.innerText = "You are Eligible for Free shipping!";
        deliveryChrg.innerText=0;
        deliveryChrg.style.color="red";
    }
}


// after click on buyBtn address form should be open

let btnBuy = document.getElementById("btnBuy");
btnBuy.addEventListener("click", function(e){
    e.preventDefault();
    let addressEl = document.getElementById("customer_address");
    addressEl.innerHTML = `
    <div class="address">
    <h2>Add Address</h2>
    <form class="address_form">
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name">
      <label for="street1">Street Address 1:</label>
      <input type="text" id="street1" name="street1">
      <label for="street2">Street Address 2:</label>
      <input type="text" id="street2" name="street2">
      <label for="city">City:</label>
      <input type="text" id="city" name="city">
      <label for="state">State:</label>
      <input type="text" id="state" name="state">
      <label for="zipcode">Zip Code:</label>
      <input type="text" id="zipcode" name="zipcode">
      <input type="submit" value="Submit">
    </form>
</div>
      `;

      submitAddress();
})

function submitAddress(){
    var address_form = document.querySelector(".address_form");
    address_form.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var street1 = document.getElementById('street1').value;
    var street2 = document.getElementById('street2').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zipcode = document.getElementById('zipcode').value;
            
        var data = {
            name: name,
            street1: street1,
            street2: street2,
            city: city,
            state: state,
            zipcode: zipcode
        };
            
        // fetch('/api/add-address', {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        //     })
        //     .then(function(response) {
        //       // Handle response here
        //     })
        //     .catch(function(error) {
        //       // Handle error here
        //     });
    
  // after submitting address, Payment option should be open

      let paymentOpt = document.getElementById("method");
      paymentOpt.innerHTML = `
          <div class="address">
            <label><h2>Payment Method:</h2></label>
            <select id="payment-method">
                <option value="sel">Select Method</option>
                <option value="cod">Cash on Delivery</option>
                <option value="online">Online Payment</option>
            </select>
            </div>
            `;

            selectPaymentMethod();
  });
};

// after selecting payment option appropriate form should be open
function selectPaymentMethod(){
  
  var paymentMethod = document.getElementById('payment-method');
  var codInfo = document.getElementById('cod-info');
  var onlineInfo = document.getElementById('online-info');
  var finalOpt = document.getElementById("final_opt");

  paymentMethod.addEventListener('change', function(event) {
      if (event.target.value === 'sel') {
          onlineInfo.innerHTML = null;
          codInfo.innerHTML = null;
          finalOpt.innerHTML = null;
      } else if (event.target.value === 'cod') {
          onlineInfo.innerHTML = null;
          codInfo.innerHTML = `
          <div>
          <h3>Please have exact change ready when your order arrives.</h3>
          </div>
          `;

          finalOpt.innerHTML = `
          <div class="btn">
          <button id="confirmationBtn">Place Order</button>
          </div>
          `
      } else if (event.target.value === 'online') {
          codInfo.innerHTML = null;
          finalOpt.innerHTML = null;
          onlineInfo.innerHTML = `
          <div class="address">
              <h2>Add Payment Method</h2>
              <form id="online_payment_form">
                  <label for="name">Name on Card:</label>
                  <input type="text" id="name" name="name">
                  <label for="cardnumber">Card Number:</label>
                  <input type="text" id="cardnumber" name="cardnumber">
                  <label for="expiration">Expiry Date:</label>
                  <input type="text" id="expiration" name="expiration">
                  <label for="cvv">CVV:</label>
                  <input type="text" id="cvv" name="cvv">
                  <input type="submit" value="Submit">
              </form>
          </div>
          `;

          orderPlaced();
      }
  });
}

function orderPlaced(){
    var finalOpt = document.getElementById("final_opt");
    var onlinePayment = document.getElementById("online_payment_form");
    onlinePayment.addEventListener("submit", function(event) {
    event.preventDefault();
    finalOpt.innerHTML = `
        
        <button id="confirmationBtn">Place Order</button>
        
        `;
    })
}


let productData = document.querySelector(".product-container");
let lsData = JSON.parse(localStorage.getItem("cart-items")) || []; //*******

displaydata(lsData)
function displaydata(data){
    productData.innerHTML = "";

    data.forEach((element) => {
        let cards = document.createElement("div");
        let image = document.createElement("img");
        let name = document.createElement("h2");
        let price = document.createElement("h3");
        
        let increase = document.createElement("button");
        let decrease = document.createElement("button");
        let remove = document.createElement("button");
        let Quantity = document.createElement("span");

        increase.addEventListener("click", () => {
            element=element.Quantity++;
            localStorage.setItem("cart-items", JSON.stringify(lsData));
            displaydata(lsData)
        });

        decrease.addEventListener("click", () => {
            if(element.Quantity>1){
            element=element.Quantity--;
            localStorage.setItem("cart-items", JSON.stringify(lsData));
            displaydata(lsData)
            }
        });

        remove.addEventListener("click", () => {
            lsData=lsData.filter((product) => {
                return product.id != element.id;
            })
            localStorage.setItem("cart-items", JSON.stringify(lsData));
            displaydata(lsData)
        });

        image.setAttribute("src", element.image);
        name.textContent = element.name;
        price.textContent = `Price: $${element.price}`;
        increase.textContent = "+";
        decrease.textContent = "-";
        Quantity.textContent = element.Quantity;
        remove.textContent = "Remove";

        totalPrice();
        

        cards.append(image, name, price, increase, Quantity, decrease, remove);
        productData.append(cards);
    })
}

// calculation of price

function totalPrice(){
    let price = document.getElementById("price");
    let totalBill = document.getElementById("total_bill");
    let deliveryChrg = document.getElementById("deliveryChrg");
    let discount = document.getElementById("discount");
    
    // actual price of product
    let sum=0;
    for(let i=0; i<lsData.length; i++){
        sum+=lsData[i].price*lsData[i].Quantity;
    }
    price.textContent = sum;
    setProgress(sum);

    // discount

    // shiping charge


    // final price
    totalBill.textContent = (+price.textContent) - (+discount.textContent) + (+deliveryChrg.textContent);
}
