import lottie from 'lottie-web';
import confetti from 'canvas-confetti';

// App State
const state = {
  currentStep: 0, // 0 is Gift Opening Landing
  maxSteps: 17,
  rambutanNoCount: 0,
  protestEmojiChosen: false,
  apologyChoice: null, // 'sorry' or 'noworry'
  collegeChoice: null // 'no' or 'yupp'
};

// DOM Cache
const appViewport = document.getElementById('appViewport');
const appHeader = document.getElementById('appHeader');
const progressBarFill = document.getElementById('progressBarFill');
const stepIndicator = document.getElementById('stepIndicator');
const bgDecorations = document.getElementById('bgDecorations');
const emojiRainOverlay = document.getElementById('emojiRainOverlay');

// Initialize Floating Background Hearts
function initFloatingDecorations() {
  bgDecorations.innerHTML = '';
  const hearts = ['🩵', '✨', '💛', '🌸', '🎁', '💫'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${6 + Math.random() * 6}s`;
    el.style.animationDelay = `${Math.random() * 5}s`;
    el.style.fontSize = `${16 + Math.random() * 16}px`;
    bgDecorations.appendChild(el);
  }
}

// Update Header Progress
function updateHeader() {
  if (state.currentStep <= 1) {
    appHeader.style.display = 'none';
  } else {
    appHeader.style.display = 'block';
    const percent = Math.min(100, Math.round((state.currentStep / state.maxSteps) * 100));
    progressBarFill.style.width = `${percent}%`;
    stepIndicator.innerText = `${state.currentStep}/${state.maxSteps}`;
  }
}

// Helper to load Lottie animation safely
function loadLottieAnimation(container, path, loop = true, autoplay = true) {
  if (!container) return;
  container.innerHTML = '';
  return lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: loop,
    autoplay: autoplay,
    path: path
  });
}

// Helper to safely autostart all video elements
function safeAutoplay(videoEl) {
  if (!videoEl) return;
  videoEl.muted = false;
  videoEl.play().catch(err => {
    console.warn("Autoplay unmuted blocked, falling back to muted autoplay:", err);
    videoEl.muted = true;
    videoEl.play();
  });
}

// Emoji Rain Trigger for 🙄 Prank
function triggerEmojiRain(callback) {
  emojiRainOverlay.style.display = 'block';
  emojiRainOverlay.innerHTML = '';
  const emojiCount = 40;
  for (let i = 0; i < emojiCount; i++) {
    const el = document.createElement('div');
    el.className = 'falling-emoji';
    el.innerText = '🙄';
    el.style.left = `${Math.random() * 95}%`;
    el.style.animationDuration = `${1 + Math.random() * 1.5}s`;
    el.style.animationDelay = `${Math.random() * 0.8}s`;
    emojiRainOverlay.appendChild(el);
  }

  setTimeout(() => {
    emojiRainOverlay.style.display = 'none';
    emojiRainOverlay.innerHTML = '';
    if (callback) callback();
  }, 2200);
}

// Render Engine based on state.currentStep
function render() {
  updateHeader();
  window.scrollTo(0, 0);
  if (appViewport) appViewport.scrollTop = 0;

  switch (state.currentStep) {
    case 0:
      renderStep0_GiftOpening();
      break;
    case 1:
      renderStep1_IntroVideo();
      break;
    case 2:
      renderStep2_TeddyBear();
      break;
    case 3:
      renderStep3_TulipFlower();
      break;
    case 4:
      renderStep4_BestVideo();
      break;
    case 5:
      renderStep5_RambutanFood();
      break;
    case 6:
      renderStep6_PeriodProtest();
      break;
    case 7:
      renderStep7_SmileAttitude();
      break;
    case 8:
      renderStep8_EyesNautanki();
      break;
    case 9:
      renderStep9_RequestedPicAndShrink();
      break;
    case 10:
      renderStep10_CollegeSupport();
      break;
    case 11:
      renderStep11_NameAce();
      break;
    case 12:
      renderStep12_TeethSmile();
      break;
    case 13:
      renderStep13_BeachCollage();
      break;
    case 14:
      renderStep14_ShirtComplement();
      break;
    case 15:
      renderStep15_ApologyVideo();
      break;
    case 16:
      renderStep16_NewHairStyle();
      break;
    case 17:
      renderStep17_GrandFinale();
      break;
    default:
      renderStep17_GrandFinale();
  }
}

/* ==========================================================================
   STEP 0: GIFT OPENING LANDING (Stays closed at frame 0, opens on click)
   ========================================================================== */
function renderStep0_GiftOpening() {
  appViewport.innerHTML = `
    <div class="page-card" style="cursor: pointer;" id="giftCard">
      <h1 class="sky-title" style="font-size: 26px;">A Special Gift For My NAUTANKI 🎁🩵</h1>
      <div class="lottie-container" id="giftLottie" style="width: 270px; height: 270px;"></div>
      <p class="sky-subtitle" id="giftPromptText" style="font-size: 20px; font-weight: bold; animation: btnPulse 1.8s infinite;">Click it to open! ✨</p>
    </div>
  `;

  const giftLottieContainer = document.getElementById('giftLottie');
  const giftPromptText = document.getElementById('giftPromptText');

  // Load opening animation paused on frame 0 (Closed state)
  const anim = lottie.loadAnimation({
    container: giftLottieContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './animations/gift.json'
  });

  anim.addEventListener('DOMLoaded', () => {
    anim.goToAndStop(0, true);
  });

  const giftCard = document.getElementById('giftCard');
  let isOpening = false;

  giftCard.addEventListener('click', () => {
    if (isOpening) return;
    isOpening = true;

    giftPromptText.innerText = "Opening your gift... 🎁✨";

    // Play full opening animation upon tap!
    anim.play();

    const goToVideo = () => {
      if (state.currentStep === 0) {
        state.currentStep = 1;
        render();
      }
    };

    anim.addEventListener('complete', goToVideo);

    // Safety timeout fallback
    setTimeout(goToVideo, 4200);
  });
}

/* ==========================================================================
   STEP 1: INTRO VIDEO (Autostarts cleanly directly after gift opening)
   ========================================================================== */
function renderStep1_IntroVideo() {
  appViewport.innerHTML = `
    <div class="intro-video-container" id="introVideoContainer">
      <video class="fullscreen-video" id="introVideo" playsinline webkit-playsinline autoplay preload="auto">
        <source src="./make_this_same_teddy_bear_say.mp4" type="video/mp4">
        Your browser does not support video.
      </video>
    </div>
  `;

  const video = document.getElementById('introVideo');
  safeAutoplay(video);

  video.addEventListener('ended', () => {
    state.currentStep = 2;
    render();
  });
}

/* ==========================================================================
   STEP 2: FAV TEDDY BEAR (Text first, 1s delay then image)
   ========================================================================== */
function renderStep2_TeddyBear() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">as you see we started with your fav teddy bear</h2>
      <div id="imageHolder" style="width: 100%; min-height: 260px; display: flex; justify-content: center; align-items: center;"></div>
      <button class="sky-btn" id="continueBtn" style="display: none;">Continue ➔</button>
    </div>
  `;

  const imageHolder = document.getElementById('imageHolder');
  const continueBtn = document.getElementById('continueBtn');

  setTimeout(() => {
    if (imageHolder) {
      imageHolder.innerHTML = `
        <img class="app-image" src="./9f4113c7-09d9-43e8-abb7-0fdd2e20625b.jpg" alt="Fav Teddy Bear">
      `;
      continueBtn.style.display = 'inline-flex';
    }
  }, 1000);

  continueBtn.addEventListener('click', () => {
    state.currentStep = 3;
    render();
  });
}

/* ==========================================================================
   STEP 3: FAV FLOWER TULIP (Text first, 1s delay then image)
   ========================================================================== */
function renderStep3_TulipFlower() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">I remember till now your fav flower is tulip 🌷</h2>
      <p class="sky-subtitle">I have this wallpaper of my lockscreen for just sake of friendship</p>
      <div id="imageHolder" style="width: 100%; min-height: 260px; display: flex; justify-content: center; align-items: center;"></div>
      <button class="sky-btn" id="continueBtn" style="display: none;">Continue ➔</button>
    </div>
  `;

  const imageHolder = document.getElementById('imageHolder');
  const continueBtn = document.getElementById('continueBtn');

  setTimeout(() => {
    if (imageHolder) {
      imageHolder.innerHTML = `
        <img class="app-image" src="./d09bf15d-86a5-4921-aab8-6f02ffe7213c.jpg" alt="Tulip Flower Lockscreen">
      `;
      continueBtn.style.display = 'inline-flex';
    }
  }, 1000);

  continueBtn.addEventListener('click', () => {
    state.currentStep = 4;
    render();
  });
}

/* ==========================================================================
   STEP 4: BEST VIDEO (Autostarts + controls)
   ========================================================================== */
function renderStep4_BestVideo() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">you know I like the best video of your which is this see 🎥</h2>
      <div class="app-video-wrapper">
        <video class="app-video" id="step4Video" controls playsinline autoplay preload="auto">
          <source src="./399186a5-86bd-49d5-b149-b11b8e8a062c.mp4" type="video/mp4">
          Your browser does not support video.
        </video>
      </div>
      <p class="sky-subtitle">I see your efforts and I smile everytime i watch this video of yours 😊</p>
      <button class="sky-btn" id="continueBtn">Continue ➔</button>
    </div>
  `;

  const video = document.getElementById('step4Video');
  safeAutoplay(video);

  document.getElementById('continueBtn').addEventListener('click', () => {
    state.currentStep = 5;
    render();
  });
}

