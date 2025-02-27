let products = [];
let orders = [];
let cart = {};
let users = [];
let user = {};
let total = 0;
const addToCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  showCart();
};
const increment = (id) => {
  cart[id] = cart[id] + 1;
  showCart();
};
const decrement = (id) => {
  cart[id] = cart[id] - 1;
  cart[id] < 1 && delete cart[id];
  console.log(cart);
  showCart();
};
const showTotal = () => {
  total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
  }, 0);
  divTotal.innerHTML = `Order Value: $${total}`;
};

const showOrders = () => {
  let str = "<div style='padding:30px'><h3>My Orders</h1>";
  orders.map((value) => {
    if (value.customer === user.email) {
      str += `
      <div>
      ${value.customer}-
      ${value.orderValue}-
      ${Object.keys(value.items).length}-
      ${value.status}
      </div>
      `;
    }
  });
  divProducts.innerHTML = str + "</div>"
};

const showMain = () => {
  let str = `
  <div class="container">
      <div class="header">
        <h1>My Store</h1>
        <div class='menu'>
         <li onclick='showProducts()'>Home</li>
          <li onclick='showOrders()'>Orders</li>
          <li onclick="displayCart()">Cart:<span id="items"></span></li>
          <li onclick='showLogin()'>Logout</li>
        </div>
      </div>
      <div class="productBlock">
        <div id="divProducts"></div>
      </div>
      <div id="divCartBlock" class="cartBlock">
        <h3>My Cart</h3>
        <div id="divCart"></div>
        <div id="divTotal"></div>
        <button onclick="hideCart()">Close</button>
      </div>
        <hr>
    <h4>@Copyright 2025. All rights reserved.</h4>
    </div>
  `;
  root.innerHTML = str;
  showProducts();
};

const placeOrder = () => {
  //create an object and push into orders array
  const obj = {
    customer: user.email,
    items: cart,
    orderValue: total,
    status: "pending",
  };
  orders.push(obj);
  cart = {};
  showCart()
  hideCart()
  showOrders();
  console.log(orders);
};

const showCart = () => {
  let str = "";
  products.map((value) => {
    if (cart[value.id]) {
      str += `
        <li>${value.name}-$${value.price}-<button onclick='decrement(${
        value.id
      })'>-</button>${cart[value.id]}<button onclick='increment(${
        value.id
      })'>+</button>-$${value.price * cart[value.id]}</li>
     
        `;
    }
  });
  str += `<button onclick='placeOrder()'>Place Order</button>`;
  divCart.innerHTML = str;
  let count = Object.keys(cart).length;
  items.innerHTML = count;
  showTotal();
};
const displayCart = () => {
  divCartBlock.style.left = "80%";
};
const hideCart = () => {
  divCartBlock.style.left = "100%";
};

function showLogin() {
  let str = `
  <div class='login'>
      <h2>Login Form</h2>
      <div id='msg'></div>
       <p><input type="text" id="email" class="form-control placeholder="Email"></p>
      <p><input type="password" id="password" class="form-control placeholder="password"></p>
      <button onclick='chkUser()' class="btn btn-success">Log In</button>
      <br>
      <p><br><button onclick='showForm()'class="btn btn-primary">Create Account</button></p>
  `;
  root.innerHTML = str;
}

function showForm() {
  let str = `<div class='registration'>
  <h2>Registration Form</h2>
  <p><input type="text" id="name" class="form-control"placeholder="Name"></p>
  <p><input type="text" id="email"class="form-control" placeholder="Email"></p>
  <p><input type="password" id="password" class="form-control" placeholder="Password"></p>
  <p><input type="date" id="dob"class="form-control"></p>
  <p><button onclick='addUser()' class="btn btn-primary">Submit</button></p>
  <p>Already a member?<button onclick='showLogin()' class="btn btn-success">Login Here</button></p>
  `;
  root.innerHTML = str + "</div>";
}

function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i];
      showMain();
      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
  }
}

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(user);
  showLogin();
}

const showProducts = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => (products = data))
    .then(() => {
      let str = "<div class='row'>";
      products.map((value) => {
        str += `
        <div class="col-md-4 mb-4 rounded p-3 m-3">
            <div class="card">
              <img src="${value.image}" class="card-img-top" alt="${value.name}">
              <div class="card-body">
                <h5 class="card-title">${value.name}</h5>
                <p class="card-text">${value.desc}</p>
                <h6 class="card-subtitle mb-2 text-muted">$${value.price}</h6>
                <button class="btn btn-primary" onclick="addToCart(${value.id})">Add to Cart</button>
              </div>
            </div>
          </div>
          `;
      });
      divProducts.innerHTML = str + "</div>";
    });
};