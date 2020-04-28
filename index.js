let pizzaSize = { size: '' };
let toppingsSelected = [];
let pizzaQuantity = { quantity: 0 };
let toppings = Array.from(document.querySelectorAll('.pizza-topping'));
let sizes = document.getElementsByClassName('pizza-size');
// console.log(sizes);
// console.log(toppings);

for (let i = 0; i < sizes.length; i++) {
  sizes[i].addEventListener(
    'click',
    (e) => {
      pizzaSize.size = e.target.value;
      evaluatePrice(pizzaSize, toppingsSelected, pizzaQuantity);
    },
    false
  );
}

for (let i = 0; i < toppings.length; i++) {
  toppings[i].addEventListener('change', function () {
    let val = this.value;
    if (this.checked && toppingsSelected.indexOf(val) < 0) {
      toppingsSelected.push(this.value);
    } else if (this.checked === false && toppingsSelected.indexOf(val) >= 0) {
      let j = toppingsSelected.indexOf(val);
      toppingsSelected.splice(j, 1);
    }
    console.log(toppingsSelected);
    evaluatePrice(pizzaSize, toppingsSelected, pizzaQuantity);
  });
}

function changeQuantity() {
  let selectedQuantity = document.getElementById('selectQuantity');
  //  console.log(selectedQuantity);
  pizzaQuantity.quantity = selectedQuantity.value;
  //    console.log(quantity);
  evaluatePrice(pizzaSize, toppingsSelected, pizzaQuantity);
}

function validateForm() {
  let name = document.orderForm.name.value;
  let address = document.orderForm.address.value;
  let city = document.orderForm.city.value;
  let state = document.orderForm.state.value;
  let zip = document.orderForm.zip.value;
  let phone = document.orderForm.phone.value;
  let size = document.orderForm.size.value;
  let topping = document.orderForm.topping;
  let quantity = document.getElementById('selectQuantity');
  let quantitySelected = quantity.options[quantity.selectedIndex].value;
  let formName = document.orderForm;

  //Customer Details Form validation
  if (name == null || name == '') {
    alert("Name field can't be blank.");
    return false;
  } else if (address === null || address === '') {
    alert("Address field can't be blank.");
    return false;
  } else if (city === null || city === '') {
    alert("City field can't be blank.");
    return false;
  } else if (state === null || state === '') {
    alert("State field can't be blank.");
    return false;
  } else if (/^[1-9][0-9]{5}$/.test(zip) === false) {
    alert('Please enter valid pin code.');
    return false;
  } else if (/^\d{10}$/.test(phone) === false) {
    alert('Please enter valid phone number.');
    return false;
  }

  //Pizza Size Radio Button Validation
  if (size === null || size === '') {
    alert('Please select the size of pizza.');
    return false;
  }

  //Pizza toppings checkbox validation
  let checkedBox =
    formName.topping1.checked ||
    formName.topping2.checked ||
    formName.topping3.checked ||
    formName.topping4.checked ||
    formName.topping5.checked ||
    formName.topping6.checked;

  if (checkedBox === true) {
  } else {
    alert('Please select atleast 1 topping.');
    return false;
  }

  //Quantity dropdown validation
  if (quantitySelected == '') {
    alert('Please select quantity.');
    return false;
  }
}

function evaluatePrice(sizeSelected, toppingsSelected, quantitySelected) {
  let priceSize = 0;
  let priceToppings = 0;
  let totalPrice = 0;
  let priceToppingS = 30;
  let priceToppingM = 40;
  let priceToppingL = 50;

  //   console.log(sizeSelected.size);
  //   console.log(toppingsSelected);
  if (sizeSelected.size === 'small') {
    priceSize = 100;
    priceToppings = priceToppingS * toppingsSelected.length;
  } else if (sizeSelected.size === 'medium') {
    priceSize = 200;
    priceToppings = priceToppingM * toppingsSelected.length;
  } else if (sizeSelected.size === 'large') {
    priceSize = 400;
    priceToppings = priceToppingL * toppingsSelected.length;
  } else {
    console.log(sizeSelected.size);
  }

  totalPrice = (priceSize + priceToppings) * quantitySelected.quantity;
  //   console.log('Total price for the pizza selected is Rs. ' + totalPrice);
  writeResult(totalPrice);
}

function writeResult(result) {
  result = result || 0;
  document.getElementById('result').innerHTML =
    'Please pay Rs ' + result + ' to proceed with order confirmation.';
}

function clearResult() {
  document.getElementById('result').innerHTML = '';
}
