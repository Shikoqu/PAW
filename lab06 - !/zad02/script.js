function addEntry() {
    const nameInput = document.getElementById('specificSizeInputName');
    const phoneInput = document.getElementById('phone');

    if (!validateInputs(nameInput.value, phoneInput.value)) {
        alert('Invalid input! Please check your name and phone number.');
        return;
    }

    const phoneBookContainer = document.getElementById('phoneBookContainer');

    // Create a new card entry
    const card = document.createElement('div');
    card.className = 'card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.style.display = 'flex';
    cardBody.style.alignItems = 'center';
    cardBody.style.justifyContent = 'space-between';

    const infoDiv = document.createElement('div');
    const nameElement = document.createElement('h5');
    nameElement.className = 'card-title';
    nameElement.textContent = nameInput.value;
    const phoneElement = document.createElement('p');
    phoneElement.className = 'card-text';
    phoneElement.textContent = phoneInput.value;

    infoDiv.appendChild(nameElement);
    infoDiv.appendChild(phoneElement);

    const deleteButton = document.createElement('a');
    deleteButton.href = '#';
    deleteButton.className = 'btn btn-success';
    deleteButton.innerHTML = '<img src="icons/trash.svg" style="filter: brightness(0) invert(1);">';
    deleteButton.addEventListener('click', function () {
        card.remove();
    });

    cardBody.appendChild(infoDiv);
    cardBody.appendChild(deleteButton);

    card.appendChild(cardBody);

    phoneBookContainer.appendChild(card);

    // Clear input fields after adding entry
    nameInput.value = '';
    phoneInput.value = '';
}

function validateInputs(name, phone) {
    const nameRegex = /^[A-Z][A-Za-z\- ]*$/;
    const phoneRegex = /^\s*\+?(\d[\s-]*){9,12}$/;

    return nameRegex.test(name) && phoneRegex.test(phone);
}
