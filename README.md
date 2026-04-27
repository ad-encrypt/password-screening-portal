# Password Screening Portal

A simple yet powerful JavaScript-based tool that acts like a **Security Guard at the gate**.  
It checks your password against a set of rules (length, numbers, uppercase, symbols) and verifies if it has ever appeared in a **data breach** using the [Have I Been Pwned API](https://haveibeenpwned.com/).

---

## Features
- **Instant Feedback**: Regex-powered checks for numbers, uppercase, lowercase, and special characters.
- **Clean Code**: Organized with arrays & objects instead of endless `if/else`.
- **Privacy First**: Uses SHA‑1 hashing + k‑Anonymity (only sends the first 5 characters of your hash).
- **Breach Detection**: Confirms if your password has been leaked — privately, on your own machine.
- **User-Friendly UI**: Clear red/green indicators for each rule.

---

##  How It Works
1. **Regex** → Finds patterns in your password (numbers, letters, symbols).
2. **Objects & Arrays** → Organize rules neatly for looping.
3. **Flags** → Control when results are shown.
4. **Web Crypto API** → Hashes your password securely.
5. **Fetch API** → Talks to Have I Been Pwned.
6. **Prefix/Suffix Matching** → Confirms breaches without exposing your password.

---

##  Project Structure
index.html   # Main page
passwordStyle.css    # Styling
passwordtest.js    # Core logic (regex, hashing, API fetch)

---



---

## 📖 Usage
1. Clone the repo:
   ```bash
   git clone https://ad-encrypt.github.io/password-screening-portal/
2.Open index.html in your browser.
3.Type a password → see instant feedback + breach check.