/* ==========================================================================
   STEP 5: FAV FRUIT & RAMBUTAN PRANK
   ========================================================================== */
function renderStep5_RambutanFood() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">i know still about your fav fruit this one nah ? 🍇</h2>
      <img class="app-image" src="./b271ff12-d665-401d-b35a-a211a99544e1.jpg" alt="Fav Fruit">
      <p class="sky-text">it's name is ..........</p>
      <p class="sky-subtitle">honestly i searched it for , sorry i think i am getting the love affection of yours which make me forgot things easily , it's Rambutan right ? 🍓</p>
      
      <!-- Prank feedback container -->
      <div id="prankFeedback" style="display: none; flex-direction: column; align-items: center; gap: 8px;">
        <div class="lottie-container" id="laughingCatLottie"></div>
        <p class="sky-title" style="color: #E11D48; font-size: 18px;">i know you are kidding NAUTANKI 😹</p>
      </div>

      <!-- Resizing buttons -->
      <div class="prank-btn-container" id="prankBtnContainer">
        <button class="sky-btn" id="yesBtn">Yes! 💖</button>
        <button class="sky-btn sky-btn-secondary" id="noBtn">No 😜</button>
      </div>
    </div>
  `;

  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const prankFeedback = document.getElementById('prankFeedback');
  const lottieContainer = document.getElementById('laughingCatLottie');

  noBtn.addEventListener('click', () => {
    state.rambutanNoCount++;
    prankFeedback.style.display = 'flex';
    loadLottieAnimation(lottieContainer, './animations/Cat laughing loudly. HahahahLOL emojisticker animation.json');

    const yesScale = 1 + state.rambutanNoCount * 0.35;
    const noScale = Math.max(0.35, 1 - state.rambutanNoCount * 0.2);

    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.fontSize = `${16 + state.rambutanNoCount * 3}px`;
    yesBtn.style.padding = `${14 + state.rambutanNoCount * 4}px ${28 + state.rambutanNoCount * 6}px`;
    
    noBtn.style.transform = `scale(${noScale})`;
    if (noScale <= 0.4) {
      noBtn.style.opacity = '0.5';
    }
  });

  yesBtn.addEventListener('click', () => {
    state.currentStep = 6;
    render();
  });
}

/* ==========================================================================
   STEP 6: PERIOD CRAMPS PROTEST (Includes image 4032670b + corrected text)
   ========================================================================== */
function renderStep6_PeriodProtest() {
  if (state.protestEmojiChosen) {
    appViewport.innerHTML = `
      <div class="page-card">
        <h2 class="sky-title">dude see i am gonna join protest 📢</h2>
        <img class="app-image" src="./4032670b-1806-45c3-b338-2b764c3f6107.jpg" alt="Protest Image">
        <p class="sky-subtitle">you remember i told you once</p>
        <p class="sky-text" style="font-weight: 700;">The protest against the periods cramp it is too much for my NAUTANKI , I can't see you in pain but if it's continue then I AM HERE FOR YOU DUDE don't worry !!!! 🩵💪</p>
        <div class="btn-container" style="flex-direction: column; gap: 10px;">
          <button class="sky-btn" id="appreciatedBtn">Appreciated 💓</button>
          <p class="sky-text" style="font-weight: 700; font-size: 16px;">now choose this one 👇</p>
        </div>
      </div>
    `;

    document.getElementById('appreciatedBtn').addEventListener('click', () => {
      state.currentStep = 7;
      render();
    });

  } else {
    appViewport.innerHTML = `
      <div class="page-card">
        <h2 class="sky-title">dude see i am gonna join protest 📢</h2>
        <img class="app-image" src="./4032670b-1806-45c3-b338-2b764c3f6107.jpg" alt="Protest Image">
        <p class="sky-subtitle">you remember i told you once</p>
        <p class="sky-text" style="font-weight: 700;">The protest against the periods cramp it is too much for my NAUTANKI , I can't see you in pain but if it's continue then I AM HERE FOR YOU DUDE don't worry !!!! 🩵💪</p>
        <div class="btn-container" style="flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 12px; justify-content: center; align-items: center;">
            <button class="sky-btn" id="appreciatedBtn">Appreciated 💓</button>
            <button class="sky-btn sky-btn-secondary" id="eyeRollBtn" style="font-size: 20px; transition: all 0.3s ease;">🙄</button>
          </div>
          <p class="sky-text" id="chooseEmojiPrompt" style="display: none; font-weight: 700; font-size: 16px; color: #E11D48; margin-top: 4px;">please choose 🙄 😜</p>
        </div>
      </div>
    `;

    const appreciatedBtn = document.getElementById('appreciatedBtn');
    const eyeRollBtn = document.getElementById('eyeRollBtn');
    const chooseEmojiPrompt = document.getElementById('chooseEmojiPrompt');

    appreciatedBtn.addEventListener('click', () => {
      chooseEmojiPrompt.style.display = 'block';
      eyeRollBtn.style.transform = 'scale(1.3)';
      eyeRollBtn.style.borderColor = '#E11D48';
      setTimeout(() => {
        eyeRollBtn.style.transform = 'scale(1)';
        eyeRollBtn.style.borderColor = 'var(--text-sky-blue)';
      }, 700);
    });

    eyeRollBtn.addEventListener('click', () => {
      triggerEmojiRain(() => {
        renderStep6_AttitudePage();
      });
    });
  }
}

function renderStep6_AttitudePage() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">I know it's your fav emoji and i like this attitude see 😏</h2>
      <img class="app-image" src="./589ee1af-c2ab-4c2e-9f6a-7d305db1ecb7.jpg" alt="Fav Emoji Attitude">
      <p class="sky-subtitle">just like this one</p>
      <button class="sky-btn" id="nextRestrictionBtn">Continue ➔</button>
    </div>
  `;

  document.getElementById('nextRestrictionBtn').addEventListener('click', () => {
    renderStep6_RestrictionPage();
  });
}

