
// CONFIGURATION & DATA

const TYPING_CONFIG = {
    texts: ["Seller.", "Designer.", "Developer.", "Gamer."],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseBeforeDeleting: 2000
};

const SOCIALS = [
    {
        name: 'facebook',
        url: 'https://www.facebook.com/die4memories'
    },

    { 
        name: 'messenger',
        url: 'https://m.me/die4memories'

    },

    {
        name: 'telegram',
        url: 'https://t.me/nguyenduc666'
    },

    {
        name: 'zalo',
        url: 'https://zalo.me/0979110280'
    }
];

// TYPING ANIMATION STATE

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// UTILITY FUNCTIONS

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// TYPING ANIMATION

function typeText() {
    const currentText = TYPING_CONFIG.texts[textIndex];
    const typedTextElement = document.getElementById("typed-text");
    
    if (!isDeleting && charIndex < currentText.length) {
        typedTextElement.innerHTML = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, TYPING_CONFIG.typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        typedTextElement.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeText, TYPING_CONFIG.deletingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, TYPING_CONFIG.pauseBeforeDeleting);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % TYPING_CONFIG.texts.length;
        setTimeout(typeText, TYPING_CONFIG.typingSpeed);
    }
}

// SKILL BARS ANIMATION

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent;
    });
}

function handleSkillsAnimation() {
    const skillSection = document.querySelector('.skills-section');
    if (isInViewport(skillSection)) {
        animateSkillBars();
        window.removeEventListener('scroll', handleSkillsAnimation);
    }
}

// NAVIGATION MENU

function initializeMenuToggle() {
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            navLinks.classList.toggle('box-shadow');
        });
    }
}

// SOCIAL BUTTONS

function createSocialButtons() {
    const socialButtonContainer = document.querySelector('.social-buttons');
    
    if (!socialButtonContainer) return;
    
    SOCIALS.forEach(social => {
        const button = document.createElement('button');
        button.classList.add('social-btn', 'box-shadow');
        button.innerHTML = `<img src="img/logo/${social.name}.png" class="logo" alt="${social.name}"/>`;
        button.addEventListener('click', () => {
            window.open(social.url, '_blank');
        });
        socialButtonContainer.appendChild(button);
    });
}

// DARK MODE TOGGLE

function initializeDarkModeToggle() {
    const colorModeButton = document.querySelector('#colorMode, .color-mode, [data-color-mode]');
    
    if (!colorModeButton) return;
    
    colorModeButton.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    const elements = {
        body: document.body,
        skillsSection: document.querySelector('.skills-section'),
        wave1: document.querySelector('#wave1'),
        wave2: document.querySelector('#wave2'),
        svg1: document.querySelector('.svg1'),
        svg2: document.querySelector('.svg2')
    };
    
    const currentDarkMode = document.body.style.getPropertyValue("--dark-mode") - 0;
    const isDarkMode = Boolean(currentDarkMode);
    
    elements.body.style.setProperty("--dark-mode", 1 - currentDarkMode);
    
    elements.body.style.color = isDarkMode ? 'black' : 'white';
    elements.body.style.background = isDarkMode 
        ? 'linear-gradient(0deg, #94bbff, #fff)' 
        : 'linear-gradient(0deg, #777272, #000)';
    
    if (elements.skillsSection) {
        elements.skillsSection.style.backgroundColor = isDarkMode ? 'white' : 'black';
    }
    
    if (elements.svg1) {
        elements.svg1.style.fill = isDarkMode ? 'white' : 'black';
    }
    
    if (elements.wave2) {
        elements.wave2.style.backgroundColor = isDarkMode ? 'white' : 'black';
    }
    
    if (elements.svg2) {
        elements.svg2.style.fill = isDarkMode ? '#f4f4f4' : 'black';
    }
}

// ENTRANCE ANIMATION

function playEntranceAnimation() {
    const enterElement = document.querySelector('.enter');
    if (!enterElement) return;
    
    for (let i = 20; i >= 0; i--) {
        setTimeout(() => {
            const blurValue = `blur(${i}px)`;
            enterElement.style.backdropFilter = blurValue;
            enterElement.style.WebkitBackdropFilter = blurValue;
        }, 40 * (20 - i));
    }
}

// INITIALIZATION

function initializeApp() {
    initializeMenuToggle();
    createSocialButtons();
    initializeDarkModeToggle();
    playEntranceAnimation();
    
    typeText();
    handleSkillsAnimation();
    
    window.addEventListener('scroll', handleSkillsAnimation);
}

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', initializeApp);

// warning
function showAlert() {
    document.getElementById('alertBox').style.display = 'flex';
}
function hideAlert() {
    document.getElementById('alertBox').style.display = 'none';
}

// time
const fmt = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour12: false, timeZone: 'Asia/Ho_Chi_Minh'
});
setInterval(() => {
    const t = fmt.format(new Date());
    document.querySelectorAll('.auto-time').forEach(e => e.textContent = t);
}, 1000);

  /* ===== MUSIC PLAYER ===== */
  const playlist = [
    'https://files.catbox.moe/s0nyo2.mp4',
    'https://files.catbox.moe/0qymfn.mp3',
    'https://files.catbox.moe/d7xy88.mp3'
  ];

  const audio = document.getElementById('bgMusic');
  let idx = 0;

  audio.src = playlist[idx];
  audio.volume = 0.6;
  audio.autoplay = true;

  audio.addEventListener('ended', () => {
    idx = (idx + 1) % playlist.length;
    audio.src = playlist[idx];
    audio.play();
  });

  /* Autoplay fallback on first gesture */
  const resume = () => {
    if (audio.paused) audio.play().catch(() => {});
    window.removeEventListener('click', resume);
    window.removeEventListener('touchstart', resume);
  };
  window.addEventListener('click', resume);
  window.addEventListener('touchstart', resume);