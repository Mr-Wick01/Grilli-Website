const searchicon1 = document.querySelector("#searchicon1");
const srchicon1 = document.querySelector('#srchicon1');
const search1 = document.querySelector('#searchinput1');
const searchicon2 = document.querySelector("#searchicon2");
const srchicon2 = document.querySelector('#srchicon2');
const search2 = document.querySelector('#searchinput2');
const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');
const headerbar = document.querySelector('.headerbar');
const crosssignmb = document.querySelector('#x-sign-mb');
const sign = document.querySelector('.sign');
const signbox = document.querySelector('.sign-box');
const tosignin = document.querySelector('#to-signin');
const tosignup = document.querySelector('#to-signup');
const signup = document.querySelector('.signup');
const signin = document.querySelector('.signin');
const signlogo = document.querySelector('#user-lap');
const signlogomb = document.querySelector('#user-mb');
const basket = {};

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
}

// Toggle dark mode
function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Function to handle currency conversion
function convertCurrency() {
    // Retrieve input values
    const amountInput = parseFloat(document.getElementById('amount-input').value);
    const fromCurrencyInput = document.getElementById('from-currency').value;
    const toCurrencyInput = document.getElementById('to-currency').value;
    
    // Fetch exchange rates from a currency conversion API
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyInput}`)
        .then(response => response.json())
        .then(data => {
            // Calculate converted amount
            const exchangeRate = data.rates[toCurrencyInput];
            const convertedAmount = amountInput * exchangeRate;
            
            // Display converted amount
            const resultElement = document.getElementById('conversion-result');
            resultElement.textContent = `${amountInput} ${fromCurrencyInput} = ${convertedAmount.toFixed(2)} ${toCurrencyInput}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
        });
}

  
// When search icon (tablet/mobile) in hidden header bar clicked it will show the search bar.
searchicon1.addEventListener("click", function() {
    search1.style.display = 'flex';
    searchicon1.style.display = 'none';
});

// When search icon (laptop) in header clicked it will show the search bar.
searchicon2.addEventListener("click", function() {
    search2.style.display = 'flex';
    searchicon2.style.display = 'none';
});

// when bar icon (tablet/mobile) clicked it will display the hidden header bar.
bar.addEventListener('click', () => {
    setTimeout(() => {
        cross.style.display = 'block';
    }, 200);
    headerbar.style.right = '0%';
});

// when cross icon (tablet/mobile) clicked it will hide the showing header bar.
cross.addEventListener('click', () => {
    cross.style.display = 'none';
    headerbar.style.right = '-100%';
});

//when click on Id=x-sign it will hide the sign up form
function removeSignform() {
    signbox.style.transform = 'scale(0)';
    setTimeout(() => {
        sign.style.display = 'none';
    }, 400);
}
crosssignmb.addEventListener('click', removeSignform);

// when click on user icon in header it will show the sign up form
signlogo.addEventListener('click', () => {
    sign.style.display = 'flex';
    setTimeout(() => {
        signbox.style.transform = 'scale(1)';
    }, 100);
});
signlogomb.addEventListener('click', () => {
    sign.style.display = 'flex';
    setTimeout(() => {
        signbox.style.transform = 'scale(1)';
    }, 100);
});

//This is to toggle between sign in/sign up forms
tosignin.addEventListener('click', () => {
    signup.style.display = 'none';
    signin.style.display = 'block';
});
tosignup.addEventListener('click', () => {
    signup.style.display = 'block';
    signin.style.display = 'none';
});

// Function to add item to basket
function addToBasket(item, price) {
    if (basket[item]) {
        basket[item]++;
    } else {
        basket[item] = 1;
    }

    // Increment total price
    if (!basket.totalPrice) {
        basket.totalPrice = price;
    } else {
        basket.totalPrice += price;
    }
}

// Function to handle checkout
function checkout() {
    const basketItems = document.getElementById('basket-items');
    const totalElement = document.getElementById('total');

    basketItems.innerHTML = '';

    for (const [item, quantity] of Object.entries(basket)) {
        if (item !== 'totalPrice') {
            const listItem = document.createElement('li');
            listItem.textContent = `${item}: ${quantity}`;
            basketItems.appendChild(listItem);
        }
    }

    totalElement.textContent = `Total: $${basket.totalPrice.toFixed(2)}`;
    document.getElementById('basket').style.display = 'block';
}

// Function to update the basket count
function updateBasketCount(count) {
    document.getElementById('basket-count').textContent = count;
}

// Function to initialize the website
function initializeWebsite() {
    // Add event listener to the checkout button
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', checkout);
    
    // Initialize basket count
    updateBasketCount(getBasketItemCount());
}

// Call initializeWebsite function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Dark mode toggle button
const darkModeButton = document.getElementById('dark-mode-button');
darkModeButton.addEventListener('click', toggleDarkMode);

// Toggle audio description
document.getElementById('toggle-description').addEventListener('click', function() {
    var audio = document.getElementById('description');
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  document.getElementById('search-button').addEventListener('click', function() {
    // Get the search query from the input field
    var searchQuery = document.getElementById('search-input').value;
    // Redirect to the search engine with the search query
    window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);
  });

