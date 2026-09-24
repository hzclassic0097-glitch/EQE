/**
 * E Quran EduHub - Main Interactive Logic
 * Modern, Animated Islamic Education & Academics Platform
 * Contact: 0300 1776166 (+92 300 1776166)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons initialization
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initNavbar();
  initFeeCalculator();
  initCourseFilters();
  initCommunityTabs();
  initAudioDemo();
  initCountrySearchableDropdown();
  initBookingModal();
  initFaqAccordion();
});

/* ============================================================
   1. NAVBAR & MOBILE DRAWER
   ============================================================ */
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    };

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // Header scroll shadow effect
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-[0_12px_30px_-5px_rgba(7,87,91,0.1)]', 'bg-white/98');
      navbar.classList.remove('bg-white/92');
    } else {
      navbar.classList.remove('shadow-[0_12px_30px_-5px_rgba(7,87,91,0.1)]', 'bg-white/98');
      navbar.classList.add('bg-white/92');
    }
  });
}

/* ============================================================
   2. INTERACTIVE MULTI-COUNTRY FEE CALCULATOR
   ============================================================ */
const feeData = {
  pk: {
    currency: 'PKR',
    symbol: 'Rs.',
    name: 'Pakistan',
    flag: '🇵🇰',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 3000, '4': 4000, '5': 4500, 'daily': 6500 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 4000, '4': 4800, '5': 5500, 'daily': 7500 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 4500, '4': 5500, '5': 6000, 'daily': 8500 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 3000, '4': 3800, '5': 4500, 'daily': 6000 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 4200, '4': 4800, '5': 5000, 'daily': 7500 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 4800, '4': 5400, '5': 6000, 'daily': 8500 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 3500, '4': 4500, '5': 5500, 'daily': 8000 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 4500, '4': 5500, '5': 6500, 'daily': 9000 },
      'academic': { name: 'Academic Tutoring (O/A Level, Matric)', '2-3': 4000, '4': 5000, '5': 6000, 'daily': 9000 }
    }
  },
  sa: {
    currency: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 110, '4': 140, '5': 170, 'daily': 250 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 130, '4': 150, '5': 190, 'daily': 280 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 140, '4': 160, '5': 200, 'daily': 300 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 110, '4': 135, '5': 170, 'daily': 250 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 130, '4': 150, '5': 190, 'daily': 290 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 140, '4': 165, '5': 200, 'daily': 320 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 130, '4': 160, '5': 200, 'daily': 300 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 140, '4': 170, '5': 220, 'daily': 330 },
      'academic': { name: 'Academic Tutoring', '2-3': 135, '4': 165, '5': 210, 'daily': 310 }
    }
  },
  ae: {
    currency: 'AED',
    symbol: 'AED',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 100, '4': 140, '5': 170, 'daily': 240 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 125, '4': 155, '5': 185, 'daily': 270 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 135, '4': 160, '5': 190, 'daily': 290 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 100, '4': 130, '5': 165, 'daily': 240 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 125, '4': 150, '5': 180, 'daily': 270 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 130, '4': 160, '5': 190, 'daily': 300 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 125, '4': 155, '5': 195, 'daily': 290 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 135, '4': 165, '5': 215, 'daily': 320 },
      'academic': { name: 'Academic Tutoring', '2-3': 130, '4': 160, '5': 205, 'daily': 300 }
    }
  },
  us: {
    currency: 'USD',
    symbol: '$',
    name: 'United States & Global',
    flag: '🇺🇸',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 30, '4': 45, '5': 65, 'daily': 110 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 40, '4': 55, '5': 75, 'daily': 125 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 45, '4': 60, '5': 60, 'daily': 140 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 30, '4': 45, '5': 60, 'daily': 105 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 38, '4': 50, '5': 50, 'daily': 120 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 45, '4': 60, '5': 75, 'daily': 135 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 40, '4': 60, '5': 80, 'daily': 140 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 45, '4': 65, '5': 90, 'daily': 150 },
      'academic': { name: 'Academic Tutoring', '2-3': 40, '4': 60, '5': 85, 'daily': 145 }
    }
  },
  uk: {
    currency: 'GBP',
    symbol: '£',
    name: 'United Kingdom',
    flag: '🇬🇧',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 25, '4': 38, '5': 55, 'daily': 90 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 32, '4': 45, '5': 65, 'daily': 105 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 38, '4': 50, '5': 70, 'daily': 115 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 25, '4': 38, '5': 50, 'daily': 85 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 32, '4': 42, '5': 58, 'daily': 100 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 36, '4': 48, '5': 65, 'daily': 110 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 32, '4': 48, '5': 65, 'daily': 110 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 36, '4': 52, '5': 72, 'daily': 120 },
      'academic': { name: 'Academic Tutoring', '2-3': 35, '4': 50, '5': 68, 'daily': 115 }
    }
  },
  ca: {
    currency: 'CAD',
    symbol: 'C$',
    name: 'Canada',
    flag: '🇨🇦',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 40, '4': 60, '5': 85, 'daily': 145 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 50, '4': 72, '5': 98, 'daily': 165 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 60, '4': 80, '5': 105, 'daily': 180 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 40, '4': 60, '5': 80, 'daily': 135 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 48, '4': 65, '5': 88, 'daily': 155 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 55, '4': 78, '5': 100, 'daily': 175 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 50, '4': 75, '5': 100, 'daily': 175 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 55, '4': 85, '5': 115, 'daily': 190 },
      'academic': { name: 'Academic Tutoring', '2-3': 52, '4': 78, '5': 105, 'daily': 180 }
    }
  },
  qa: {
    currency: 'QAR',
    symbol: 'QAR',
    name: 'Qatar & Gulf',
    flag: '🇶🇦',
    plans: {
      'nazra': { name: 'Nazra Quran', '2-3': 110, '4': 140, '5': 170, 'daily': 250 },
      'tajweed': { name: 'Quran with Tajweed', '2-3': 130, '4': 150, '5': 185, 'daily': 275 },
      'hifz': { name: 'Hifz-ul-Quran (Memorization)', '2-3': 140, '4': 165, '5': 195, 'daily': 295 },
      'islamic': { name: 'Basic Islamic Education', '2-3': 110, '4': 135, '5': 170, 'daily': 250 },
      'nazra-tajweed': { name: 'Nazra + Tajweed Mastery', '2-3': 130, '4': 150, '5': 185, 'daily': 280 },
      'complete': { name: 'Complete Quran & Deen Program', '2-3': 135, '4': 165, '5': 195, 'daily': 310 },
      'computer': { name: 'Computer Skills & Tech', '2-3': 130, '4': 160, '5': 200, 'daily': 300 },
      'english': { name: 'Spoken English & IELTS Prep', '2-3': 140, '4': 170, '5': 220, 'daily': 330 },
      'academic': { name: 'Academic Tutoring', '2-3': 135, '4': 165, '5': 210, 'daily': 310 }
    }
  }
};

