      let products=[];
      const cart = {};
      let users = [];
      let user = {}
      document.write("<div id=root></div>");
      const addToCart = (id) => {
        if(!cart[id]) cart[id] = 1;
        showCart();
      };
      const increment=(id)=>{
        cart[id]++
        console.log(cart)
        showCart();
      }
      const decrement=(id)=>{
        cart[id]--
        console.log(cart)
        cart[id]<1 && delete cart[id]
        showCart()

      }
      const showtotal=()=>{
        let total=products.reduce((sum,value)=>{
            if(cart[value.id]){
            return sum+value.price*cart[value.id]
            }
            return sum
        },0)
        divtotal.innerHTML="Order Value:"+total
    }
    let orders=[];
      const showCart = () => {
        let str = "";
        products.map((value) => {
          if (cart[value.id]) {
            str += `
            <li>${value.name}-$${value.price}-<button onclick=decrement(${value.id})>-</button>${cart[value.id]}<button onclick=increment(${value.id})>+</button>-${value.price*cart[value.id]}</li>
            
          <button onclick="placeorder()">PlaceOrder</button>
            `;
          }
        });
        divCart.innerHTML = str;
        let c=Object.keys(cart).length
        items.innerHTML=c
        showtotal();
      };
      const displaycart=()=>{
        divcartblock.style.left="70%"
      }
      const hidecart=()=>{
        divcartblock.style.left="100%"
      }
      function showMain(){
        let str=`
        <div class="header">
    <h1>Welcome ${user.name}</h1>
    <div>
    <div onclick="displaycart()">Cart <span id="items"></span></div>
    <div><button onclick="showLogin()">Log out</button>
    </div>
    </div>
    </div>
    <div class="productblock">
    <h3>Products</h3>
    <div id="divProducts"></div>
    <hr>
    </div>
    <div id="divcartblock" class="cartblock" >
    <h3>My Cart</h3>
    <div id="divCart"></div>
    <div id="divtotal"></div>
    <button onclick="hidecart()">Close</button>
    </div>
    </div>
    <hr>
    <h4>@copyright 2025.All Rights reserved</h4>
        `
        root.innerHTML=str
        showProducts()
      }
      function showLogin() {
        let str = `
        <div class="login">
            <h2>Login Form</h2>
            <div id='msg'></div>
            <p><input id="email" type="text"></p>
            <p><input id="password" type="password"></p>
            <button onclick='chkUser()'>Log In</button>
            <p><button onclick='showForm()'>Create Account</button></p>
        </div>
        `;
        root.innerHTML = str;
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
      function showForm() {
        let str = `<div class="reg">
        <h2>Registration Form</h2>
        <p><input type="text" id="name" placeholder="Name"></p>
        <p><input type="text" id="email" placeholder="Email"></p>
        <p><input type="password" id="password" placeholder="Password"></p>
        <p><input type="date" id="dob"></p>
        <p><button onclick='addUser()'>Submit</button></p>
        <p>Already a member?<button onclick='showLogin()'>Login Here</button></p></div>
        `;
        root.innerHTML = str;
      }
      function chkUser() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == email && users[i].password == password) {
            // useremail = email;
            // username = users[i].name;
            // currBalance = users[i].balance;

            user = users[i]
            showMain();
            break;
          } else {
            msg.innerHTML = "Access Denied";
          }
        }
      }
      const showProducts = () => {
        fetch("products.json")
        .then((res)=>res.json())
        .then((data)=>{products=data})
        .then(()=>{
        let str = "<div class='row'>";
        products.map((value) => {
          str += `
          <div>
          <div class="box">
          <h3>${value.name}</h3>
          <p>${value.desc}</p>
          <h4>${value.price}</h4>
          <button onclick=addToCart(${value.id})>Add to Cart</button></div>
          </div>
          `;
        });
        divProducts.innerHTML = str+"</div>";
      })
      };
      const placeorder=()=>{
        const obj={
          customer:"abc@gmail.com",
          ordervalue:100,
          status:"pending"
        };
        orders.push(obj)
        console.log(orders)
      };