
  /*
  
  Este arquivo é responsável pela lógica do meu projeto Li Security- Gerador de senhas.
 Aqui estão todas as funcionalidades que fazem o site funcionar de verdade:
  
  - Gerar senhas seguras personalizadas
  - Alternar entre dois idiomas (Português e Inglês)
  - Copiar e exportar em arquivo txt a senha gerada
  - Avaliar o nível de segurança da senha
  - Ativar/desativar tema escuro
  - Jogar um jogo da memória educativo sobre segurança de senhas


  */

// Variáveis Globais

// Pegando elementos do HTML para interagir com eles

const languageSelect = document.getElementById('language-select');
const labels = {
  pt: {
    languageLabel: 'Idioma / Language',
    customizeTitle: 'Personalize a sua senha',
    uppercase: 'Incluir letras maiúsculas (A-Z)',
    lowercase: 'Incluir letras minúsculas (a-z)',
    numbers: 'Incluir números (0-9)',
    symbols: 'Incluir símbolos (!@#...)',
    length: 'Comprimento da senha',
    generate: '🔐 Gerar Senha',
    copy: '📋 Copiar',
    export: '💾 Exportar para .txt',
    passwordPlaceholder: 'A senha aparecerá aqui',
    strengthLabel: 'Nível de Segurança',
    memoryTitle: 'Jogo da Memória: Segurança de Senhas',
    memoryDesc: 'Este jogo mostra como repetir padrões pode ser arriscado. Encontra os pares relacionados com boas práticas de segurança.',
    errors: {
      length: 'O comprimento da senha deve ser entre 8 e 64.',
      noOption: 'Seleciona pelo menos um tipo de caractere.'
    },
    strengthLevels: ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte']
  },
  en: {
    languageLabel: 'Language / Idioma',
    customizeTitle: 'Customize your password',
    uppercase: 'Include uppercase letters (A-Z)',
    lowercase: 'Include lowercase letters (a-z)',
    numbers: 'Include numbers (0-9)',
    symbols: 'Include symbols (!@#...)',
    length: 'Password length',
    generate: '🔐 Generate Password',
    copy: '📋 Copy',
    export: '💾 Export to .txt',
    passwordPlaceholder: 'Password will appear here',
    strengthLabel: 'Security Level',
    memoryTitle: 'Memory Game: Password Security',
    memoryDesc: 'This game shows how repeating patterns can be risky. Find the pairs related to good security practices.',
    errors: {
      length: 'Password length must be between 8 and 64.',
      noOption: 'Select at least one character type.'
    },
    strengthLevels: ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong']
  }
};

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const lengthInput = document.getElementById('length');

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const exportBtn = document.getElementById('export');
const passwordDisplay = document.getElementById('password-display');
const strengthDisplay = document.getElementById('strength');

const toggleVisibilityBtn = document.getElementById('toggle-visibility');
const themeToggleBtn = document.getElementById('theme-toggle');

const memoryGameContainer = document.getElementById('memory-game');
const memoryTitle = document.getElementById('memory-title');
const memoryDescription = document.getElementById('memory-description');

let currentLanguage = 'pt';
let passwordVisible = false;
let darkMode = false;

// Funções de Tradução

function updateTexts() {
  const t = labels[currentLanguage];

  document.getElementById('language-label').textContent = t.languageLabel;
  document.getElementById('customize-title').textContent = t.customizeTitle;
  document.getElementById('label-uppercase').textContent = t.uppercase;
  document.getElementById('label-lowercase').textContent = t.lowercase;
  document.getElementById('label-numbers').textContent = t.numbers;
  document.getElementById('label-symbols').textContent = t.symbols;
  document.getElementById('label-length').textContent = t.length;
  generateBtn.textContent = t.generate;
  copyBtn.textContent = t.copy;
  exportBtn.textContent = t.export;
  passwordDisplay.textContent = t.passwordPlaceholder;
  strengthDisplay.textContent = `${t.strengthLabel}: —`;
  memoryTitle.textContent = t.memoryTitle;
  memoryDescription.textContent = t.memoryDesc;
}

// Função para Gerar a senha

function gerarSenha() {
  const t = labels[currentLanguage];
  const length = parseInt(lengthInput.value, 10);
  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  if (isNaN(length) || length < 8 || length > 64) {
    alert(t.errors.length);
    return;
  }

  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
    alert(t.errors.noOption);
    return;
  }

  let charset = '';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) charset += '0123456789';
  if (useSymbols) charset += '!@#$%^&*()_+~|}{[]:;?><,./-=';

  let senha = '';
  for (let i = 0; i < length; i++) {
    senha += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  passwordDisplay.textContent = senha;
  atualizaNivelSeguranca(senha);
}

// Função para avaliação de nivel de segurança da senha 

