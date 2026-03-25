// --- 1. CALCULATOR ENGINE ---
function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display) display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    if (display) display.value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        // This handles the math logic (e.g., 5+5 = 10)
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// --- 2. AUTOMATIC INSTALL POP-UP LOGIC ---
let deferredPrompt;
const welcomeModal = document.getElementById('welcome-modal');
const modalInstallBtn = document.getElementById('modal-install-btn');

// Register the Service Worker (Required for the Pop-up)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("Service Worker Active"))
            .catch(err => console.log("Service Worker Error", err));
    });
}

// Listen for the "Installable" signal from Chrome
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the tiny default Chrome bar
    e.preventDefault();
    // Save the event
    deferredPrompt = e;

    // Trigger our custom Welcome Pop-up automatically
    if (welcomeModal) {
        welcomeModal.style.display = 'flex';
    }
});

// Make the button inside your Pop-up trigger the actual Install
if (modalInstallBtn) {
    modalInstallBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted install');
                }
                deferredPrompt = null;
                welcomeModal.style.display = 'none';
            });
        }
    });
          }
