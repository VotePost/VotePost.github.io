const supabaseUrl = "https://gsbczcgdaatpfewgydca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get('pollId');
const end = urlParams.get('end');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Query the polls table for the specific poll
        const { data, error } = await supabaseClient
          .from('poll_responses')
          .select('*')  // Select all columns - you can be more specific if needed
          .eq('poll_id', pollId);
          
        if (error) {
          console.error('Error fetching poll details:', error);
          return;
        }
        if (!data) {
          console.error('Poll not found');
          return;
        }
        if (data.length == 0) {
            let div = document.getElementById('chart_div');
            const label = document.createElement("label");
            label.innerHTML = `No Responses Yet! Come back later.`;
            div.appendChild(label);
            return;
        }

        /////
        options = [];
        votes = [];
        for (let i = 0; i < data.length; i++) {
            options.push(data[i].option_name);
            votes.push(data[i].vote_count);
        }
        //////

        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawPollResults);


        // Display question
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
    } catch (err) {
        console.error('Exception when displaying poll:', err);
      }
});

async function drawPollResults() {
        
    // Fetch poll results from Supabase
    let { data, error } = await supabaseClient
        .from('poll_responses')
        .select('option_name, vote_count')
        .eq('poll_id', pollId); // Filter by specific poll

    if (error) {
        console.error('Error fetching poll results:', error);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No votes found for this poll.');
        return;
    }

    // Format data for Google Charts
    let chartData = [['Option', 'Votes']]; // Column headers
    data.forEach(row => {
        chartData.push([row.option_name, row.vote_count]); // Add each option & count
    });

    // Convert to Google Charts data format
    var googleData = google.visualization.arrayToDataTable(chartData);

    // Chart options
    var options = {
        title: 'Poll Results',
        chartArea: { width: '60%' },
        hAxis: { title: 'Votes', minValue: 0 },
        vAxis: { title: 'Options' }
    };

    // Draw the chart
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(googleData, options);
}

// delete poll if came from admin ending poll
window.addEventListener('beforeunload', async (event) => {
    if (end) {
        const { error } = await supabaseClient
            .from('polls')  // Your table where polls are stored
            .delete()
            .eq('id', pollId);  // Match the poll_id to delete the specific poll

        if (error) {
            console.error('Error deleting poll:', error);
        } else {
            console.log('Poll deleted successfully!');
        }
    }
})