function renderStep6_RestrictionPage() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title" style="font-size: 28px;">butttttttttt you can't choose 🙄 this for now 😜</h2>
      <button class="sky-btn" id="backToProtestBtn">Go Back & Choose ➔</button>
    </div>
  `;

  document.getElementById('backToProtestBtn').addEventListener('click', () => {
    state.protestEmojiChosen = true;
    renderStep6_PeriodProtest();
  });
}

/* ==========================================================================
   STEP 7: SMILE & ATTITUDE
   ========================================================================== */
function renderStep7_SmileAttitude() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">Other than your attitude</h2>
      <p class="sky-subtitle" id="smileText" style="display: none; font-size: 22px; font-weight: bold;">I like your smile 😊</p>
      <div id="imageHolder" style="width: 100%; min-height: 260px; display: flex; justify-content: center; align-items: center;"></div>
      <button class="sky-btn" id="continueBtn" style="display: none;">Continue ➔</button>
    </div>
  `;

  const smileText = document.getElementById('smileText');
  const imageHolder = document.getElementById('imageHolder');
  const continueBtn = document.getElementById('continueBtn');

  setTimeout(() => {
    if (smileText) smileText.style.display = 'block';
  }, 600);

  setTimeout(() => {
    if (imageHolder) {
      imageHolder.innerHTML = `
        <img class="app-image" src="./2fc1c577-1eef-48eb-a292-a62913556fa8.jpg" alt="Your Smile">
      `;
      continueBtn.style.display = 'inline-flex';
    }
  }, 1200);

  continueBtn.addEventListener('click', () => {
    state.currentStep = 8;
    render();
  });
}

