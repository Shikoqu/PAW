passwordLong = false;
passwordSpecialChar = false;
passwordCapitalLetter = false;
passwordDigit = false;

function checkPasswordStrength(password) {
    const length = document.getElementById('length_check');
    const specialChar = document.getElementById('specialChar_check');
    const capitalLetter = document.getElementById('capitalLetter_check');
    const digit = document.getElementById('digit_check');
    
    checkLength(password, length);
    checkSpecialChar(password, specialChar);
    checkCapitalLetter(password, capitalLetter);
    checkDigit(password, digit);
}

function checkLength(password, element) {
    if (password.length >= 8) {
        element.src = 'imgs/ok.png';
        passwordLong = true;
    } else {
        element.src = 'imgs/wrong.png';
        passwordLong = false;
    }
}
function checkSpecialChar(password, element) {
    if (/[^\d\w]/.test(password)) {
        element.src = 'imgs/ok.png';
        passwordSpecialChar = true;
    } else {
        element.src = 'imgs/wrong.png';
        passwordSpecialChar = false;
    }
}
function checkCapitalLetter(password, element) {
    if (/[A-Z]/.test(password)) {
        element.src = 'imgs/ok.png';
        passwordCapitalLetter = true;
    } else {
        element.src = 'imgs/wrong.png';
        passwordCapitalLetter = false;
    }
}
function checkDigit(password, element) {
    if (/\d/.test(password)) {
        element.src = 'imgs/ok.png';
        passwordDigit = true;
    } else {
        element.src = 'imgs/wrong.png';
        passwordDigit = false;
    }
}

function passwordStrong() {
    if (passwordLong && passwordSpecialChar && passwordCapitalLetter && passwordDigit) {
        document.getElementById('newPassword').style.border = '1px solid #8a8a8a'; // Reset border color
        return true;
    } else {
        document.getElementById('errorMessage').textContent = 'Password is not strong enough';
        document.getElementById('newPassword').style.border = '1px solid red'; // Highlight the border in red
        return false;
    }
}

function checkPasswordsMatch() {
    const newPassword = document.getElementById('newPassword').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    if (newPassword === repeatPassword) {
        errorMessage.textContent = '';
        document.getElementById('repeatPassword').style.border = '1px solid #8a8a8a'; // Reset border color
        submitForm();
        return true;
    } else {
        errorMessage.textContent = 'Passwords do not match';
        document.getElementById('repeatPassword').style.border = '1px solid red'; // Highlight the border in red
        return false;
    }
}

function togglePasswordVisibility(fieldId, iconId) {
    const passwordInput = document.getElementById(fieldId);
    const icon = document.getElementById(iconId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.src = 'imgs/eye_open.png';
    } else {
        passwordInput.type = 'password';
        icon.src = 'imgs/eye_not_visible.png';
    }
}

document.getElementById('passwordForm').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        if (passwordStrong() && checkPasswordsMatch() === true) {
            submitForm();
        }
    }
});

function submitForm() {
    // Pobierz wartość hasła do oceny siły
    const newPassword = document.getElementById('newPassword').value;

    // Sprawdź siłę hasła
    checkPasswordStrength(newPassword);

    console.log('Form submitted successfully');

    // Clear input values
    document.getElementById('newPassword').value = '';
    document.getElementById('repeatPassword').value = '';

    // Reset password strength indicators
    const strengthItems = document.querySelectorAll('.password-strength-item img');
    strengthItems.forEach(item => {
        item.src = 'imgs/wrong.png';
    });

    // Reset error message
    document.getElementById('errorMessage').textContent = '';

    // Reset border color
    document.getElementById('repeatPassword').style.border = '1px solid #8a8a8a';
}
