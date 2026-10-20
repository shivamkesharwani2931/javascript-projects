
/* Get the HTML elements */
const changeColorButton = document.getElementById("changeColorButton");
const copyButton = document.getElementById("copyButton");
const colorPreview = document.getElementById("colorPreview");
const hexValue = document.getElementById("hexValue");
const message = document.getElementById("message");

/* Store the current color */
let currentColor = "#7C3AED";

/* Generate a random HEX color */
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        color += letters[randomIndex];
    }

    return color;
}

/* Change the displayed color */
function changeColor() {
    currentColor = generateRandomColor();

    colorPreview.style.backgroundColor = currentColor;
    document.body.style.backgroundColor = currentColor;
    hexValue.textContent = currentColor;

    message.textContent = "New color generated successfully!";
    copyButton.textContent = "Copy";
}

/* Copy the current HEX color */
async function copyColor() {
    try {
        await navigator.clipboard.writeText(currentColor);

        copyButton.textContent = "Copied!";
        message.textContent = currentColor + " copied to clipboard!";
    } catch (error) {
        message.textContent = "Copy failed. Please copy " + currentColor + " manually.";
    }
}

/* Listen for button clicks */
changeColorButton.addEventListener("click", changeColor);
copyButton.addEventListener("click", copyColor);
