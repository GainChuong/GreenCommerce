const slides = [
    {
        image: "../assets/images/auth/slide1.png",

        title: "Give Clothes A Second Life",

        desc: "Donate, exchange and transform unused clothing into valuable fashion resources.",
    },

    {
        image: "../assets/images/auth/slide2.png",

        title: "Earn GreenCoin Rewards",

        desc: "Every sustainable action helps the planet and earns you GreenCoin points.",
    },
];

let currentSlide = 0;

const image = document.getElementById("sliderImage");

const title = document.getElementById("sliderTitle");

const desc = document.getElementById("sliderDesc");

function changeSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    image.style.opacity = 0;

    setTimeout(() => {
        image.src = slides[currentSlide].image;

        title.textContent = slides[currentSlide].title;

        desc.textContent = slides[currentSlide].desc;

        image.style.opacity = 1;
    }, 300);
}

setInterval(changeSlide, 5000);
