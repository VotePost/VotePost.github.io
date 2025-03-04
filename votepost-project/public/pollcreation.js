const supabaseUrl = "https://gsbczcgdaatpfewgydca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.getElementById('optionsContainer');
    const addOptionButton = document.getElementById('addOption');
    const pollForm = document.getElementById('pollForm');
    const maxOptions = 6;

    // Initialize with two options (A and B)
    let optionCounter = 2;
    updateOptionLabels();

    function updateOptionLabels() {
        const optionDivs = optionsContainer.querySelectorAll('.option');
        optionDivs.forEach((div, index) => {
            const letter = String.fromCharCode(65 + index);
            div.id = `optionDiv${index + 1}`;

            const label = div.querySelector('label');
            label.setAttribute('for', `option${letter}`);
            label.textContent = `${letter} -`;

            const input = div.querySelector('input');
            input.setAttribute('id', `option${letter}`);

            const removeBtn = div.querySelector('.remove-btn');
            removeBtn.setAttribute('data-id', index + 1);
        });
        optionCounter = optionDivs.length;
    }

    addOptionButton.addEventListener('click', () => {
        if (optionCounter < maxOptions) {
            const letter = String.fromCharCode(65 + optionCounter);
            const newOptionDiv = document.createElement('div');
            newOptionDiv.className = 'option';

            newOptionDiv.innerHTML = `
                <label for="option${letter}">${letter} -</label>
                <input type="text" id="option${letter}" name="options[]" required>
                <button type="button" class="remove-btn">❌</button>
            `;

            optionsContainer.appendChild(newOptionDiv);
            updateOptionLabels();
        } else {
            alert(`You can only have up to ${maxOptions} options.`);
        }
    });

    optionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const optionDiv = event.target.closest('.option');
            if (optionDiv && optionCounter > 2) {
                optionsContainer.removeChild(optionDiv);
                updateOptionLabels();
            } else {
                alert("You must have at least two options!");
            }
        }
    });

    // CREATE POLL
    pollForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const premise = document.getElementById('pollPremise').value;
        const optionsList = Array.from(document.querySelectorAll('input[name="options[]"]')).map(input => input.value);
    
        // TODO: could make this a loop.
        const optionsObj = {};
        if (optionsList[0]) {
            optionsObj.option1 = optionsList[0];
        }
        if (optionsList[1]) {  // Changed from else if to if
            optionsObj.option2 = optionsList[1];
        }
        if (optionsList[2]) {
            optionsObj.option3 = optionsList[2];
        }
        if (optionsList[3]) {
            optionsObj.option4 = optionsList[3];
        }
        
        // STORE POLL IN DB
        const { data, error } = await supabaseClient.from('polls').insert([{ question: premise, ...optionsObj }]).select();
        
        if (error) {
            console.error('Error creating poll:', error);
        } 
        
        const pollId = data[0].id;

        const pollResponses = optionsList.map(option => ({
            poll_id: pollId,
            option_name: option,
            vote_count: 0
        }));

        const { error: responsesError } = await supabaseClient
        .from('poll_responses')
        .insert(pollResponses);

        if (responsesError) {
            console.error('Error adding poll options:', responsesError);
        } else {
            console.log('Poll and options created successfully!');
            window.location.href = `QRcode.html?pollId=${pollId}`;
        }
        
        // // TODO: STORE OPTIONS IN SECOND TABLE
        // const { data, error } = await supabaseClient.from('poll_responses').insert([{ question: premise, ...optionsObj }]).select();
        
        // if (error) {
        //     console.error('Error creating poll:', error);
        // } else {
        //     console.log('Poll created:', data);
        //     const pollId = data[0].id;
        //     window.location.href = `QRcode.html?pollId=${pollId}`;
        // }
    });
});


// XXXXXXXXXX
// document.addEventListener('DOMContentLoaded', function() {


//     createButton.addEventListener('click', function() {
//         // get input fields from html
//         let pollPremise = document.getElementById('pollPremise');
//         const inputOptions = document.getElementById('optionsContainer').querySelectorAll('input');
//         let options = [];

//         // loop through options and make list
//         for (let i = 0; i < inputOptions.length; i++) {
//             const child = inputOptions[i].value;
//             options = options.concat(child);
//         }

//         // create poll 
//         createPoll(pollPremise, options);

//         // alert for testing purposess
//         alert('Premise:  ' + poll.title + '\nOptions: ' + poll.options + ' ' + poll.ID);

//         // window.location.href = 'quiz creation.html';
//     });
// });