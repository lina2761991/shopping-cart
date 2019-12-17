
// shoppingCart 


var shoppingCart = (function() {
 
  // Private methods 
   
  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  

  ///our local storage
  // i used local storage because it saves the data even after closing the browser while session storage loses data if we close the browser 

  // Save cart
  function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
   // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  
  // Public methods 
  
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
  	// we check if the item exists we add +1 to its count
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    // otherwise we create new item 
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }

  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart);
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();




// Events
 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
 
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
	console.log(this);
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

//order Items 
$('#order').click(function() {
alert('You just ordered all this items ! ')
shoppingCart.clearCart();
  displayCart();
$("#cart").modal('hide');
});

//clear card
$('#clear').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


displayCart();










// var arr = [];
// // get all the buttons 
// var buttons =Array.from(document.querySelectorAll('.text-muted'))
// // create event on each button and add it to the array;


// buttons.forEach(function(button){
// button.addEventListener("click", function (event) {

//     var cardinfo = event.target.closest(".card");
   	
//     var imgsrc = Array.from(cardinfo.querySelectorAll("img"))[0].src;
//     var productType =  Array.from(cardinfo.querySelectorAll("h5"))[0].innerHTML;
//     var price =  Array.from(cardinfo.querySelectorAll("p"))[0].innerHTML.slice(0, -1);
//     var obj = {}
//     obj.imgsrc = imgsrc;
//     obj.productType = productType;
//     obj.price = price;
//     obj.numberItems = 1;
   
  
//  arr.push(obj);
//  //console.log(arr);




// });

// });




// Array.from(document.querySelectorAll('#shopping-card'))[0].addEventListener("click", function () {
// 	// console.log(arr);
// 	  // window.localStorage.clear();
//         window.localStorage.setItem('ourarr', JSON.stringify(arr));
//        var a = JSON.parse(window.localStorage.getItem('ourarr'))
//        console.log(localStorage);
       

//  // var cartArray = shoppingCart.listCart();
//   var output = '';

// var s = 0;
//   for(var i=0;i<a.length;i++) {

  	
//   	s += a[i].price *a[i].numberItems;

//    output += "<tr>"
//       + "<td>" + a[i].productType + "</td>" 
//       + "<td>(" + a[i].price+'$' + ")</td>"
//       + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + a[i].price+'$' + ">-</button>"
//       + "<input type='number' class='item-count form-control' data-name='" + '4' + "' value='" + a[i].numberItems + "'>"
//       + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + '1' + ">+</button></div></td>"
//       + "<td><button class='delete-item btn btn-danger' data-name=" + '2' + ">X</button></td>"
//       + " = " 
//       + "<td>" + a[i].price * a[i].numberItems+ "</td>" 
//       +  "</tr>";
//   }
 
// //a[i].price * a[i].numberItems
// // output += "<tr>"
// //       + "<td>" +a[i].price+"</td>" 
// //       +"</tr>";
// // }


// $('.show-cart').on("click", ".plus-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.addItemToCart(name);
//   displayCart();
//   console.log('+')
// })




// $('.show-cart').html(output);
// $('.total-cart').html(s)

// //}





// })
 

















