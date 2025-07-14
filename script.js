// Pop-up Modal Logic
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const photoModal = document.getElementById('photoModal');
const carouselInner = document.getElementById('carouselInner');
const photos = document.querySelectorAll('#carouselInner img'); // Get all image elements
let currentIndex = 0;
let intervalId;

function startCarousel() {
    // Stop any existing interval to prevent multiple intervals running
    stopCarousel();

    // Start automatic scrolling
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % photos.length; // Loop back to start after last image
        const translateX = -currentIndex * 100 + '%'; // Calculate translation for the current image
        carouselInner.style.transform = `translateX(${translateX})`;
    }, 2000); // Change image every 2 seconds
}

function stopCarousel() {
    clearInterval(intervalId); // Clear the interval
}

openModalBtn.addEventListener('click', () => {
    photoModal.classList.remove('hidden');
    // Reset carousel to first image when opening
    currentIndex = 0;
    carouselInner.style.transform = 'translateX(0)';
    startCarousel();
});

closeModalBtn.addEventListener('click', () => {
    photoModal.classList.add('hidden');
    stopCarousel();
});

// Close modal if clicked outside of the content box
photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) { // Check if the click was on the overlay, not the content
        photoModal.classList.add('hidden');
        stopCarousel();
    }
});


// Game Logic (Updated for Video)
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const gameVideo = document.getElementById('gameVideo'); // Get the video element
const gameResult = document.getElementById('gameResult');
const gameReason = document.getElementById('gameReason');

let gamePlaying = false; // Flag to track if the game (video) is currently playing

function startGame() {
    // Hide previous results
    gameResult.classList.add('hidden');
    gameReason.classList.add('hidden');

    // Reset video to beginning and play
    gameVideo.currentTime = 0; // Rewind to start
    gameVideo.play();
    gamePlaying = true;
}

function stopGame() {
    if (gamePlaying) {
        gameVideo.pause();
        gamePlaying = false;
        // --- NEW: Show "You Lose" message when Stop is clicked ---
        gameResult.classList.remove('hidden');
        gameReason.classList.remove('hidden');
        // --- END NEW ---
    }
}

// Event listener for when the video ends
gameVideo.addEventListener('ended', () => {
    gameResult.classList.remove('hidden');
    gameReason.classList.remove('hidden');
    gamePlaying = false; // Game has ended
});

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

// Initial state reset for video when page loads (optional, video usually starts paused)
gameVideo.pause(); // Ensure video is paused on load
gameVideo.currentTime = 0; // Ensure video is at the beginning on load


// Mobile Navigation Dropdown Logic
const moreMenuBtn = document.getElementById('moreMenuBtn');
const mobileDropdown = document.getElementById('mobileDropdown');

moreMenuBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the document click listener from closing it immediately
    mobileDropdown.classList.toggle('hidden');
});

// Close the dropdown if clicked outside of it
document.addEventListener('click', (event) => {
    if (!mobileDropdown.classList.contains('hidden') && !moreMenuBtn.contains(event.target) && !mobileDropdown.contains(event.target)) {
        mobileDropdown.classList.add('hidden');
    }
});

// Close dropdown when a link inside it is clicked
mobileDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileDropdown.classList.add('hidden');
    });
});