let currentCountry = 'pk';
let currentCourse = 'nazra';
let currentFreq = '2-3';
let siblingDiscount = false;

function initFeeCalculator() {
  const countrySelect = document.getElementById('calcCountry');
  const courseSelect = document.getElementById('calcCourse');
  const freqButtons = document.querySelectorAll('.freq-btn');
  const siblingToggle = document.getElementById('siblingDiscountToggle');
  const bookCalcBtn = document.getElementById('bookFromCalcBtn');

  if (!countrySelect || !courseSelect) return;

  countrySelect.addEventListener('change', (e) => {
    currentCountry = e.target.value;
    updateFeeDisplay();
  });

  courseSelect.addEventListener('change', (e) => {
    currentCourse = e.target.value;
    updateFeeDisplay();
  });

  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-teal-600', 'to-teal-500', 'text-white', 'shadow-md', 'border-teal-500');
        b.classList.add('bg-teal-50/70', 'text-teal-900', 'border-teal-200');
      });
      btn.classList.add('bg-gradient-to-r', 'from-teal-600', 'to-teal-500', 'text-white', 'shadow-md', 'border-teal-500');
      btn.classList.remove('bg-teal-50/70', 'text-teal-900', 'border-teal-200');
      currentFreq = btn.getAttribute('data-freq');
      updateFeeDisplay();
    });
  });

  if (siblingToggle) {
    siblingToggle.addEventListener('change', (e) => {
      siblingDiscount = e.target.checked;
      updateFeeDisplay();
    });
  }

  if (bookCalcBtn) {
    bookCalcBtn.addEventListener('click', () => {
      const countryObj = feeData[currentCountry];
      const courseObj = countryObj.plans[currentCourse];
      const baseFee = courseObj[currentFreq];
      const finalFee = siblingDiscount ? Math.round(baseFee * 0.9) : baseFee;
      
      const freqLabel = {
        '2-3': '2-3 Classes / Week',
        '4': '4 Classes / Week',
        '5': '5 Classes / Week',
        'daily': 'Daily 1-to-1 Intensive'
      }[currentFreq];

      const discountText = siblingDiscount ? ' (with 10% Sibling Discount)' : '';

      const msg = `Assalam-o-Alaikum E Quran EduHub!\n\nI want to enroll for a 3-Day Free Trial:\n• Course: ${courseObj.name}\n• Country: ${countryObj.name} ${countryObj.flag}\n• Schedule: ${freqLabel}\n• Estimated Fee: ${countryObj.symbol} ${finalFee}${discountText} per month\n\nPlease let me know available trial class timing slots. JazakAllah!`;
      
      window.open(`https://wa.me/923001776166?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  updateFeeDisplay();
}

function updateFeeDisplay() {
  const countryObj = feeData[currentCountry] || feeData['pk'];
  const courseObj = countryObj.plans[currentCourse] || countryObj.plans['nazra'];
  const baseFee = courseObj[currentFreq] || courseObj['2-3'];
  const finalFee = siblingDiscount ? Math.round(baseFee * 0.9) : baseFee;

  const displayElem = document.getElementById('calcFeeAmount');
  const currencyElem = document.getElementById('calcCurrencyLabel');
  const originalElem = document.getElementById('calcOriginalAmount');
  const freqLabelElem = document.getElementById('calcFreqDisplay');

  if (displayElem) displayElem.textContent = `${countryObj.symbol} ${finalFee.toLocaleString()}`;
  if (currencyElem) currencyElem.textContent = `per month (${countryObj.currency})`;

  if (originalElem) {
    if (siblingDiscount) {
      originalElem.textContent = `${countryObj.symbol} ${baseFee.toLocaleString()} (10% OFF applied)`;
      originalElem.classList.remove('hidden');
    } else {
      originalElem.classList.add('hidden');
    }
  }

  if (freqLabelElem) {
    const labels = {
      '2-3': '2–3 Classes / Week (Recommended for steady learning)',
      '4': '4 Classes / Week (Accelerated pace)',
      '5': '5 Classes / Week (Comprehensive focus)',
      'daily': 'Daily 1-to-1 Intensive (Dedicated scholar tutor)'
    };
    freqLabelElem.textContent = labels[currentFreq] || '';
  }
}

/* ============================================================
   3. COURSE FILTER TABS
   ============================================================ */
function initCourseFilters() {
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter', 'bg-gradient-to-r', 'from-teal-600', 'to-teal-500', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-teal-800', 'border', 'border-teal-200');
      });
      btn.classList.add('active-filter', 'bg-gradient-to-r', 'from-teal-600', 'to-teal-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-teal-800', 'border', 'border-teal-200');

      const category = btn.getAttribute('data-category');

      courseCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat.includes(category)) {
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================================
   4. COMMUNITY POPULATION TABS
   ============================================================ */
function initCommunityTabs() {
  const tabBtns = document.querySelectorAll('.community-tab-btn');
  const tabContents = document.querySelectorAll('.community-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-teal-600', 'to-teal-500', 'text-white', 'shadow-sm');
        b.classList.add('border-transparent', 'text-slate-600');
      });
      btn.classList.add('bg-gradient-to-r', 'from-teal-600', 'to-teal-500', 'text-white', 'shadow-sm');
      btn.classList.remove('border-transparent', 'text-slate-600');

      const target = btn.getAttribute('data-target');
      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================================
   5. TAJWEED AUDIO RECITATION DEMO (REAL VOICE RECITATION)
   ============================================================ */
const audioTracks = {
  fatiha: {
    title: 'Surah Al-Fatiha (The Opening)',
    reciter: 'Tarteel Recitation by Qari Mishary Alafasy with Tajweed',
    localSrc: 'fatiha.mp3',
    remoteSrc: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3',
    durationEst: '0:52',
    arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ۝ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ۝ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ۝ مَـٰلِكِ يَوْمِ ٱلدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ ۝ صِرَاطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ ۝',
    translation: '“In the Name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense...”'
  },
  ikhlas: {
    title: 'Surah Al-Ikhlas (The Purity of Faith)',
    reciter: 'Tarteel Recitation with Qalqalah & Ghunnah Articulation',
    localSrc: 'ikhlas.mp3',
    remoteSrc: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/112.mp3',
    durationEst: '0:22',
    arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ ۝',
    translation: '“Say, He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.”'
  }
};

let currentTrackKey = 'fatiha';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function initAudioDemo() {
  const audio = document.getElementById('tajweedAudio');
  const playBtn = document.getElementById('playTajweedBtn');
  const replayBtn = document.getElementById('replayTajweedBtn');
  const waveContainer = document.getElementById('audioWaveVisualizer');
  const audioStatus = document.getElementById('audioStatusText');
  const currentTimeEl = document.getElementById('audioCurrentTime');
  const durationEl = document.getElementById('audioDuration');
  const progressBar = document.getElementById('audioProgressBar');
  const progressContainer = document.getElementById('audioProgressBarContainer');
  const trackTabs = document.querySelectorAll('.audio-track-tab');

  if (!audio || !playBtn) return;

  function updatePlayButton(isPlaying) {
    if (isPlaying) {
      playBtn.innerHTML = `
        <i data-lucide="pause" class="w-5 h-5 fill-white"></i>
        <span>Pause Recitation</span>
      `;
      if (waveContainer) waveContainer.classList.add('playing');
      if (audioStatus) audioStatus.textContent = 'Playing authentic Qari voice...';
    } else {
      playBtn.innerHTML = `
        <i data-lucide="play" class="w-5 h-5 fill-white"></i>
        <span>Listen to Voice Recitation</span>
      `;
      if (waveContainer) waveContainer.classList.remove('playing');
      if (audioStatus) audioStatus.textContent = audio.ended ? 'Recitation completed' : 'Paused';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // Play / Pause toggle
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        updatePlayButton(true);
      }).catch(err => {
        console.warn('Playback fallback to remote source:', err);
        const track = audioTracks[currentTrackKey];
        if (track && audio.src !== track.remoteSrc) {
          audio.src = track.remoteSrc;
          audio.play().then(() => updatePlayButton(true)).catch(e => console.error(e));
        }
      });
    } else {
      audio.pause();
      updatePlayButton(false);
    }
  });

  // Replay from beginning
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      audio.currentTime = 0;
      audio.play().then(() => {
        updatePlayButton(true);
      }).catch(e => console.warn(e));
    });
  }

  // Update progress bar & timestamps
  audio.addEventListener('timeupdate', () => {
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (durationEl && !isNaN(audio.duration) && audio.duration > 0) {
      durationEl.textContent = formatTime(audio.duration);
      if (progressBar) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${pct}%`;
      }
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (durationEl && !isNaN(audio.duration) && audio.duration > 0) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    updatePlayButton(false);
    if (progressBar) progressBar.style.width = '100%';
    if (audioStatus) audioStatus.textContent = 'Recitation complete • Click Replay to listen again';
  });

  // Seeking by clicking/touching timeline
  if (progressContainer) {
    const handleSeek = (clientX) => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        const rect = progressContainer.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        audio.currentTime = clickRatio * audio.duration;
      }
    };

    progressContainer.addEventListener('click', (e) => {
      handleSeek(e.clientX);
    });

    progressContainer.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        handleSeek(e.touches[0].clientX);
      }
    }, { passive: true });

    progressContainer.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleSeek(e.touches[0].clientX);
      }
    }, { passive: true });
  }

  // Track switching (Fatiha / Ikhlas)
  trackTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const trackKey = tab.getAttribute('data-track');
      if (trackKey === currentTrackKey) return;

      currentTrackKey = trackKey;
      const track = audioTracks[trackKey];
      if (!track) return;

      // Update active tab styles
      trackTabs.forEach(t => {
        t.classList.remove('bg-white', 'text-teal-800', 'font-bold', 'shadow-sm', 'border-teal-200');
        t.classList.add('text-slate-600', 'font-semibold');
      });
      tab.classList.add('bg-white', 'text-teal-800', 'font-bold', 'shadow-sm', 'border-teal-200');
      tab.classList.remove('text-slate-600', 'font-semibold');

      // Update text details
      const titleEl = document.getElementById('audioTrackTitle');
      const reciterEl = document.getElementById('audioTrackReciter');
      const arabicEl = document.getElementById('audioAyatArabic');
      const transEl = document.getElementById('audioAyatTranslation');

      if (titleEl) titleEl.textContent = track.title;
      if (reciterEl) reciterEl.textContent = track.reciter;
      if (arabicEl) arabicEl.textContent = track.arabic;
      if (transEl) transEl.textContent = track.translation;
      if (durationEl) durationEl.textContent = track.durationEst;
      if (currentTimeEl) currentTimeEl.textContent = '0:00';
      if (progressBar) progressBar.style.width = '0%';
      if (audioStatus) audioStatus.textContent = 'Ready to play';

      // Load new audio track
      audio.pause();
      updatePlayButton(false);
      
      const localSource = document.getElementById('audioSourceLocal');
      const remoteSource = document.getElementById('audioSourceRemote');
      if (localSource) localSource.src = track.localSrc;
      if (remoteSource) remoteSource.src = track.remoteSrc;
      audio.src = track.localSrc;
      audio.load();

      // Auto play on select
      audio.play().then(() => updatePlayButton(true)).catch(() => updatePlayButton(false));
    });
  });
}

