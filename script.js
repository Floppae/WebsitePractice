// Object to hold all menu items in the cart
// Objects are structured (name, price, quantity)
let cart = {};

//Methods: add(str name, int price), remove(str name), clear(), updateCart()

function updateCart() {
  //Grabs the main div that will display all cart items
  const cartDisplay = document.getElementById("cart-items");
  //Every time updateCart is called we want to clear previous data and update with fresh data
  cartDisplay.innerHTML = "";
  let total = 0;

  //Items in cart have attributes: name, price, quantity
  for (let object in cart) {
    //Grab each item in the cart and get the item total for each item (price * quantity)
    const item = cart[object];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    //Once we add up the subtotal for each item, we display it within the parent div (cartDisplay)
    const itemDisplay = document.createElement("div");
    itemDisplay.className = "cart-item";
    //Template string to display javascript data within an html element
    //toFixed(2) formats the number as a string with 2 decimal places
    //We add an item with a button that calls remove(item.name) when clicked to decrement/remove from the cart
    itemDisplay.innerHTML = `${item.name} x ${
      item.quantity
    } - $${itemTotal.toFixed(2)}
    <div>
        <button onclick="remove('${item.name}')">Remove</button>
    </div>`;
    cartDisplay.append(itemDisplay);
  }
  document.getElementById("total").innerText = "Total: $" + total.toFixed(2);
}

//add method takes name and price of menu item as input and adds it to the cart object then updateCart() is called to render the changes
function add(name, price) {
  //If the item exists in the cart, increment the quantity of the item, otherwise initialize it with quantity 1
  if (cart[name]) {
    cart[name].quantity++;
  } else {
    cart[name] = { name, price, quantity: 1 };
  }
  updateCart();
}

//remove method takes name as input and decrements the item in the cart (removes it if quantity == 0)
function remove(name) {
  if (cart[name]) {
    cart[name].quantity--;
  }
  if (cart[name].quantity === 0) {
    delete cart[name];
  }
  updateCart();
}

//clear method clears the cart object and renders changes
function clearCart() {
  cart = {};
  updateCart();
}
