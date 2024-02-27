// Wczytanie danych z pliku JSON
fetch('user.json')
    .then(response => response.json())
    .then(data => displayUsers(data))
    .catch(error => console.error('Error loading JSON file:', error));

function displayUsers(users) {
    const usersContainer = document.getElementById('users');

    users.forEach(user => {
        const userSection = createUserSection(user);
        usersContainer.appendChild(userSection);
    });
}

function createUserSection(user) {
    const userSection = document.createElement('div');
    userSection.classList.add('user-section');
    
    const fullName = `${user.firstName} ${user.lastName}`;
    const header = document.createElement('h2');
    header.textContent = fullName;
    userSection.appendChild(header);
    
    const toggleCheckbox = document.createElement('input');
    toggleCheckbox.type = 'checkbox';
    toggleCheckbox.checked = true;
    toggleCheckbox.classList.add('toggle-details');
    toggleCheckbox.addEventListener('change', () => toggleDetails(userSection, toggleCheckbox));
    userSection.appendChild(toggleCheckbox);
    
    const toggleLabel = document.createElement('label');
    toggleLabel.textContent = 'Toggle Details';
    toggleLabel.classList.add('toggle-details');
    toggleLabel.setAttribute('for', toggleCheckbox.id);
    userSection.appendChild(toggleLabel);

    const addressDetails = document.createElement('p');
    addressDetails.textContent = `Address: ${user.Address.Street}, ${user.Address.City}, ${user.Address.Country || user.Address.State}`;
    userSection.appendChild(addressDetails);

    const emailDetails = document.createElement('p');
    emailDetails.textContent = `Email: ${user.email}`;
    userSection.appendChild(emailDetails);

    const phoneDetails = document.createElement('p');
    phoneDetails.textContent = `Phone: ${user.phone}`;
    userSection.appendChild(phoneDetails);

    return userSection;
}

function toggleDetails(userSection, toggleCheckbox) {
    const detailsToToggle = userSection.querySelectorAll('p');

    detailsToToggle.forEach(detail => {
        if (toggleCheckbox.checked) {
            detail.style.display = 'block';
        } else {
            detail.style.display = 'none';
        }
    });
}
