
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";


document.head.appendChild(script);


script.onload = function() {
    console.log("jQuery loaded successfully!");
    // You can now use jQuery functions
    $('body').append('<p>jQuery is working!</p>');
};