function atualizaNivelSeguranca(senha) {
  const t = labels[currentLanguage];
  let score = 0;

  if (senha.length >= 8) score++;
  if (senha.length >= 12) score++;
  if (/[A-Z]/.test(senha)) score++;
  if (/[0-9]/.test(senha)) score++;
  if (/[^A-Za-z0-9]/.test(senha)) score++;

  if (score > 4) score = 4;

  strengthDisplay.textContent = `${t.strengthLabel}: ${t.strengthLevels[score]}`;
}

// Função de copiar a senha 

function copiarSenha() {
  const senha = passwordDisplay.textContent;
  if (!senha || senha === labels[currentLanguage].passwordPlaceholder) {
    alert('Nenhuma senha para copiar!');
    return;
  }
  navigator.clipboard.writeText(senha).then(() => {
    alert('Senha copiada para a área de transferência!');
  });
}

// Função para exportar a senha para um arquivo .TXT

function exportarSenha() {
  const senha = passwordDisplay.textContent;
  if (!senha || senha === labels[currentLanguage].passwordPlaceholder) {
    alert('Nenhuma senha para exportar!');
    return;
  }

  const blob = new Blob([senha], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'senha-secureli.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert('Senha exportada para o ficheiro .txt!');
}

// Função para mostrar/ocultar a senha clicando nos emojis

function toggleSenhaVisivel() {
  passwordVisible = !passwordVisible;

  if (passwordVisible) {
    passwordDisplay.style.webkitTextSecurity = 'none';
    toggleVisibilityBtn.textContent = '🙈';
  } else {
    passwordDisplay.style.webkitTextSecurity = 'disc';
    toggleVisibilityBtn.textContent = '👁️';
  }
}

// Função para alterar entre tema claro e escuro. 

function alternarTema() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  themeToggleBtn.textContent = darkMode ? '☀️' : '🌙';
}

// Função para Traduzir a interface

function traduzirInterface() {
  updateTexts();
}

// Função para configurar os "eventos", que são ações do usuário na página

languageSelect.addEventListener('change', (e) => {
  currentLanguage = e.target.value;
  traduzirInterface();
  criarCartas();
});

generateBtn.addEventListener('click', gerarSenha);
lengthInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    gerarSenha();
  }
});
copyBtn.addEventListener('click', copiarSenha);
exportBtn.addEventListener('click', exportarSenha);
toggleVisibilityBtn.addEventListener('click', toggleSenhaVisivel);
themeToggleBtn.addEventListener('click', alternarTema);

// Jogo da memória 

const pares = [
  { id: 1, textPT: 'Use senhas únicas', textEN: 'Use unique passwords' },
  { id: 2, textPT: 'Evite palavras comuns', textEN: 'Avoid common words' },
  { id: 3, textPT: 'Use combinações complexas', textEN: 'Use complex combinations' },
  { id: 4, textPT: 'Atualize regularmente', textEN: 'Update regularly' },
  { id: 5, textPT: 'Ative 2FA', textEN: 'Enable 2FA' },
  { id: 6, textPT: 'Não partilhe senhas', textEN: 'Do not share passwords' }
];

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

function criarCartas() {
  memoryGameContainer.innerHTML = '';
  memoryCards = [];

  pares.forEach(par => {
    memoryCards.push({ id: par.id, text: currentLanguage === 'pt' ? par.textPT : par.textEN });
    memoryCards.push({ id: par.id, text: `Dica: ${currentLanguage === 'pt' ? par.textPT : par.textEN}` });
  });

  memoryCards = memoryCards.sort(() => 0.5 - Math.random());

  memoryCards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('memory-card');
    cardDiv.dataset.id = card.id;
    cardDiv.dataset.index = index;
    cardDiv.textContent = '';
    cardDiv.addEventListener('click', () => virarCarta(cardDiv));
    memoryGameContainer.appendChild(cardDiv);
  });

  matchedPairs = 0;
}

function virarCarta(cardDiv) {
  if (!canFlip || flippedCards.includes(cardDiv) || cardDiv.classList.contains('matched')) return;

  cardDiv.textContent = memoryCards[cardDiv.dataset.index].text;
  flippedCards.push(cardDiv);

  if (flippedCards.length === 2) {
    canFlip = false;
    setTimeout(() => {
      if (flippedCards[0].dataset.id === flippedCards[1].dataset.id) {
        flippedCards.forEach(c => c.classList.add('matched'));
        matchedPairs++;
        if (matchedPairs === pares.length) {
          setTimeout(() => alert(currentLanguage === 'pt' ? 'Parabéns! Encontraste todos os pares.' : 'Congratulations! You found all pairs.'), 500);
        }
      } else {
        flippedCards.forEach(c => (c.textContent = ''));
      }
      flippedCards = [];
      canFlip = true;
    }, 1500);
  }
}

// Iniciar o site

window.onload = () => {
  traduzirInterface();
  criarCartas();
  passwordDisplay.style.webkitTextSecurity = 'disc';
  toggleVisibilityBtn.textContent = '👁️';
  document.body.classList.remove('dark-mode');
  themeToggleBtn.textContent = '🌙';
};
