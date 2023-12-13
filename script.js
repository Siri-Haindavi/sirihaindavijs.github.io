
document.addEventListener("DOMContentLoaded", function () {
  // Preload rollover images
  const imagesToPreload = [
    "images/espresso_info.jpg",
    "images/latte_info.jpg",
    "images/cappuccino_info.jpg",
    "images/coffee_info.jpg",
    "images/biscotti_info.jpg",
    "images/scone_info.jpg"
  ];
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Function to add or update item in order
  function addOrUpdateItemInOrder(price, itemName) {
    const orderList = document.getElementById('order');
    let found = false;
    for (let i = 0; i < orderList.options.length; i++) {
      if (orderList.options[i].text.includes(itemName)) {
        let quantity = parseInt(orderList.options[i].getAttribute('data-quantity')) + 1;
        orderList.options[i].text = quantity + " * $" + price + " - " + itemName;
        orderList.options[i].setAttribute('data-quantity', quantity);
        found = true;
        break;
      }
    }
    if (!found) {
      const option = document.createElement('option');
      option.text = "1 * $" + price + " - " + itemName;
      option.setAttribute('data-quantity', '1');
      orderList.add(option);
    }
    updateTotal();
  }

  // Function to update total
  function updateTotal() {
    const orderList = document.getElementById('order');
    let total = 0;
    for (let i = 0; i < orderList.options.length; i++) {
      let quantity = parseInt(orderList.options[i].getAttribute('data-quantity'));
      let price = parseFloat(orderList.options[i].text.split('* $')[1].split(' - ')[0]);
      total += quantity * price;
    }
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
  }

  // Event listener for the Remove button
  document.getElementById('remove-item').addEventListener('click', function () {
    const orderSelect = document.getElementById('order');
    const selectedIndex = orderSelect.selectedIndex;
    if (selectedIndex > -1) {
      removeItem(selectedIndex);
    }
  });

  // Function to remove the selected item
  function removeItem(selectedIndex) {
    const orderSelect = document.getElementById('order');
    const option = orderSelect.options[selectedIndex];
    let quantity = parseInt(option.getAttribute('data-quantity'));
    if (quantity > 1) {
      quantity--;
      option.setAttribute('data-quantity', quantity);
      option.text = `${quantity} * $${option.text.split('* $')[1]}`;
    } else {
      orderSelect.remove(selectedIndex);
    }
    updateTotal();
  }

  //Hover effect
  $(document).ready(function () {
    $("#menu ul li a img").each(function () {
      $(this).hover(
        function () {
          $(this).attr('src', $(this).attr('id'));
        },
        function () {
          $(this).attr('src', $(this).attr('src').replace('_info', ''));
        }
      );

      $(this).click(function () {
        const items = {
          "Espresso": 1.95,
          "Latte": 2.95,
          "Cappuccino": 3.45,
          "Drip coffee": 1.75,
          "Biscotti": 1.95,
          "Scone": 2.95
        };
        const itemName = $(this).attr('alt');
        addOrUpdateItemInOrder(items[itemName], itemName);
      });
    });
  })

  //Function for place order
  document.getElementById('place_order').addEventListener('click', function () {
    const orderSelect = document.getElementById('order');
    if (orderSelect.options.length > 0) {
      window.location.href = 'checkout.html';
    } else {
      alert('Please add items to the basket before placing an order.');
    }
  });

  // Clear Order button
  document.getElementById('clear_order').addEventListener('click', function () {
    document.getElementById('order').innerHTML = '';
    document.getElementById('total').textContent = '';
  });
});

//Slide show
var slideIndex = 1;
showSlides(slideIndex);
var slides, dots, timer;

function showSlides(n) {
  var i;
  slides = document.getElementsByClassName("mySlides");
  dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  // Clear the previous timer and start a new one
  clearTimeout(timer);
  timer = setTimeout(function () { showSlides(slideIndex += 1); }, 5000); // Change image every 4 seconds
}

function currentSlide(n) {
  clearTimeout(timer); // Stop the auto-play when a dot is clicked
  showSlides(slideIndex = n);
}

//Book a table form
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const guestsInput = document.getElementById('people');


  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  function updateWorkingHours(day) {

    if (day >= 1 && day <= 5) {
      timeInput.min = '09:00';
      timeInput.max = '19:00';
    }

    else if (day === 6 || day === 0) {
      timeInput.min = '10:00';
      timeInput.max = '19:00';
    }
  }

  // event for date changes
  dateInput.addEventListener('change', function () {
    const selectedDay = new Date(this.value).getDay();
    updateWorkingHours(selectedDay);
  });

  // event for time changes
  timeInput.addEventListener('change', function () {
    const selectedDay = new Date(dateInput.value).getDay();

    // Reset time input if time is outside working hours
    if (this.value < this.min || this.value > this.max) {
      this.value = '';
    }
  });
  // event for guests input changes
  guestsInput.addEventListener('input', function () {

    if (parseInt(this.value) <= 0) {
      this.value = '';
    }
  });
});