/* ==========================================================================
   STEP 8: EYES & NAUTANKI
   ========================================================================== */
function renderStep8_EyesNautanki() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">And Just like your smile</h2>
      <p class="sky-subtitle" style="font-size: 20px;">I like your eyes too 👀</p>
      <p class="sky-title" style="font-size: 24px; color: var(--text-sky-dark);">NAUTANKIIIIIIIIIIII 😜</p>
      <img class="app-image" src="./772bab60-111f-4b71-b534-bf4c246770fc.jpg" alt="Your Eyes">
      <button class="sky-btn" id="reallyBtn">Really ? 🙄</button>
    </div>
  `;

  document.getElementById('reallyBtn').addEventListener('click', () => {
    state.currentStep = 9;
    render();
  });
}

/* ==========================================================================
   STEP 9: REQUESTED PIC & SHRINKING "AND ?" ANIMATION
   ========================================================================== */
function renderStep9_RequestedPicAndShrink() {
  renderStep9_PhaseA();
}

function renderStep9_PhaseA() {
  appViewport.innerHTML = `
    <div class="page-card">
      <img class="app-image" src="./c3eda6fe-e9fd-4a79-b131-be44d3bcea90.jpg" alt="Requested Picture">
      <p class="sky-subtitle">See , That's why I requested this from you 😉</p>
      <button class="sky-btn" id="andBtn" style="font-size: 20px;">And ? 🤔</button>
    </div>
  `;

  document.getElementById('andBtn').addEventListener('click', () => {
    renderStep9_PhaseB();
  });
}

function renderStep9_PhaseB() {
  appViewport.innerHTML = `
    <div class="page-card">
      <div class="shrinking-text">And ?</div>
      <p class="sky-subtitle" style="font-size: 18px; font-weight: bold;">And i still remember your interview day 🎓</p>
      <img class="app-image" src="./c134c1a4-ca27-4042-b450-f0d1b1066eac.jpg" alt="Interview Day">
      <p class="sky-text">I hope your college going good so far 🏫</p>
      <div class="btn-container">
        <button class="sky-btn sky-btn-secondary" id="noCollegeBtn">No it's not 😤😥</button>
        <button class="sky-btn" id="yuppCollegeBtn">Yupp 😉</button>
      </div>
    </div>
  `;

  document.getElementById('noCollegeBtn').addEventListener('click', () => {
    state.collegeChoice = 'no';
    state.currentStep = 10;
    render();
  });

  document.getElementById('yuppCollegeBtn').addEventListener('click', () => {
    state.collegeChoice = 'yupp';
    state.currentStep = 10;
    render();
  });
}

/* ==========================================================================
   STEP 10: COLLEGE SUPPORT (Autostarts video + controls)
   ========================================================================== */
function renderStep10_CollegeSupport() {
  const isNo = state.collegeChoice === 'no';
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">${isNo ? "I know it is too stressful and I understand so but don't worry 🫂" : "I know you will manage it as you are strong NAUTANKI and you are doing it very well 💪✨"}</h2>
      ${isNo ? '<p class="sky-subtitle" style="font-size: 20px; font-weight: bold;">You have a friend 💓 (ACE)</p>' : ''}
      <div class="app-video-wrapper">
        <video class="app-video" id="step10Video" controls playsinline autoplay preload="auto">
          <source src="./07bb1334-fd4c-455e-b008-1c67cc9d03ff.mp4" type="video/mp4">
          Your browser does not support video.
        </video>
      </div>
      <p class="sky-subtitle">${isNo ? "Tell me , we will manage it toghter , don't feel shy or shameful 🩵" : "And don't forgot you have a friend too !! , I wanna hear about your college gossips 🗣️😁"}</p>
      ${!isNo ? '<p class="sky-title" style="font-size: 22px;">HAHAHAHAHAHAHA 😂</p>' : ''}
      <button class="sky-btn" id="awwBtn">Awww !! 🩵</button>
    </div>
  `;

  const video = document.getElementById('step10Video');
  safeAutoplay(video);

  document.getElementById('awwBtn').addEventListener('click', () => {
    state.currentStep = 11;
    render();
  });
}

