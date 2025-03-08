const supabaseUrl = "https://gsbczcgdaatpfewgydca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get('pollId');

const title = document.getElementById('question');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const submit_btn = document.getElementById('submit-btn')


document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Query the polls table for the specific poll
        const { data, error } = await supabaseClient
          .from('polls')
          .select('*')  // Select all columns - you can be more specific if needed
          .eq('id', pollId)
          .single();  // We expect a single result
          
        if (error) {
          console.error('Error fetching poll details:', error);
          return;
        }
        if (!data) {
          console.error('Poll not found');
          return;
        }
        // Display question
        document.querySelector(".question").textContent = data.question;

        // Generate radio button options dynamically
        const optionsContainer = document.querySelector(".options");
        optionsContainer.innerHTML = ""; // Clear previous options

        for (let i = 1; i <= 4; i++) {
            const optionKey = `option${i}`;
            if (data[optionKey]) {
                const label = document.createElement("label");
                label.innerHTML = `<span class="option-label">${String.fromCharCode(64 + i)}.</span> 
                    <input type="radio" name="option" value="${data[optionKey]}"> ${data[optionKey]}`;
                optionsContainer.appendChild(label);
            }
        }
    } catch (err) {
        console.error('Exception when displaying poll:', err);
    }
});

submit_btn.addEventListener('click', async function() {
    const radioButtons = document.querySelectorAll('input[name="option"]');
    
    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            var choice = radioButton.value;
            vote(choice);
        }
    });
});

async function vote(optionId) {
    let { data, error } = await supabaseClient
        .from('poll_responses')
        .select('vote_count')
        .eq('poll_id', pollId)
        .eq('option_name', optionId)
        .single();

    if (error) {
        console.error('Error fetching vote count:', error);
        return;
    }

    let newVoteCount = data.vote_count + 1;

    // Update vote count
    let { error: updateError } = await supabaseClient
        .from('poll_responses')
        .update({ vote_count: newVoteCount })
        .eq('poll_id', pollId)
        .eq('option_name', optionId);

    if (updateError) {
        console.error('Error voting:', error);
    } else {
        // alert('Vote registered:', data);
        window.location.href = `end_results.html?pollId=${pollId}`;
    }
}