const addCartItems = document.querySelectorAll(".button");
const cartValue = document.getElementById("cart-value");
const cartButton = document.getElementById('cart');
let totalPrice = 0;
let cartItems = [];

addCartItems.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Update cart count
        cartValue.textContent = ++cartValue.textContent;

        // Get product details
        const productName = event.currentTarget.parentNode.previousElementSibling.querySelector('h3').textContent;
        const productPrice = parseFloat(event.currentTarget.parentNode.querySelector('p').textContent.slice(1));

        // Check if the product is already in the cart
        const alreadyInCart = cartItems.find(item => item.productName === productName);

        if (alreadyInCart) {
            // Increment quantity if the product is already in the cart
            alreadyInCart.quantity++;
        } else {
            // Add a new product to the cart
            cartItems.push({
                productName: productName,
                quantity: 1,
                price: productPrice
            });
        }

        // Update total price
        totalPrice += productPrice;
    });
});

cartButton.addEventListener('click', () => {
    // Log cart items to console
    cartItems.forEach((item) => {
        console.log(item);
    });

    // Log the total payable amount to console
    console.log(`The total payable amount is $${totalPrice.toFixed(2)}`);

    // Format the message for WhatsApp
    let message = "Order Summary:\n";
    cartItems.forEach((item) => {
        message += `${item.productName}: ${item.quantity}\n`;
    });
    message += `\nTotal payable amount is $${totalPrice.toFixed(2)}`;

    // Replace '9043571145' with your phone number as a string
    const phone = '9043571145';

    // Encode the message for a WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    // Open a WhatsApp window with the message
    window.open(`https://wa.me/+91${phone}?text=${encodedMessage}`, "_blank");
});