/* ==========================================================================
   STEP 11: NAME ACE
   ========================================================================== */
function renderStep11_NameAce() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">You know you gave me name 'ACE' your first men ✨</h2>
      <p class="sky-subtitle">I am used to it now 💫</p>
      <p class="sky-text" style="font-weight: 700;">you know it is perfect for me as ACE are strongest too and so I am 😏⚡</p>
      <img class="app-image" src="./90b69502-da6a-47a1-8629-566bab3f18a8.jpg" alt="ACE Image">
      <p class="sky-subtitle">and dude I am happy that you have me 🤝🩵</p>
      <div class="lottie-container" id="aceCatLottie"></div>
      <button class="sky-btn" id="continueBtn">Continue ➔</button>
    </div>
  `;

  loadLottieAnimation(document.getElementById('aceCatLottie'), './animations/Cat laughing loudly. HahahahLOL emojisticker animation.json');

  document.getElementById('continueBtn').addEventListener('click', () => {
    state.currentStep = 12;
    render();
  });
}

/* ==========================================================================
   STEP 12: TEETH SMILE & THANKS
   ========================================================================== */
function renderStep12_TeethSmile() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">dude i still remember that you said not once</h2>
      <p class="sky-subtitle" style="font-size: 20px; font-weight: bold;">But many times that you like me 'SMILE' with teeths 😁</p>
      <img class="app-image" src="./a49ea34e-1697-4ec8-a77d-24807fd7d86b.jpg" alt="Teeth Smile">
      <p class="sky-text">And that's make smile everytime throughout the day making me healthy and it remind me of my cute friend Wenna Mae 🌸</p>
      <h3 class="sky-title" style="font-size: 24px;">THANKS FOR THAT ! 🙏🩵</h3>
      <button class="sky-btn" id="welcomeBtn">Your are Welcome ! 🩵</button>
    </div>
  `;

  document.getElementById('welcomeBtn').addEventListener('click', () => {
    state.currentStep = 13;
    render();
  });
}

