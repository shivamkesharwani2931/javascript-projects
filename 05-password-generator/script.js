const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");

const copyMessage = document.getElementById("copyMessage");
const errorMessage = document.getElementById("errorMessage");

/* 2. Character sets */
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*";


/* 3. Generate password */
function generatePassword() {

    let characters = lowercase;
    let password = "";

    errorMessage.textContent = "";
    copyMessage.textContent = "";

    // Add uppercase letters if selected
    if (uppercaseCheckbox.checked) {
        characters += uppercase;
    }

    // Add numbers if selected
    if (numbersCheckbox.checked) {
        characters += numbers;
    }

    // Add symbols if selected
    if (symbolsCheckbox.checked) {
        characters += symbols;
    }

    // Generate random characters
    for (let i = 0; i < lengthSlider.value; i++) {

        const randomNumber = crypto.getRandomValues(
            new Uint32Array(1)
        )[0] % characters.length;

        password += characters[randomNumber];
    }

    // Display the password
    passwordInput.value = password;
    lengthValue.textContent = lengthSlider.value;
}


/* 4. Update length when slider moves */

lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = lengthSlider.value;
});


/* 5. Generate button */

generateButton.addEventListener("click", function () {
    generatePassword();
});


/* 6. Copy password */

copyButton.addEventListener("click", async function () {

    if (passwordInput.value === "") {
        copyMessage.textContent = "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        copyMessage.textContent = "Password copied!";
    } catch (error) {
        copyMessage.textContent = "Unable to copy. Try using Live Server.";
    }
});

generatePassword();
