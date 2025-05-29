const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

const resultEl = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const strengthFill = document.getElementById("strengthFill");
const generateBtn = document.getElementById("generate");

function generatePassword(length, upper, lower, numbers, symbols) {
  let chars = "";
  if (upper) chars += uppercaseChars;
  if (lower) chars += lowercaseChars;
  if (numbers) chars += numberChars;
  if (symbols) chars += symbolChars;
  if (!chars) return "";

  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

function evaluateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}

function updateStrengthBar(strength) {
  let width = 0;
  strengthFill.className = "strength-fill";

  if (strength === "weak") {
    width = 33;
    strengthFill.classList.add("strength-weak");
  } else if (strength === "medium") {
    width = 66;
    strengthFill.classList.add("strength-medium");
  } else if (strength === "strong") {
    width = 100;
    strengthFill.classList.add("strength-strong");
  }

  strengthFill.style.width = width + "%";
}

generateBtn.addEventListener("click", () => {
  const length = +document.getElementById("length").value;
  const upper = document.getElementById("uppercase").checked;
  const lower = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  const password = generatePassword(length, upper, lower, numbers, symbols);

  if (!password) {
    alert("Por favor, selecione pelo menos uma opção de caractere!");
    return;
  }

  resultEl.textContent = password;
  copyBtn.style.display = "block";

  const strength = evaluateStrength(password);
  updateStrengthBar(strength);

  copyMsg.classList.remove("visible");
});

copyBtn.addEventListener("click", () => {
  if (!resultEl.textContent) return;

  navigator.clipboard.writeText(resultEl.textContent).then(() => {
    copyMsg.classList.add("visible");
    setTimeout(() => copyMsg.classList.remove("visible"), 2000);
  }).catch(() => {
    alert("Não foi possível copiar a senha. Tente manualmente.");
  });
});

resultEl.addEventListener("click", () => {
  copyBtn.click();
});