/* ==========================================================================
   STEP 13: BEACH CUTE PICS COLLAGE
   ========================================================================== */
function renderStep13_BeachCollage() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">as you make me smile i remebered the beach cute pics of yours and here they are 🏖️🌊</h2>
      <div class="collage-container">
        <img class="collage-photo-1" src="./3af26d29-fcd7-47e7-8852-996d1d578949.jpg" alt="Beach Photo 1">
        <img class="collage-photo-2" src="./9a0ecfbf-ff3b-456c-983f-12c50b6085fc.jpg" alt="Beach Photo 2">
      </div>
      <button class="sky-btn" id="lovelyBtn">Lovely moment 💓</button>
    </div>
  `;

  document.getElementById('lovelyBtn').addEventListener('click', () => {
    state.currentStep = 14;
    render();
  });
}

/* ==========================================================================
   STEP 14: SHIRT COMPLEMENT
   ========================================================================== */
function renderStep14_ShirtComplement() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">See how beautiful you looking in this shirt 👔✨</h2>
      <img class="app-image" src="./a3dd19ac-a7d2-4068-9496-9ded0adac89a.jpg" alt="Shirt Photo">
      <p class="sky-subtitle">Just like this made only for you !! 💖</p>
      <button class="sky-btn" id="nextShirtBtn" style="font-size: 24px; padding: 12px 32px;">🔜</button>
    </div>
  `;

  document.getElementById('nextShirtBtn').addEventListener('click', () => {
    state.currentStep = 15;
    render();
  });
}

/* ==========================================================================
   STEP 15: APOLOGY VIDEO & BRANCHING (Autostarts video + controls)
   ========================================================================== */
