document.addEventListener('DOMContentLoaded', () => {
    const addOptionButton = document.getElementById('addOption');
    const optionsContainer = document.getElementById('optionsContainer');
    
    const maxOptions = 6;
    const pollForm = document.getElementById('polllForm');

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
        optionCounter = optionDivs.length; // Correctly update counter
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
            optionCounter++;
            updateOptionLabels(); // Update labels after adding
        } else {
            alert(`You can only have up to ${maxOptions} options.`);
        }
    });

    optionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const optionDiv = event.target.closest('.option');
            if (optionDiv && optionCounter > 2) {
                optionsContainer.removeChild(optionDiv);
                updateOptionLabels(); // Update labels after removing
            } else {
                alert("You must have at least two options!");
            }
        }
    });

    document.getElementById('pollForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const premise = document.getElementById('pollPremise').value;
        const options = Array.from(document.querySelectorAll('input[name="options[]"]')).map(input => input.value);

        console.log("Premise:", premise);
        console.log("Options:", options);

        alert("Poll created successfully! (Check the console for details)");
    });
});