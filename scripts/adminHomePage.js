let url = `https://642418c7d6152a4d48067bc3.mockapi.io/orders`;
let eltbody = document.querySelector("tbody");
let pending = document.getElementById("pending");
let cancel = document.getElementById("cancel");
let process = document.getElementById("process");
let adminuser = document.getElementById("adminuser");
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;
fetchrender(url);
function fetchrender(api) {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            appendTbody(data);
            displayheadings(pending, data, "pending");
            displayheadings(cancel, data, "cancel");
            displayheadings(process, data, "processing");
        })
        .catch((err) => console.error(err, "kaam khraab"))
}
function appendTbody(deta) {
    eltbody.innerHTML = "";
    deta.forEach((e) => {
        let a = createRow(e.id, e["payment-type"], e.createdAt, e["delivery-date"], e["product-id"], e.quantity, e.total, e.status)
        eltbody.append(a);
    })
}
function createRow(orderid, paymentType, orderDate, deliverydate, productid, quantity, total, status) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = orderid;
    let td2 = document.createElement("td");
    td2.textContent = paymentType;
    let td3 = document.createElement("td");
    td3.textContent = convertintodate(orderDate);
    let td4 = document.createElement("td");
    td4.textContent = convertintodate(deliverydate);
    let td5 = document.createElement("td");
    td5.textContent = productid;
    let td6 = document.createElement("td");
    td6.textContent = quantity;
    let td7 = document.createElement("td");
    td7.textContent = total;
    let td8 = document.createElement("td");
    td8.textContent = status;
    if (status == "processing") {
        td8.style.backgroundColor = "blue"
    }
    let td9 = document.createElement("select");
    td9.innerHTML = `<option value="">Edit Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancel">Cancel</option>`
    td9.addEventListener("change", async () => {
        let a = td9.value;
        let obj = { status: a }
         console.log(obj)
        if (a!="") {
            await aw1(orderid,obj)
            location.reload();
        }
    })
    tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9)
    return tr
}

function convertintodate(value) {
    let timestamp = value
    let date = new Date(timestamp);
    let string = date.toDateString();
    return string;
}
function displayheadings(dibba, deta, value) {
    dibba.innerHTML = "";
    let count = 0;
    deta.forEach((e) => {
        if (e.status == value) {
            count++;
        }
    })
    dibba.innerText = count;
}
async function aw1(orderid,obj){
   await fetch(`${url}/${orderid}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
}