function renderStep15_ApologyVideo() {
  if (state.apologyChoice === 'nosorry') {
    appViewport.innerHTML = `
      <div class="page-card">
        <h2 class="sky-title" style="font-size: 26px;">I will madam Nautanki 🫡🧸</h2>
        <div class="lottie-container" id="teddyApologyLottie"></div>
        <button class="sky-btn" id="continueApologyBtn">Continue ➔</button>
      </div>
    `;
    loadLottieAnimation(document.getElementById('teddyApologyLottie'), './animations/Teddy Bear.json');

    document.getElementById('continueApologyBtn').addEventListener('click', () => {
      state.currentStep = 16;
      render();
    });

  } else if (state.apologyChoice === 'noworry') {
    appViewport.innerHTML = `
      <div class="page-card">
        <h2 class="sky-title" style="font-size: 26px;">Ohw That's how sweet you are ! 🥹🧸</h2>
        <div class="lottie-container" id="teddyApologyLottie"></div>
        <button class="sky-btn" id="continueApologyBtn">Continue ➔</button>
      </div>
    `;
    loadLottieAnimation(document.getElementById('teddyApologyLottie'), './animations/Teddy Bear.json');

    document.getElementById('continueApologyBtn').addEventListener('click', () => {
      state.currentStep = 16;
      render();
    });

  } else {
    appViewport.innerHTML = `
      <div class="page-card">
        <h2 class="sky-title">Humble sorry 😥😔😔</h2>
        <p class="sky-subtitle">I requested a video from you and i not editted and completed it</p>
        <div class="app-video-wrapper">
          <video class="app-video" id="apologyVideo" controls playsinline autoplay preload="auto">
            <source src="./7696c2a4-f1ce-4de2-885d-90c9a8fd5720.mp4" type="video/mp4">
            Your browser does not support video.
          </video>
        </div>
        <p class="sky-subtitle">Once again sorry 🙏</p>
        <div class="btn-container" style="flex-direction: column; gap: 10px;">
          <button class="sky-btn sky-btn-secondary" id="noSorryBtn">No Sorry make the video and sent me ! 😤</button>
          <button class="sky-btn" id="noWorryBtn">No worry ! 😊</button>
        </div>
      </div>
    `;

    const video = document.getElementById('apologyVideo');
    safeAutoplay(video);

    document.getElementById('noSorryBtn').addEventListener('click', () => {
      state.apologyChoice = 'nosorry';
      renderStep15_ApologyVideo();
    });

    document.getElementById('noWorryBtn').addEventListener('click', () => {
      state.apologyChoice = 'noworry';
      renderStep15_ApologyVideo();
    });
  }
}

/* ==========================================================================
   STEP 16: NEW HAIR STYLE (Autostarts video + controls)
   ========================================================================== */
function renderStep16_NewHairStyle() {
  appViewport.innerHTML = `
    <div class="page-card">
      <h2 class="sky-title">How I can forgot your new hair style Nautanki !! 💇‍♀️✨</h2>
      <p class="sky-subtitle">It's beautiful and matching on you ! 😍</p>
      <div class="app-video-wrapper">
        <video class="app-video" id="hairVideo" controls playsinline autoplay preload="auto">
          <source src="./ec9d0f2c-f547-4afb-afc6-6a950d45031c.mp4" type="video/mp4">
          Your browser does not support video.
        </video>
      </div>
      <button class="sky-btn" id="thanksAceBtn">Thanks Ace 🩵</button>
    </div>
  `;

  const video = document.getElementById('hairVideo');
  safeAutoplay(video);

  document.getElementById('thanksAceBtn').addEventListener('click', () => {
    state.currentStep = 17;
    render();
  });
}

/* ==========================================================================
   STEP 17: GRAND FINALE (Autostarts whole page video + Friendship Message)
   ========================================================================== */
function renderStep17_GrandFinale() {
  appViewport.innerHTML = `
    <div class="intro-video-container" id="finaleContainer">
      <video class="fullscreen-video" id="goodVideo" playsinline webkit-playsinline controls autoplay preload="auto">
        <source src="./good.mp4" type="video/mp4">
        Your browser does not support video.
      </video>
    </div>
  `;

  const video = document.getElementById('goodVideo');
  const container = document.getElementById('finaleContainer');

  safeAutoplay(video);

  video.addEventListener('ended', () => {
    showFinalMessageScreen(container);
  });
}

function showFinalMessageScreen(container) {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });

  container.innerHTML = `
    <div class="page-card" style="background: var(--bg-yellow); z-index: 150; padding: 24px;">
      <div class="lottie-container" id="birdLoveLottie"></div>
      <h1 class="sky-title" style="font-size: 30px; font-family: var(--font-heading); color: var(--text-sky-dark);">
        A Happy Friendship Day message for my NAUTANKI !! 🩵🎉
      </h1>
      <p class="sky-subtitle" style="font-size: 18px; line-height: 1.6;">
        Thank you for being such an amazing, funny, and supportive friend! From gossips to smiles, ACE will always be here for you dude! 🤝✨
      </p>
      <button class="sky-btn" id="replayBtn" style="margin-top: 16px;">Replay Memory Lane 🔁</button>
    </div>
  `;

  loadLottieAnimation(document.getElementById('birdLoveLottie'), './animations/Bird pair love and flying sky.json');

  document.getElementById('replayBtn').addEventListener('click', () => {
    state.currentStep = 0;
    state.rambutanNoCount = 0;
    state.protestEmojiChosen = false;
    state.apologyChoice = null;
    state.collegeChoice = null;
    render();
  });
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initFloatingDecorations();
  render();
});
