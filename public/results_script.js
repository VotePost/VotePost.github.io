const supabaseUrl = "https://gsbczcgdaatpfewgydca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get('pollId');

alert()

script.src = "https://code.jquery.com/jquery-3.6.0.min.js";


document.head.appendChild(script);

script.onload = function() {
    console.log("jQuery loaded successfully!");
    // You can now use jQuery functions
    $('body').append('<p>jQuery is working!</p>');
};
