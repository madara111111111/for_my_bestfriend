const messages = [
    "You've been my rock through thick and thin ❤️",
    "Partners in crime since day one! 👯‍♀️",
    "Blessed to have a bestie like you 🌟",
    "Making memories with my favorite person 💕",
    "Because laughter is better with you! 😊",
    // Add more messages for remaining photos
];

const photoUrls = [
    "photos/1.jpg",
    "photos/2.jpg",
    "photos/3.jpg",
    "photos/4.jpg",
    "photos/5.jpg", 
    "photos/6.jpg",
    "photos/7.jpg",
    "photos/8.jpg",
    "photos/9.jpg",
    "photos/10.jpg",
    "photos/11.jpg",
    "photos/12.jpg",
    "photos/13.jpg",
    "photos/14.jpg",
    "photos/15.jpg",
    "photos/16.jpg",
    "photos/17.jpg",
    "photos/18.jpg",
    "photos/19.jpg",
    "photos/20.jpg",
    "photos/21.jpg",
    "photos/22.jpg",
    "photos/23.jpg",
    "photos/24.jpg",
    "photos/25.jpg",
    "photos/26.jpg",
    "photos/27.jpg",
    "photos/28.jpg",
    "photos/29.jpg",
    "photos/30.jpg",
    "photos/31.jpg",
    "photos/32.jpg",
    "photos/33.jpg",
    "photos/34.jpg",
    "photos/35.jpg",
    "photos/36.jpg",
    "photos/37.jpg",
    "photos/38.jpg",
    "photos/39.jpg",

];

document.getElementById('start-journey').addEventListener('click', () => {
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('wish-portal').classList.add('active');
    createStars();
});

function playTwinkleSound() {
    const audio = document.getElementById('twinkle');
    if (audio) {
        audio.currentTime = 0; // Reset sound to start
        audio.volume = 0.3; // Lower volume
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio play failed:", error);
            });
        }
    }
}

// Create stars
function createStars() {
    const container = document.querySelector('.stars-container');
    container.innerHTML = '';
    const TOTAL_STARS = 39;
    const moonRadius = 100;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Preload all images
    const preloadImages = [];
    for (let i = 1; i <= TOTAL_STARS; i++) {
        const img = new Image();
        img.src = `photos/${i}.jpeg`;
        preloadImages.push(img);
    }

    // Create stars with guaranteed photo loading
    for (let i = 1; i <= TOTAL_STARS; i++) {
        const star = document.createElement('div');
        star.className = 'star ' + getRandomSize();
        star.dataset.photoId = i;
        
        // Generate random position
        let x, y;
        do {
            x = Math.random() * window.innerWidth;
            y = Math.random() * window.innerHeight;
        } while (isInsideMoonArea(x, y, centerX, centerY, moonRadius));
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        // Add click handler with photo display
        star.addEventListener('click', (e) => {
            playTwinkleSound(); // Add sound when star is clicked
            const photoId = e.target.dataset.photoId;
            const gallery = document.querySelector('.photo-gallery');
            gallery.style.display = 'block';
            
            document.querySelectorAll('.memory-photo').forEach(photo => {
                photo.classList.remove('active');
            });
            
            const photoElement = document.getElementById(`photo${photoId}`);
            if (photoElement) {
                // Clear previous content
                photoElement.innerHTML = '';
                
                // Create frame structure
                const frameHTML = `
                    <div class="photo-title">✨ The most sundar kanya of this universe  ✨</div>
                    <img src="photos/${photoId}.jpeg" alt="Memory ${photoId}">
                    <div class="photo-message">${messages[photoId - 1] || 'You mean the world to me!'}</div>
                `;
                
                photoElement.innerHTML = frameHTML;
                photoElement.classList.add('active');
            }
        });
        
        container.appendChild(star);
    }
}

function isInsideMoonArea(x, y, centerX, centerY, moonRadius) {
    const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + 
        Math.pow(y - centerY, 2)
    );
    return distance < moonRadius + 30;
}

function getRandomSize() {
    const random = Math.random();
    if (random < 0.4) return 'small';
    if (random < 0.7) return 'medium';
    return 'large';
}

// Close gallery when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.photo-gallery') && !e.target.closest('.star')) {
        const gallery = document.querySelector('.photo-gallery');
        gallery.style.display = 'none';
    }
});

// Handle portal transition
let currentReason = 0;
document.addEventListener('click', () => {
    const whyPortal = document.getElementById('portal-of-whys');
    const wishPortal = document.getElementById('wish-portal');
    const reasonsContainer = document.querySelector('.reasons-container');
    
    if (currentReason < reasons.length) {
        reasonsContainer.textContent = reasons[currentReason];
        currentReason++;
    } else {
        document.querySelector('.final-message').style.opacity = '1';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.querySelector('.stars-container');
    container.innerHTML = '';
    createStars();
});

// Initialize
window.onload = createStars;
