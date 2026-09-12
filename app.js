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
      navbar.classList.add('shadow-xl', 'bg-opacity-95');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-opacity-95');
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
        b.classList.remove('bg-teal-500', 'text-white', 'shadow-lg');
        b.classList.add('bg-teal-950/60', 'text-teal-200');
      });
      btn.classList.add('bg-teal-500', 'text-white', 'shadow-lg');
      btn.classList.remove('bg-teal-950/60', 'text-teal-200');
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
        b.classList.remove('active-filter', 'bg-teal-500', 'text-white');
        b.classList.add('bg-teal-900/40', 'text-teal-200');
      });
      btn.classList.add('active-filter', 'bg-teal-500', 'text-white');
      btn.classList.remove('bg-teal-900/40', 'text-teal-200');

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
        b.classList.remove('border-teal-400', 'text-teal-300', 'bg-teal-900/40');
        b.classList.add('border-transparent', 'text-gray-400');
      });
      btn.classList.add('border-teal-400', 'text-teal-300', 'bg-teal-900/40');
      btn.classList.remove('border-transparent', 'text-gray-400');

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
   5. TAJWEED AUDIO RECITATION DEMO
   ============================================================ */
let audioContext = null;
let isAudioPlaying = false;
let audioOscillator = null;

function initAudioDemo() {
  const playBtn = document.getElementById('playTajweedBtn');
  const waveContainer = document.getElementById('audioWaveVisualizer');
  const audioStatus = document.getElementById('audioStatusText');

  if (!playBtn) return;

  playBtn.addEventListener('click', () => {
    if (!isAudioPlaying) {
      startSimulatedRecitation(waveContainer, audioStatus, playBtn);
    } else {
      stopSimulatedRecitation(waveContainer, audioStatus, playBtn);
    }
  });
}

function startSimulatedRecitation(waveContainer, audioStatus, playBtn) {
  isAudioPlaying = true;
  if (waveContainer) waveContainer.classList.add('playing');
  if (audioStatus) audioStatus.textContent = 'Listening to Tajweed Recitation: Surah Al-Fatiha (Ayat 1-4)...';
  playBtn.innerHTML = `
    <i data-lucide="pause" class="w-5 h-5 text-white"></i>
    <span>Pause Recitation</span>
  `;
  if (window.lucide) window.lucide.createIcons();

  // Try web audio melodious drone/recitation chord
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioContext.currentTime); // Gentle A3
      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      osc.start();
      audioOscillator = osc;
    }
  } catch (e) {
    console.log('AudioContext initialized without tone');
  }

  // Auto stop after 14 seconds
  setTimeout(() => {
    if (isAudioPlaying) {
      stopSimulatedRecitation(waveContainer, audioStatus, playBtn);
    }
  }, 14000);
}

function stopSimulatedRecitation(waveContainer, audioStatus, playBtn) {
  isAudioPlaying = false;
  if (waveContainer) waveContainer.classList.remove('playing');
  if (audioStatus) audioStatus.textContent = 'Click to listen to Tajweed Pronunciation Demonstration';
  playBtn.innerHTML = `
    <i data-lucide="play" class="w-5 h-5 text-white"></i>
    <span>Listen to Tajweed Demonstration</span>
  `;
  if (window.lucide) window.lucide.createIcons();

  if (audioOscillator) {
    try {
      audioOscillator.stop();
      audioOscillator.disconnect();
    } catch(e) {}
    audioOscillator = null;
  }
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
    });
  }
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
