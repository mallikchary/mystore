      const products = [
        { id: 1, name: "P1", price: 25 },
        { id: 2, name: "P2", price: 45 },
        { id: 3, name: "P3", price: 30 },
      ];
      const cart = {};
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
      const showCart = () => {
        let str = "";
        products.map((value) => {
          if (cart[value.id]) {
            str += `
            <li>${value.name}-$${value.price}-<button onclick=decrement(${value.id})>-</button>${cart[value.id]}<button onclick=increment(${value.id})>+</button>-${value.price*cart[value.id]}</li>
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
      const showProducts = () => {
        let str = "";
        products.map((value) => {
          str += `
          <li>${value.id}-${value.name}-${value.price}-<button onclick=addToCart(${value.id})>Add to Cart</button></li>
          `;
        });
        divProducts.innerHTML = str;
      };