/* ============================================================
   6. BOOKING & FREE TRIAL MODAL
   ============================================================ */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('.open-booking-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalForm = document.getElementById('trialBookingForm');

  if (!modal) return;

  const openModal = (courseName = '') => {
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      mobileDrawer.classList.add('hidden');
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (courseName) {
      const modalCourseSelect = document.getElementById('modalCourseSelect');
      if (modalCourseSelect) {
        for (let i = 0; i < modalCourseSelect.options.length; i++) {
          if (modalCourseSelect.options[i].text.toLowerCase().includes(courseName.toLowerCase())) {
            modalCourseSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course-name') || '';
      openModal(course);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalStudentName').value.trim();
      const age = document.getElementById('modalStudentAge').value.trim();
      const course = document.getElementById('modalCourseSelect').value;
      const country = document.getElementById('modalCountrySelect').value;
      const slot = document.getElementById('modalTimeSlot').value;
      const teacherPref = document.getElementById('modalTeacherPref').value;
      const phone = document.getElementById('modalPhone').value.trim();

      const text = `Assalam-o-Alaikum E Quran EduHub!\n\nI want to book a 3-Day Free Trial:\n• Student Name: ${name} (Age: ${age})\n• Course: ${course}\n• Country: ${country}\n• Preferred Time: ${slot}\n• Teacher Preference: ${teacherPref}\n• Contact Number: ${phone}\n\nPlease confirm my trial class schedule. Thank you!`;

      // Redirect directly to WhatsApp
      window.open(`https://wa.me/923001776166?text=${encodeURIComponent(text)}`, '_blank');
      closeModal();
      modalForm.reset();
      if (window.selectBookingCountry) {
        window.selectBookingCountry('Pakistan');
      }
    });
  }
}

/* ============================================================
   7. SEARCHABLE COUNTRY DROPDOWN (ALL WORLD COUNTRIES)
   ============================================================ */
const WORLD_COUNTRIES = [
  { name: 'Pakistan', flag: '🇵🇰', keywords: 'pakistan pk karachi lahore islamabad rawalpindi' },
  { name: 'Saudi Arabia', flag: '🇸🇦', keywords: 'saudi arabia ksa riyadh jeddah makkah madinah dammam' },
  { name: 'United Arab Emirates', flag: '🇦🇪', keywords: 'united arab emirates uae dubai abu dhabi sharjah ajman' },
  { name: 'United States', flag: '🇺🇸', keywords: 'united states usa america us new york california texas' },
  { name: 'United Kingdom', flag: '🇬🇧', keywords: 'united kingdom uk britain england scotland london birmingham manchester' },
  { name: 'Canada', flag: '🇨🇦', keywords: 'canada ca toronto ontario vancouver calgary' },
  { name: 'Australia', flag: '🇦🇺', keywords: 'australia aus sydney melbourne brisbane perth' },
  { name: 'Qatar', flag: '🇶🇦', keywords: 'qatar qa doha' },
  { name: 'Kuwait', flag: '🇰🇼', keywords: 'kuwait kw' },
  { name: 'Oman', flag: '🇴🇲', keywords: 'oman om muscat' },
  { name: 'Bahrain', flag: '🇧🇭', keywords: 'bahrain bh manama' },
  { name: 'Germany', flag: '🇩🇪', keywords: 'germany de deutschland berlin frankfurt munich' },
  { name: 'France', flag: '🇫🇷', keywords: 'france fr paris lyon marseille' },
  { name: 'Italy', flag: '🇮🇹', keywords: 'italy it rome milan' },
  { name: 'Spain', flag: '🇪🇸', keywords: 'spain es espana madrid barcelona' },
  { name: 'Afghanistan', flag: '🇦🇫', keywords: 'afghanistan af kabul' },
  { name: 'Albania', flag: '🇦🇱', keywords: 'albania al tirana' },
  { name: 'Algeria', flag: '🇩🇿', keywords: 'algeria dz algiers' },
  { name: 'Andorra', flag: '🇦🇩', keywords: 'andorra ad' },
  { name: 'Angola', flag: '🇦🇴', keywords: 'angola ao luanda' },
  { name: 'Antigua and Barbuda', flag: '🇦🇬', keywords: 'antigua and barbuda ag' },
  { name: 'Argentina', flag: '🇦🇷', keywords: 'argentina ar buenos aires' },
  { name: 'Armenia', flag: '🇦🇲', keywords: 'armenia am yerevan' },
  { name: 'Austria', flag: '🇦🇹', keywords: 'austria at osterreich vienna' },
  { name: 'Azerbaijan', flag: '🇦🇿', keywords: 'azerbaijan az baku' },
  { name: 'Bahamas', flag: '🇧🇸', keywords: 'bahamas bs' },
  { name: 'Bangladesh', flag: '🇧🇩', keywords: 'bangladesh bd dhaka chittagong' },
  { name: 'Barbados', flag: '🇧🇧', keywords: 'barbados bb' },
  { name: 'Belarus', flag: '🇧🇾', keywords: 'belarus by minsk' },
  { name: 'Belgium', flag: '🇧🇪', keywords: 'belgium be brussels antwerp' },
  { name: 'Belize', flag: '🇧🇿', keywords: 'belize bz' },
  { name: 'Benin', flag: '🇧🇯', keywords: 'benin bj' },
  { name: 'Bhutan', flag: '🇧🇹', keywords: 'bhutan bt thimphu' },
  { name: 'Bolivia', flag: '🇧🇴', keywords: 'bolivia bo la paz' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦', keywords: 'bosnia and herzegovina ba sarajevo' },
  { name: 'Botswana', flag: '🇧🇼', keywords: 'botswana bw' },
  { name: 'Brazil', flag: '🇧🇷', keywords: 'brazil br brasil sao paulo rio' },
  { name: 'Brunei', flag: '🇧🇳', keywords: 'brunei bn bandar seri begawan' },
  { name: 'Bulgaria', flag: '🇧🇬', keywords: 'bulgaria bg sofia' },
  { name: 'Burkina Faso', flag: '🇧🇫', keywords: 'burkina faso bf' },
  { name: 'Burundi', flag: '🇧🇮', keywords: 'burundi bi' },
  { name: 'Cabo Verde', flag: '🇨🇻', keywords: 'cabo verde cv cape verde' },
  { name: 'Cambodia', flag: '🇰🇭', keywords: 'cambodia kh phnom penh' },
  { name: 'Cameroon', flag: '🇨🇲', keywords: 'cameroon cm' },
  { name: 'Central African Republic', flag: '🇨🇫', keywords: 'central african republic cf' },
  { name: 'Chad', flag: '🇹🇩', keywords: 'chad td' },
  { name: 'Chile', flag: '🇨🇱', keywords: 'chile cl santiago' },
  { name: 'China', flag: '🇨🇳', keywords: 'china cn beijing shanghai' },
  { name: 'Colombia', flag: '🇨🇴', keywords: 'colombia co bogota' },
  { name: 'Comoros', flag: '🇰🇲', keywords: 'comoros km moroni' },
  { name: 'Congo', flag: '🇨🇬', keywords: 'congo cg brazzaville' },
  { name: 'Costa Rica', flag: '🇨🇷', keywords: 'costa rica cr san jose' },
  { name: 'Croatia', flag: '🇭🇷', keywords: 'croatia hr zagreb' },
  { name: 'Cuba', flag: '🇨🇺', keywords: 'cuba cu havana' },
  { name: 'Cyprus', flag: '🇨🇾', keywords: 'cyprus cy nicosia' },
  { name: 'Czech Republic', flag: '🇨🇿', keywords: 'czech republic cz czechia prague' },
  { name: 'Denmark', flag: '🇩🇰', keywords: 'denmark dk copenhagen' },
  { name: 'Djibouti', flag: '🇩🇯', keywords: 'djibouti dj' },
  { name: 'Dominica', flag: '🇩🇲', keywords: 'dominica dm' },
  { name: 'Dominican Republic', flag: '🇩🇴', keywords: 'dominican republic do santo domingo' },
  { name: 'Ecuador', flag: '🇪🇨', keywords: 'ecuador ec quito' },
  { name: 'Egypt', flag: '🇪🇬', keywords: 'egypt eg misr cairo alexandria' },
  { name: 'El Salvador', flag: '🇸🇻', keywords: 'el salvador sv' },
  { name: 'Equatorial Guinea', flag: '🇬🇶', keywords: 'equatorial guinea gq' },
  { name: 'Eritrea', flag: '🇪🇷', keywords: 'eritrea er asmara' },
  { name: 'Estonia', flag: '🇪🇪', keywords: 'estonia ee tallinn' },
  { name: 'Eswatini', flag: '🇸🇿', keywords: 'eswatini sz swaziland' },
  { name: 'Ethiopia', flag: '🇪🇹', keywords: 'ethiopia et addis ababa' },
  { name: 'Fiji', flag: '🇫🇯', keywords: 'fiji fj suva' },
  { name: 'Finland', flag: '🇫🇮', keywords: 'finland fi helsinki' },
  { name: 'Gabon', flag: '🇬🇦', keywords: 'gabon ga libreville' },
  { name: 'Gambia', flag: '🇬🇲', keywords: 'gambia gm banjul' },
  { name: 'Georgia', flag: '🇬🇪', keywords: 'georgia ge tbilisi' },
  { name: 'Ghana', flag: '🇬🇭', keywords: 'ghana gh accra' },
  { name: 'Greece', flag: '🇬🇷', keywords: 'greece gr athens' },
  { name: 'Grenada', flag: '🇬🇩', keywords: 'grenada gd' },
  { name: 'Guatemala', flag: '🇬🇹', keywords: 'guatemala gt' },
  { name: 'Guinea', flag: '🇬🇳', keywords: 'guinea gn conakry' },
  { name: 'Guinea-Bissau', flag: '🇬🇼', keywords: 'guinea-bissau gw' },
  { name: 'Guyana', flag: '🇬🇾', keywords: 'guyana gy georgetown' },
  { name: 'Haiti', flag: '🇭🇹', keywords: 'haiti ht port-au-prince' },
  { name: 'Honduras', flag: '🇭🇳', keywords: 'honduras hn' },
  { name: 'Hong Kong', flag: '🇭🇰', keywords: 'hong kong hk' },
  { name: 'Hungary', flag: '🇭🇺', keywords: 'hungary hu budapest' },
  { name: 'Iceland', flag: '🇮🇸', keywords: 'iceland is reykjavik' },
  { name: 'India', flag: '🇮🇳', keywords: 'india in bharat delhi mumbai hyderabad' },
  { name: 'Indonesia', flag: '🇮🇩', keywords: 'indonesia id jakarta surabaya' },
  { name: 'Iran', flag: '🇮🇷', keywords: 'iran ir tehran isfahan' },
  { name: 'Iraq', flag: '🇮🇶', keywords: 'iraq iq baghdad basra' },
  { name: 'Ireland', flag: '🇮🇪', keywords: 'ireland ie dublin' },
  { name: 'Ivory Coast', flag: '🇨🇮', keywords: 'ivory coast ci cote divoire abidjan' },
  { name: 'Jamaica', flag: '🇯🇲', keywords: 'jamaica jm kingston' },
  { name: 'Japan', flag: '🇯🇵', keywords: 'japan jp tokyo osaka' },
  { name: 'Jordan', flag: '🇯🇴', keywords: 'jordan jo amman zarqa' },
  { name: 'Kazakhstan', flag: '🇰🇿', keywords: 'kazakhstan kz astana almaty' },
  { name: 'Kenya', flag: '🇰🇪', keywords: 'kenya ke nairobi mombasa' },
  { name: 'Kiribati', flag: '🇰🇮', keywords: 'kiribati ki' },
  { name: 'Kosovo', flag: '🇽🇰', keywords: 'kosovo xk pristina' },
  { name: 'Kyrgyzstan', flag: '🇰🇬', keywords: 'kyrgyzstan kg bishkek' },
  { name: 'Laos', flag: '🇱🇦', keywords: 'laos la vientiane' },
  { name: 'Latvia', flag: '🇱🇻', keywords: 'latvia lv riga' },
  { name: 'Lebanon', flag: '🇱🇧', keywords: 'lebanon lb beirut tripoli' },
  { name: 'Lesotho', flag: '🇱🇸', keywords: 'lesotho ls' },
  { name: 'Liberia', flag: '🇱🇷', keywords: 'liberia lr monrovia' },
  { name: 'Libya', flag: '🇱🇾', keywords: 'libya ly tripoli benghazi' },
  { name: 'Liechtenstein', flag: '🇱🇮', keywords: 'liechtenstein li vaduz' },
  { name: 'Lithuania', flag: '🇱🇹', keywords: 'lithuania lt vilnius' },
  { name: 'Luxembourg', flag: '🇱🇺', keywords: 'luxembourg lu' },
  { name: 'Madagascar', flag: '🇲🇬', keywords: 'madagascar mg' },
  { name: 'Malawi', flag: '🇲🇼', keywords: 'malawi mw' },
  { name: 'Malaysia', flag: '🇲🇾', keywords: 'malaysia my kuala lumpur penang' },
  { name: 'Maldives', flag: '🇲🇻', keywords: 'maldives mv male' },
  { name: 'Mali', flag: '🇲🇱', keywords: 'mali ml bamako' },
  { name: 'Malta', flag: '🇲🇹', keywords: 'malta mt valletta' },
  { name: 'Marshall Islands', flag: '🇲🇭', keywords: 'marshall islands mh' },
  { name: 'Mauritania', flag: '🇲🇷', keywords: 'mauritania mr nouakchott' },
  { name: 'Mauritius', flag: '🇲🇺', keywords: 'mauritius mu port louis' },
  { name: 'Mexico', flag: '🇲🇽', keywords: 'mexico mx mexico city' },
  { name: 'Micronesia', flag: '🇫🇲', keywords: 'micronesia fm' },
  { name: 'Moldova', flag: '🇲🇩', keywords: 'moldova md chisinau' },
  { name: 'Monaco', flag: '🇲🇨', keywords: 'monaco mc' },
  { name: 'Mongolia', flag: '🇲🇳', keywords: 'mongolia mn ulaanbaatar' },
  { name: 'Montenegro', flag: '🇲🇪', keywords: 'montenegro me podgorica' },
  { name: 'Morocco', flag: '🇲🇦', keywords: 'morocco ma maghreb rabat casablanca fes' },
  { name: 'Mozambique', flag: '🇲🇿', keywords: 'mozambique mz maputo' },
  { name: 'Myanmar', flag: '🇲🇲', keywords: 'myanmar mm burma yangon' },
  { name: 'Namibia', flag: '🇳🇦', keywords: 'namibia na windhoek' },
  { name: 'Nauru', flag: '🇳🇷', keywords: 'nauru nr' },
  { name: 'Nepal', flag: '🇳🇵', keywords: 'nepal np kathmandu' },
  { name: 'Netherlands', flag: '🇳🇱', keywords: 'netherlands nl holland amsterdam rotterdam the hague' },
  { name: 'New Zealand', flag: '🇳🇿', keywords: 'new zealand nz auckland wellington christchurch aotearoa' },
  { name: 'Nicaragua', flag: '🇳🇮', keywords: 'nicaragua ni managua' },
  { name: 'Niger', flag: '🇳🇪', keywords: 'niger ne niamey' },
  { name: 'Nigeria', flag: '🇳🇬', keywords: 'nigeria ng lagos abuja kano' },
  { name: 'North Macedonia', flag: '🇲🇰', keywords: 'north macedonia mk skopje' },
  { name: 'Norway', flag: '🇳🇴', keywords: 'norway no oslo bergen' },
  { name: 'Palestine', flag: '🇵🇸', keywords: 'palestine ps filastin gaza jerusalem quds west bank ramallah' },
  { name: 'Panama', flag: '🇵🇦', keywords: 'panama pa' },
  { name: 'Papua New Guinea', flag: '🇵🇬', keywords: 'papua new guinea pg' },
  { name: 'Paraguay', flag: '🇵🇾', keywords: 'paraguay py asuncion' },
  { name: 'Peru', flag: '🇵🇪', keywords: 'peru pe lima' },
  { name: 'Philippines', flag: '🇵🇭', keywords: 'philippines ph manila cebu' },
  { name: 'Poland', flag: '🇵🇱', keywords: 'poland pl warsaw krakow polska' },
  { name: 'Portugal', flag: '🇵🇹', keywords: 'portugal pt lisbon porto' },
  { name: 'Romania', flag: '🇷🇴', keywords: 'romania ro bucharest' },
  { name: 'Russia', flag: '🇷🇺', keywords: 'russia ru moscow st petersburg kazan' },
  { name: 'Rwanda', flag: '🇷🇼', keywords: 'rwanda rw kigali' },
  { name: 'Saint Kitts and Nevis', flag: '🇰🇳', keywords: 'saint kitts and nevis kn' },
  { name: 'Saint Lucia', flag: '🇱🇨', keywords: 'saint lucia lc' },
  { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', keywords: 'saint vincent vc' },
  { name: 'Samoa', flag: '🇼🇸', keywords: 'samoa ws apia' },
  { name: 'San Marino', flag: '🇸🇲', keywords: 'san marino sm' },
  { name: 'Sao Tome and Principe', flag: '🇸🇹', keywords: 'sao tome and principe st' },
  { name: 'Senegal', flag: '🇸🇳', keywords: 'senegal sn dakar' },
  { name: 'Serbia', flag: '🇷🇸', keywords: 'serbia rs belgrade novi sad' },
  { name: 'Seychelles', flag: '🇸🇨', keywords: 'seychelles sc victoria' },
  { name: 'Sierra Leone', flag: '🇸🇱', keywords: 'sierra leone sl freetown' },
  { name: 'Singapore', flag: '🇸🇬', keywords: 'singapore sg' },
  { name: 'Slovakia', flag: '🇸🇰', keywords: 'slovakia sk bratislava' },
  { name: 'Slovenia', flag: '🇸🇮', keywords: 'slovenia si ljubljana' },
  { name: 'Solomon Islands', flag: '🇸🇧', keywords: 'solomon islands sb honiara' },
  { name: 'Somalia', flag: '🇸🇴', keywords: 'somalia so mogadishu hargeisa' },
  { name: 'South Africa', flag: '🇿🇦', keywords: 'south africa za johannesburg cape town durban' },
  { name: 'South Korea', flag: '🇰🇷', keywords: 'south korea kr seoul busan' },
  { name: 'South Sudan', flag: '🇸🇸', keywords: 'south sudan ss juba' },
  { name: 'Sri Lanka', flag: '🇱🇰', keywords: 'sri lanka lk colombo kandy' },
  { name: 'Sudan', flag: '🇸🇩', keywords: 'sudan sd khartoum omdurman' },
  { name: 'Suriname', flag: '🇸🇷', keywords: 'suriname sr paramaribo' },
  { name: 'Sweden', flag: '🇸🇪', keywords: 'sweden se stockholm gothenburg malmo sverige' },
  { name: 'Switzerland', flag: '🇨🇭', keywords: 'switzerland ch swiss zurich geneva basel bern' },
  { name: 'Syria', flag: '🇸🇾', keywords: 'syria sy damascus aleppo homs' },
  { name: 'Taiwan', flag: '🇹🇼', keywords: 'taiwan tw taipei' },
  { name: 'Tajikistan', flag: '🇹🇯', keywords: 'tajikistan tj dushanbe khujand' },
  { name: 'Tanzania', flag: '🇹🇿', keywords: 'tanzania tz dar es salaam zanzibar' },
  { name: 'Thailand', flag: '🇹🇭', keywords: 'thailand th bangkok phuket' },
  { name: 'Timor-Leste', flag: '🇹🇱', keywords: 'timor-leste tl dili east timor' },
  { name: 'Togo', flag: '🇹🇬', keywords: 'togo tg lome' },
  { name: 'Tonga', flag: '🇹🇴', keywords: 'tonga to' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹', keywords: 'trinidad and tobago tt port of spain' },
  { name: 'Tunisia', flag: '🇹🇳', keywords: 'tunisia tn tunis sousse sfax' },
  { name: 'Turkey', flag: '🇹🇷', keywords: 'turkey tr turkiye istanbul ankara izmir bursa' },
  { name: 'Turkmenistan', flag: '🇹🇲', keywords: 'turkmenistan tm ashgabat' },
  { name: 'Tuvalu', flag: '🇹🇻', keywords: 'tuvalu tv' },
  { name: 'Uganda', flag: '🇺🇬', keywords: 'uganda ug kampala' },
  { name: 'Ukraine', flag: '🇺🇦', keywords: 'ukraine ua kyiv lviv' },
  { name: 'Uruguay', flag: '🇺🇾', keywords: 'uruguay uy montevideo' },
  { name: 'Uzbekistan', flag: '🇺🇿', keywords: 'uzbekistan uz tashkent samarkand bukhara' },
  { name: 'Vanuatu', flag: '🇻🇺', keywords: 'vanuatu vu' },
  { name: 'Vatican City', flag: '🇻🇦', keywords: 'vatican city va holy see' },
  { name: 'Venezuela', flag: '🇻🇪', keywords: 'venezuela ve caracas' },
  { name: 'Vietnam', flag: '🇻🇳', keywords: 'vietnam vn hanoi ho chi minh' },
  { name: 'Yemen', flag: '🇾🇪', keywords: 'yemen ye sanaa aden' },
  { name: 'Zambia', flag: '🇿🇲', keywords: 'zambia zm lusaka' },
  { name: 'Zimbabwe', flag: '🇿🇼', keywords: 'zimbabwe zw harare' }
];

let selectedBookingCountry = WORLD_COUNTRIES[0];

function initCountrySearchableDropdown() {
  const container = document.getElementById('countryDropdownContainer');
  const btn = document.getElementById('countryDropdownBtn');
  const selectedDisplay = document.getElementById('countryDropdownSelected');
  const chevron = document.getElementById('countryDropdownChevron');
  const menu = document.getElementById('countryDropdownMenu');
  const searchInput = document.getElementById('countrySearchInput');
  const clearBtn = document.getElementById('clearCountrySearch');
  const listContainer = document.getElementById('countryOptionsList');
  const noMatch = document.getElementById('countryNoMatch');
  const hiddenInput = document.getElementById('modalCountrySelect');

  if (!btn || !menu || !listContainer) return;

  // Render all countries into the options list
  listContainer.innerHTML = WORLD_COUNTRIES.map(c => `
    <button type="button" class="country-option-item w-full px-2.5 py-1.5 text-left rounded-lg flex items-center justify-between hover:bg-teal-50 transition text-slate-800 ${c.name === 'Pakistan' ? 'bg-teal-50/70 font-semibold' : ''}" data-name="${c.name}" data-flag="${c.flag}" data-keywords="${c.name.toLowerCase()} ${c.keywords.toLowerCase()}">
      <span class="flex items-center gap-2 truncate">
        <span class="text-base">${c.flag}</span>
        <span class="country-name-label text-xs sm:text-sm text-slate-900 truncate">${c.name}</span>
      </span>
      <span class="country-check-marker text-teal-600 font-bold text-xs ${c.name === 'Pakistan' ? '' : 'hidden'}">✓</span>
    </button>
  `).join('');

  const optionItems = listContainer.querySelectorAll('.country-option-item');

  function selectCountry(countryName) {
    if (!countryName) countryName = 'Pakistan';
    const found = WORLD_COUNTRIES.find(c => c.name.toLowerCase() === countryName.toLowerCase()) || WORLD_COUNTRIES[0];
    selectedBookingCountry = found;
    if (hiddenInput) hiddenInput.value = found.name;
    if (selectedDisplay) {
      selectedDisplay.innerHTML = `
        <span class="text-base">${found.flag}</span>
        <span class="text-xs sm:text-sm font-semibold text-slate-900 truncate">${found.name}</span>
      `;
    }
    // Update active highlight and checkmark
    optionItems.forEach(item => {
      const isSelected = item.getAttribute('data-name').toLowerCase() === found.name.toLowerCase();
      const marker = item.querySelector('.country-check-marker');
      if (marker) marker.classList.toggle('hidden', !isSelected);
      item.classList.toggle('bg-teal-50/70', isSelected);
      item.classList.toggle('font-semibold', isSelected);
    });
    closeDropdown();
  }

  function openDropdown() {
    menu.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
    // Scroll currently selected item into view
    const selectedItem = listContainer.querySelector(`.country-option-item[data-name="${selectedBookingCountry.name}"]`);
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 60);
  }

  function closeDropdown() {
    menu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
    if (searchInput) {
      searchInput.value = '';
      filterCountries('');
    }
  }

  function filterCountries(query) {
    const q = query.trim().toLowerCase();
    let matches = 0;
    optionItems.forEach(item => {
      const keywords = item.getAttribute('data-keywords') || '';
      const isMatch = !q || keywords.includes(q);
      item.classList.toggle('hidden', !isMatch);
      if (isMatch) matches++;
    });
    if (noMatch) noMatch.classList.toggle('hidden', matches > 0);
    if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);
  }

  // Toggle on button click
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.classList.contains('hidden')) {
      openDropdown();
    } else {
      closeDropdown();
    }
  });

  // Select on item click
  optionItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = item.getAttribute('data-name');
      selectCountry(name);
    });
  });

  // Live search filtering by typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterCountries(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstVisible = listContainer.querySelector('.country-option-item:not(.hidden)');
        if (firstVisible) {
          firstVisible.click();
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        filterCountries('');
      }
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (container && !container.contains(e.target)) {
      closeDropdown();
    }
  });

  // Set default initial selection
  selectCountry('Pakistan');
  if (window.lucide) window.lucide.createIcons();

  window.selectBookingCountry = selectCountry;
}

/* ============================================================
   7. FAQ ACCORDION
   ============================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close others
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });
}
