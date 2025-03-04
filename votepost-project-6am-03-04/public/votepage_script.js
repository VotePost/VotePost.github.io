const supabaseUrl = "https://gsbczcgdaatpfewgydca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get("pollId");  // Get pollId from the URL

    if (!pollId) {
        console.error("No poll ID found in the URL.");
        return;
    }

    // Fetch poll data from Supabase
    const { data, error } = await supabase.from("polls").select("*").eq("id", pollId).single();

    if (error) {
        console.error("Error fetching poll:", error);
        return;
    }

    // Display question
    document.querySelector(".question").innerHTML = ""; // Clear previous options
    document.querySelector(".question").textContent = data.question;

    // Generate radio button options dynamically
    const optionsContainer = document.querySelector(".options");
    optionsContainer.innerHTML = ""; // Clear previous options

    for (let i = 1; i <= 6; i++) {
        const optionKey = `option${i}`;
        if (data[optionKey]) {
            const label = document.createElement("label");
            label.innerHTML = `<span class="option-label">${String.fromCharCode(64 + i)}.</span> 
                <input type="radio" name="option" value="${data[optionKey]}"> ${data[optionKey]}`;
            optionsContainer.appendChild(label);
        }
    }
});
