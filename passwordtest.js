const inputForm = document.querySelector(".inputForm");
const passwordInput = document.getElementById("password");
const resultContainer = document.querySelector(".result");
const vulCheckDisplay = document.querySelector(".vulCheck");

let isAnalyzed = false; 


inputForm.addEventListener("input", () => {
    const password = passwordInput.value;
    

    const checks = [
        { el: document.querySelector(".lengthCheck"), met: password.length >= 8 },
        { el: document.querySelector(".lowerCaseCheck"), met: /[a-z]/.test(password) },
        { el: document.querySelector(".upperCaseCheck"), met: /[A-Z]/.test(password) },
        { el: document.querySelector(".symbolCheck"), met: /[!/@#$%^&*()_><:`~;"']/.test(password) },
        { el: document.querySelector(".numberCheck"), met: /[0-9]/.test(password) }
    ];

    resultContainer.style.display = "block";

    checks.forEach(check => {
        const originalText = check.el.getAttribute("data-text");
        
        if (check.met) {
            check.el.style.display = "block";
            check.el.style.color = "greenyellow";
            check.el.textContent = `✅ ${originalText}`;
        } else {
            // Only show the failures if the user has clicked "Analyze"
            if (isAnalyzed) {
                check.el.style.display = "block";
                check.el.style.color = "red";
                check.el.textContent = `❌ Missing: ${originalText}`;
            } else {
                check.el.style.display = "none";
            }
        }
    });


    vulCheckDisplay.style.display = "none";
});


inputForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = passwordInput.value;

    if (!password) return;

    isAnalyzed = true;
    
    
    
    passwordInput.dispatchEvent(new Event('input'));

    
    vulCheckDisplay.style.display = "block";
    vulCheckDisplay.style.color = "white";
    vulCheckDisplay.textContent = "Checking breach database...";

    try {
        // Hashing Process
        const msgUint8 = new TextEncoder().encode(password); 
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

        const prefix = hashHex.slice(0, 5);
        const suffix = hashHex.slice(5);

        const data = await getBreachData(prefix);
        const lines = data.split('\n');
        const found = lines.find(line => line.startsWith(suffix));

        if (found) {
            const count = found.split(":")[1];
            vulCheckDisplay.textContent = `⚠️ Found in ${count.trim()} data breaches!`;
            vulCheckDisplay.style.color = "red";

        } else {
            vulCheckDisplay.textContent = "✅ Not found in any data breaches";
            vulCheckDisplay.style.color = "greenyellow";
        }
    } catch (error) {
        vulCheckDisplay.textContent = "Error: Could not connect to API.";
        vulCheckDisplay.style.color = "orange";
    }
});


async function getBreachData(prefix) {
    const apiUrl = `https://api.pwnedpasswords.com/range/${prefix}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error();
    
    return await response.text();
}
