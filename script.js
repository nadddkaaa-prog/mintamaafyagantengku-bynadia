let currentPage = 1;
const totalPages = 11;
let isPlaying = false;
let hasAutoPlayedOnPage2 = false;

// Generating Hujan Love Melayang
function createFallingHearts() {
  const container = document.getElementById('hearts-container');
  const heartIcons = ['❤️', '💖', '💕', '💗', '💓'];
  
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    container.appendChild(heart);
  }
}

// Helper sinkronisasi status & tombol musik
function setMusicState(playing) {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  if (!audio) return;

  if (playing) {
    audio.play().then(() => {
      isPlaying = true;
      if (btn) btn.innerText = '⏸ Pause Musik';
    }).catch((err) => {
      console.warn('Autoplay musik diblokir browser:', err);
    });
  } else {
    audio.pause();
    isPlaying = false;
    if (btn) btn.innerText = '🎵 Play Musik';
  }
}

// Navigasi Halaman
function showPage(pageNumber) {
  for (let i = 1; i <= totalPages; i++) {
    const page = document.getElementById(`page-${i}`);
    if (page) page.classList.remove('active');
  }
  const activePage = document.getElementById(`page-${pageNumber}`);
  if (activePage) activePage.classList.add('active');

  // Otomatis putar musik saat masuk ke Halaman 2
  if (pageNumber === 2 && !hasAutoPlayedOnPage2) {
    hasAutoPlayedOnPage2 = true;
    setMusicState(true);
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}

// Buka Amplop (Halaman 1)
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  envelope.classList.add('open');
  
  const nextBtn = document.querySelector('#page-1 .next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
}

// Tiup Lilin (Halaman 2)
function blowCandles() {
  document.getElementById('flame1').classList.add('off');
  document.getElementById('flame2').classList.add('off');
  document.getElementById('flame3').classList.add('off');
  
  document.getElementById('marquee-text').classList.remove('hidden');
}

// Toggle Musik
function toggleMusic() {
  setMusicState(!isPlaying);
}

// Gombalan Cerdas (Halaman 8)
const gombalanList = [
  "Tahu gak bedanya kamu sama bintang? Bintang ada di langit, kalau kamu ada di hatiku selamanya! ✨💖",
  "Kamu itu kaya AC ya, setiap dekat kamu hatiku adem banget! ❄️😊",
  "Pernah kena tilang gak? Soalnya kamu telah mencuri hatiku tanpa izin! 👮‍♂️❤️",
  "Kamu punya peta gak? Soalnya aku tersesat di dalam indahnya matamu! 🗺️👀",
  "Cinta aku ke kamu itu ibarat angka 8, gak bakal pernah ada ujungnya! ♾️"
];

function generateGombalan() {
  const index = Math.floor(Math.random() * gombalanList.length);
  document.getElementById('gombal-text').innerText = gombalanList[index];
}

// LOGIKA KALKULATOR JODOH
function calculateLove() {
  const name1 = document.getElementById('name1').value.trim().toLowerCase();
  const name2 = document.getElementById('name2').value.trim().toLowerCase();

  if (name1 === "" || name2 === "") {
    document.getElementById('love-result').innerText = "Mohon isi kedua nama terlebih dahulu! 💌";
    return;
  }

  const isMatchFull = (name1 === "azka airlangga bristianto" && name2 === "nadia sofia meilani") || 
                      (name1 === "nadia sofia meilani" && name2 === "azka airlangga bristianto");
  
  const isMatchShort = (name1 === "azka" && name2 === "nadia") || 
                       (name1 === "nadia" && name2 === "azka");

  if (isMatchFull || isMatchShort) {
    document.getElementById('love-result').innerText = `Tingkat Kecocokan Jodoh: 100% ❤️ (JODOH BANGET!)`;
  } else {
    const otherPercentages = [10, 20, 30, 40, 50];
    const randomPercentage = otherPercentages[Math.floor(Math.random() * otherPercentages.length)];
    document.getElementById('love-result').innerText = `Tingkat Kecocokan Jodoh: ${randomPercentage}% 💔 (Kurang Cocok)`;
  }
}

// Inisialisasi Efek Love saat halaman selesai dibuka
window.onload = function() {
  createFallingHearts();
};