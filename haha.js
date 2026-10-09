/* =========================================================
   DIYA BIRTHDAY WEBSITE
   haha.js
========================================================= */


/* =========================================================
   BASIC SCENE SYSTEM
========================================================= */

const scenes = document.querySelectorAll(".scene");


function goToScene(sceneId) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const target = document.getElementById(sceneId);

    if (target) {
        target.classList.add("active");
    }

    createAmbientHeart();
}


/* =========================================================
   GLOBAL BUTTON NAVIGATION
========================================================= */

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.next;

        goToScene(target);

    });

});


/* =========================================================
   AMBIENT FLOATING HEARTS
========================================================= */

const floatingHearts = document.getElementById("floatingHearts");

function createAmbientHeart() {

    if (!floatingHearts) return;

    const heart = document.createElement("span");

    heart.className = "ambient-heart";

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "✨",
        "🦋"
    ];

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.bottom =
        Math.random() * 10 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}


setInterval(createAmbientHeart, 1000);


/* =========================================================
   SCENE 1 — PASSCODE
========================================================= */

const correctPasscode = "1019";

let enteredCode = "";

const keys = document.querySelectorAll(".key[data-key]");
const passwordDots =
    document.querySelectorAll("#passwordDisplay span");

const clearKey =
    document.getElementById("clearKey");

const backKey =
    document.getElementById("backKey");

const wrongMessage =
    document.getElementById("wrongMessage");

const passHint =
    document.getElementById("passHint");


function updatePasswordDisplay() {

    passwordDots.forEach((dot, index) => {

        if (index < enteredCode.length) {
            dot.textContent = "●";
            dot.classList.add("filled");
        } else {
            dot.textContent = "○";
            dot.classList.remove("filled");
        }

    });
}


function resetPassword() {

    enteredCode = "";

    updatePasswordDisplay();

    wrongMessage.textContent = "";

    passHint.textContent =
        "only my special girl knows it 💗";
}


function checkPassword() {

    if (enteredCode.length !== 4) {
        return;
    }

    if (enteredCode === correctPasscode) {

        wrongMessage.textContent =
            "Correct... I knew you knew it 🥺❤️";

        passHint.textContent =
            "Welcome, my love ❤️";

        createBigHeartBurst();

        setTimeout(() => {

            goToScene("scene-game");

            resetPassword();

        }, 900);

    } else {

        wrongMessage.textContent =
            "Hmmmm... wrong code baby 😭💕";

        passHint.textContent =
            "Try again, my love.";

        document
            .getElementById("passwordDisplay")
            .animate(
                [
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(5px)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 300
                }
            );

        setTimeout(resetPassword, 700);
    }
}


keys.forEach(key => {

    key.addEventListener("click", () => {

        if (enteredCode.length >= 4) return;

        enteredCode += key.dataset.key;

        updatePasswordDisplay();

        if (enteredCode.length === 4) {
            setTimeout(checkPassword, 200);
        }

    });

});


clearKey.addEventListener("click", resetPassword);


backKey.addEventListener("click", () => {

    enteredCode =
        enteredCode.slice(0, -1);

    updatePasswordDisplay();

});


/* =========================================================
   HEART BURST
========================================================= */

function createBigHeartBurst() {

    for (let i = 0; i < 20; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "❤️";

        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.zIndex = "9999";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.pointerEvents = "none";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: 0.2
                },
                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.6)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "ease-out"
            }
        );

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }
}


/* =========================================================
   SCENE 2 — CATCH THE HEART GAME
========================================================= */

const gameArea =
    document.getElementById("heartGameArea");

const heartScore =
    document.getElementById("heartScore");

const gameMessage =
    document.getElementById("gameMessage");

const gameNextBtn =
    document.getElementById("gameNextBtn");

let score = 0;

let gameRunning = false;

let heartSpawner = null;


function createGameHeart() {

    if (!gameRunning) return;

    const heart =
        document.createElement("div");

    heart.className = "catch-heart";

    const heartTypes = [
        "❤️",
        "💗",
        "💕",
        "💖"
    ];

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() * heartTypes.length
            )
        ];

    const maxX =
        Math.max(
            20,
            gameArea.clientWidth - 45
        );

    const maxY =
        Math.max(
            30,
            gameArea.clientHeight - 55
        );

    heart.style.left =
        Math.random() * maxX + "px";

    heart.style.top =
        Math.random() * maxY + "px";

    heart.addEventListener("pointerdown", () => {

        if (!gameRunning) return;

        score++;

        heartScore.textContent = score;

        heart.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform: "scale(1.8)",
                    opacity: 0
                }
            ],
            {
                duration: 250
            }
        );

        setTimeout(() => heart.remove(), 250);

        if (score >= 5) {
            finishHeartGame();
        }

    });

    gameArea.appendChild(heart);

    setTimeout(() => {

        if (heart.isConnected) {
            heart.remove();
        }

    }, 1600);
}


function startHeartGame() {

    score = 0;

    heartScore.textContent = "0";

    gameRunning = true;

    gameNextBtn.classList.add("hidden");

    gameMessage.textContent =
        "Catch them, birthday girl! 💕";

    if (heartSpawner) {
        clearInterval(heartSpawner);
    }

    heartSpawner =
        setInterval(
            createGameHeart,
            650
        );

    for (let i = 0; i < 3; i++) {
        setTimeout(
            createGameHeart,
            i * 200
        );
    }
}


function finishHeartGame() {

    gameRunning = false;

    clearInterval(heartSpawner);

    gameMessage.textContent =
        "You caught them all! You win my next surprise 🥺❤️";

    gameNextBtn.classList.remove("hidden");

    createBigHeartBurst();
}


gameNextBtn.addEventListener(
    "click",
    () => goToScene("scene-bouquet")
);


/* Start game when scene becomes available */
setTimeout(startHeartGame, 1000);


/* =========================================================
   SCENE 3 — BOUQUET GIFT
========================================================= */

const bouquetGift =
    document.getElementById("bouquetGift");

const bouquetReveal =
    document.getElementById("bouquetReveal");

const bouquetTapText =
    document.getElementById("bouquetTapText");

const flowerPlayBtn =
    document.getElementById("flowerPlayBtn");

const flowerRain =
    document.getElementById("flowerRain");

const flowerNextBtn =
    document.getElementById("flowerNextBtn");


bouquetGift.addEventListener("click", openBouquet);


function openBouquet() {

    if (bouquetGift.classList.contains("open")) {
        return;
    }

    bouquetGift.classList.add("open");

    bouquetTapText.textContent =
        "Wait... 🌷";

    setTimeout(() => {

        bouquetReveal.classList.add("show");

        bouquetTapText.style.opacity = "0";

    }, 500);

}


flowerPlayBtn.addEventListener(
    "click",
    startFlowerRain
);


function startFlowerRain() {

    flowerPlayBtn.disabled = true;

    flowerPlayBtn.textContent =
        "Flowers everywhere 🌷";

    const flowerImages = [

        "https://cdn.avasflowers.net/img/prod_img/avasflowers-spring-tulips-20-stems-16531.png",

        "https://storage.googleapis.com/regalflowers-cdn/products/imgregal-red-roses-and-million-stars-30roses-po044edsyh0cev86l9rjz9.jpg"

    ];

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            const flower =
                document.createElement("img");

            flower.className =
                "falling-flower";

            flower.src =
                flowerImages[
                    Math.floor(
                        Math.random() *
                        flowerImages.length
                    )
                ];

            flower.style.left =
                Math.random() * 100 + "%";

            const size =
                25 + Math.random() * 45;

            flower.style.width =
                size + "px";

            flower.style.height =
                size + "px";

            flower.style.animationDuration =
                (2.5 + Math.random() * 3) + "s";

            flower.style.animationDelay =
                Math.random() * 0.8 + "s";

            flower.style.opacity =
                0.55 + Math.random() * 0.45;

            flowerRain.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 6000);

        }, i * 100);

    }

    setTimeout(() => {

        flowerNextBtn.classList.remove("hidden");

    }, 3200);

}


flowerNextBtn.addEventListener(
    "click",
    () => goToScene("scene-cake")
);


/* =========================================================
   SCENE 4 — CAKE
========================================================= */

const cakeGift =
    document.getElementById("cakeGift");

const cakeTapText =
    document.getElementById("cakeTapText");

const cakeArea =
    document.getElementById("cakeArea");

const cakeCountdown =
    document.getElementById("cakeCountdown");

const blowText =
    document.getElementById("blowText");

const cutCakeBtn =
    document.getElementById("cutCakeBtn");

const waitingBtn =
    document.getElementById("waitingBtn");

const cakeConfetti =
    document.getElementById("cakeConfetti");


let cakeOpened = false;


cakeGift.addEventListener("click", openCake);


function openCake() {

    if (cakeOpened) return;

    cakeOpened = true;

    cakeGift.classList.add("open");

    cakeTapText.textContent =
        "Look what was hiding inside... 🎂";

    createConfetti(45);

    setTimeout(() => {

        cakeArea.classList.add("show");

        startCakeCountdown();

    }, 700);

}


function startCakeCountdown() {

    let count = 5;

    cakeCountdown.textContent = count;

    const interval =
        setInterval(() => {

            count--;

            cakeCountdown.textContent =
                count;

            if (count <= 0) {

                clearInterval(interval);

                finishCountdown();

            }

        }, 1000);

}


function finishCountdown() {

    const cake =
        document.querySelector(".cake");

    cake.classList.add("blown");

    cakeCountdown.textContent =
        "💨";

    blowText.textContent =
        "Perfect! Candles are gone 🥺❤️";

    cutCakeBtn.classList.remove("hidden");

    createConfetti(60);
}


cutCakeBtn.addEventListener(
    "click",
    () => {

        const cake =
            document.querySelector(".cake");

        cake.classList.add("cake-cut");

        cutCakeBtn.textContent =
            "Cake cut! 🎂❤️";

        createConfetti(100);

        setTimeout(() => {

            cutCakeBtn.classList.add("hidden");

            waitingBtn.classList.remove("hidden");

        }, 1200);

    }
);


function createConfetti(amount) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            randomConfettiColor();

        piece.style.animationDelay =
            Math.random() * 0.5 + "s";

        piece.style.animationDuration =
            (1.5 + Math.random() * 2) + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        cakeConfetti.appendChild(piece);

        setTimeout(
            () => piece.remove(),
            4000
        );

    }
}


function randomConfettiColor() {

    const colors = [
        "#ff6bbd",
        "#ffb3df",
        "#a866ff",
        "#fff",
        "#ffd45e",
        "#ff709d"
    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];
}


waitingBtn.addEventListener(
    "click",
    () => {

        goToScene("scene-video");

        playBirthdayVideo();

    }
);


/* =========================================================
   SCENE 5 — VIDEO
========================================================= */

const birthdayVideo =
    document.getElementById("birthdayVideo");

const videoNextBtn =
    document.getElementById("videoNextBtn");

const videoHint =
    document.getElementById("videoHint");


function playBirthdayVideo() {

    if (!birthdayVideo) return;

    birthdayVideo.currentTime = 0;

    const playPromise =
        birthdayVideo.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            videoHint.textContent =
                "Tap ▶ on the video to start ❤️";

        });

    }

}


birthdayVideo.addEventListener(
    "ended",
    () => {

        videoHint.textContent =
            "That was for you, my love ❤️";

        videoNextBtn.classList.remove("hidden");

        createBigHeartBurst();

    }
);


videoNextBtn.addEventListener(
    "click",
    () => {

        goToScene("scene-promises");

    }
);


/* =========================================================
   SCENE 6 — PROMISE CARDS
========================================================= */

const promiseCards =
    document.querySelectorAll(".promise-card");

const loveEnding =
    document.getElementById("loveEnding");

const promiseNextBtn =
    document.getElementById("promiseNextBtn");

let openedCards = 0;


promiseCards.forEach(card => {

    card.addEventListener("click", () => {

        if (card.classList.contains("flipped")) {
            return;
        }

        card.classList.add("flipped");

        openedCards++;

        if (openedCards === 7) {

            setTimeout(
                completePromises,
                1100
            );

        }

    });

});


function completePromises() {

    promiseCards.forEach((card, index) => {

        const angle =
            (index % 2 === 0 ? -1 : 1);

        card.style.setProperty(
            "--fly-x",
            `${angle * (100 + Math.random() * 200)}px`
        );

        card.style.setProperty(
            "--fly-y",
            `${-100 - Math.random() * 250}px`
        );

        card.classList.add("fly-away");

    });

    setTimeout(() => {

        loveEnding.classList.add("show");

        createBigHeartBurst();

    }, 800);

}


promiseNextBtn.addEventListener(
    "click",
    () => {

        loveEnding.classList.remove("show");

        setTimeout(() => {
            goToScene("scene-rose");
        }, 400);

    }
);


/* =========================================================
   SCENE 10 — LETTER
========================================================= */

const letterWrapper =
    document.getElementById("letterWrapper");

const finalMessage =
    document.getElementById("finalMessage");


let letterOpened = false;


letterWrapper.addEventListener(
    "click",
    () => {

        if (letterOpened) return;

        letterOpened = true;

        letterWrapper.classList.add("open");

        setTimeout(() => {

            finalMessage.classList.add("show");

            createBigHeartBurst();

        }, 2800);

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key >= "0" &&
            event.key <= "9"
        ) {

            if (
                document
                    .getElementById("scene-passcode")
                    .classList.contains("active")
            ) {

                if (enteredCode.length < 4) {

                    enteredCode += event.key;

                    updatePasswordDisplay();

                    if (enteredCode.length === 4) {
                        setTimeout(checkPassword, 200);
                    }

                }

            }

        }

        if (
            event.key === "Backspace" &&
            document
                .getElementById("scene-passcode")
                .classList.contains("active")
        ) {

            enteredCode =
                enteredCode.slice(0, -1);

            updatePasswordDisplay();

        }

        if (
            event.key === "Escape" &&
            document
                .getElementById("scene-passcode")
                .classList.contains("active")
        ) {

            resetPassword();

        }

    }
);


/* =========================================================
   PRELOAD IMPORTANT IMAGES
========================================================= */

const preloadImages = [

    "https://hi52toys.com/cdn/shop/files/crayon-shin-chan-minime-series-lazy-chill-series.webp?v=1786116166",

    "https://i.pinimg.com/564x/6a/42/69/6a4269b6b161235329382215c7a6c829.jpg",

    "https://cdn.avasflowers.net/img/prod_img/avasflowers-spring-tulips-20-stems-16531.png",

    "https://storage.googleapis.com/regalflowers-cdn/products/imgregal-red-roses-and-million-stars-30roses-po044edsyh0cev86l9rjz9.jpg",

    "https://www.surprose.com/media/catalog/product/cache/a003019ba7fcb54fff9e7f7465db6631/s/i/single-red-rose-in-a-matching-bouquet-8720174082382-bb.jpg"

];


preloadImages.forEach(src => {

    const img =
        new Image();

    img.src = src;

});


/* =========================================================
   STARTUP
========================================================= */

updatePasswordDisplay();

console.log(
    "Diya's birthday website loaded ❤️"
);


/* =====================================================
   DIYA'S CUTE DECORATION PACK 💗
   ADD TO THE END OF haha.js — KEEP ORIGINAL JS
===================================================== */

(() => {
    "use strict";

    const photos = {
        passcode: [
            {
                src: "https://media.tenor.com/-txg_rKqGF0AAAAM/cute-mochi-mochi-peach-cat.gif",
                pos: "left:2%;top:13%",
                shape: "round"
            },
            {
                src: "https://media.tenor.com/3TNNdGvibb8AAAAM/cat-pookie.gif",
                pos: "right:2%;bottom:11%",
                shape: "round"
            },
            {
                src: "https://www.google.com/imgres?q=cute%20pookie%20cat%20gifs&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe7%2F19%2Ffb%2Fe719fb30d491a497a94128bc124229e7.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F1146799492607040375%2F&docid=mIY-bV0I2MoiKM&tbnid=dM5Uyvj7cJ6pYM&vet=12ahUKEwjOuvH3i6yXAxU9XmwGHX5YDi4QnPAOegQINhAA..i&w=720&h=714&hcb=2&ved=2ahUKEwjOuvH3i6yXAxU9XmwGHX5YDi4QnPAOegQINhAA",
                pos: "right:4%;top:13%",
                shape: "sticker"
            }
        ],

        game: [
            {
                src: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=122271805646027178",
                pos: "left:2%;top:11%",
                shape: "round"
            },
            {
                src: "https://wallpaperaccess.com/full/7773141.jpg",
                pos: "right:2%;top:17%",
                shape: "sticker"
            },
            {
                src: "https://images.teepublic.com/derived/production/designs/5147845_0/1561369984/i_m:pid_1918,c_s_auto,bc_ffffff,s_630,q_90.jpg",
                pos: "left:3%;bottom:8%",
                shape: "sticker"
            }
        ],

        bouquet: [
            {
                src: "https://i.pinimg.com/736x/e7/c1/1e/e7c11e7ce65894aa648b784ddb4d5fc7.jpg",
                pos: "left:2%;top:10%",
                shape: "round"
            },
            {
                src: "https://i.pinimg.com/236x/19/56/42/19564236d6cbe102ddf3ebf5767bb98a.jpg",
                pos: "right:2%;bottom:10%",
                shape: "sticker"
            },
            {
                src: "https://media.tenor.com/C-ZraRpWG2sAAAAm/cat-flowers.webp",
                pos: "right:3%;top:10%",
                shape: "round"
            }
        ],

        cake: [
            {
                src: "https://i.pinimg.com/736x/3d/1e/aa/3d1eaaa997a3b2bbad870f31f04725f8.jpg",
                pos: "left:2%;top:12%",
                shape: "round"
            },
            {
                src: "https://media.istockphoto.com/id/1480887486/vector/cute-adorable-playful-kitten-cat-sit-on-present-box-meowy-birthday-cheerful-pet-animal.jpg?s=612x612&w=0&k=20&c=qUVglUReiqM0Yx6bxkPfaAX7_tBhPsaAlPzcqpkeHuA=",
                pos: "right:2%;top:15%",
                shape: "sticker"
            },
            {
                src: "https://thumbs.dreamstime.com/b/cute-cat-birthday-cupcake-series-kawaii-animals-kitten-isolated-white-background-cute-cat-birthday-cupcake-series-kawaii-274955138.jpg",
                pos: "left:3%;bottom:9%",
                shape: "round"
            }
        ],

        rose: [
            {
                src: "https://w0.peakpx.com/wallpaper/271/174/HD-wallpaper-shinchan-with-rose-in-mouth-standing-in-white-background-shinchan.jpg",
                pos: "left:2%;top:10%",
                shape: "sticker"
            },
            {
                src: "https://i.pinimg.com/736x/5f/e8/81/5fe8816482d78cf24a3bbf99d16414e4.jpg",
                pos: "right:2%;bottom:8%",
                shape: "round"
            }
        ],

        video: [
            {
                src: "https://m.media-amazon.com/images/S/pv-target-images/d7b8e6c2bf144475ce6135bb0355d2637b9809d11857fbd255a0fc058d6509eb.jpg",
                pos: "left:1%;top:10%",
                shape: "sticker"
            },
            {
                src: "https://static.wikia.nocookie.net/motu-patlu/images/9/98/Profile_patlu.png/revision/latest/scale-to-width/360?cb=20170908001452",
                pos: "right:1%;top:12%",
                shape: "round"
            },
            {
                src: "https://static.wikia.nocookie.net/youtube/images/0/04/OGGY.jpg/revision/latest?cb=20220129070731",
                pos: "left:2%;bottom:9%",
                shape: "round"
            },
            {
                src: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100070464103174",
                pos: "right:2%;bottom:8%",
                shape: "sticker"
            },
            {
                src: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2246731912048154",
                pos: "left:12%;top:29%",
                shape: "round"
            },
            {
                src: "https://i.pinimg.com/474x/69/f6/7f/69f67f4a56b1a6b5ccb93c634a0751ee.jpg",
                pos: "right:12%;top:32%",
                shape: "sticker"
            },
            {
                src: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
                pos: "left:3%;top:52%",
                shape: "round"
            },
            {
                src: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png",
                pos: "right:3%;top:52%",
                shape: "round"
            },
            {
                src: "https://static.wikia.nocookie.net/p__/images/8/8d/LS_Pose_21.png/revision/latest/thumbnail/width/360/height/360?cb=20230410012953&path-prefix=protagonist",
                pos: "left:13%;bottom:6%",
                shape: "sticker"
            },
            {
                src: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100068254253414",
                pos: "right:13%;bottom:6%",
                shape: "round"
            }
        ]
    };

    const chocolatePhotos = [
        "https://flowerstonepal.com/cdn/shop/files/cadbury-dairy-milk-silk-chocolate-55g-1833127.jpg?v=1772303648",
        "https://cdn11.bigcommerce.com/s-tgrcca6nho/images/stencil/1280w/products/33397/169718/8901058903164__59221.1785729316.jpg"
    ];

    function makeLayer(scene, waiting = false) {
        if (!scene) return null;

        let layer = scene.querySelector(":scope > .cute-deco-layer");

        if (!layer) {
            layer = document.createElement("div");
            layer.className = "cute-deco-layer";
            layer.setAttribute("aria-hidden", "true");
            scene.prepend(layer);
        }

        if (waiting) layer.classList.add("bouquet-waiting");
        return layer;
    }

    function addBubbles(sceneId, list, options = {}) {
        const scene = document.getElementById(sceneId);
        if (!scene || scene.dataset.cuteDecorated === "yes") return;

        scene.dataset.cuteDecorated = "yes";

        const layer = makeLayer(scene, options.waiting);
        if (!layer) return;

        list.forEach((item, index) => {
            const bubble = document.createElement("div");
            bubble.className = "cute-bubble " +
                (item.shape === "round" ? "round" : "bubble-sticker");

            bubble.style.cssText = item.pos;
            bubble.style.setProperty("--duration", `${5.5 + index * 0.8}s`);
            bubble.style.setProperty("--delay", `${index * -1.3}s`);
            bubble.style.setProperty("--drift-x", `${index % 2 ? -20 : 20}px`);
            bubble.style.setProperty("--drift-y", `${index % 2 ? -25 : 18}px`);
            bubble.style.setProperty("--drift-x2", `${index % 2 ? 15 : -15}px`);
            bubble.style.setProperty("--drift-y2", `${index % 2 ? 20 : -20}px`);

            const img = document.createElement("img");
            img.src = item.src;
            img.alt = "";
            img.loading = "lazy";
            img.draggable = false;
            img.onerror = () => bubble.remove();

            bubble.appendChild(img);
            layer.appendChild(bubble);
        });

        ["💕", "✨", "💗", "♡"].forEach((symbol, index) => {
            const sparkle = document.createElement("span");
            sparkle.className = "cute-floating-symbol";
            sparkle.textContent = symbol;
            sparkle.style.left = `${18 + index * 21}%`;
            sparkle.style.top = `${25 + (index % 2) * 42}%`;
            sparkle.style.animationDelay = `${index * -0.8}s`;
            layer.appendChild(sparkle);
        });

        return layer;
    }

    /* First page: pookie cats */
    addBubbles("scene-passcode", photos.passcode);

    /* Second page: Shinchan bubbles around the game */
    addBubbles("scene-game", photos.game);

    /* Bouquet: hidden until the gift opens */
    const bouquetLayer = addBubbles(
        "scene-bouquet",
        photos.bouquet,
        { waiting: true }
    );

    function watchBouquetReveal() {
        const reveal = document.getElementById("bouquetReveal");
        if (!reveal || !bouquetLayer) return;

        const update = () => {
            const opened = reveal.classList.contains("show");
            bouquetLayer.classList.toggle("bouquet-waiting", !opened);
        };

        update();

        new MutationObserver(update).observe(reveal, {
            attributes: true,
            attributeFilter: ["class"]
        });
    }

    watchBouquetReveal();

    /* Cake and rose decorations */
    addBubbles("scene-cake", photos.cake);
    addBubbles("scene-rose", photos.rose);

    /* Cartoon bubbles behind the video — video stays untouched */
    addBubbles("scene-video", photos.video);

    /* Birthday chocolate rain */
    let chocolateRainActive = false;
    let chocolateRainTimer = null;

    function startChocolateRain() {
        if (chocolateRainActive) return;
        chocolateRainActive = true;

        let count = 0;
        const maxDrops = 32;

        chocolateRainTimer = setInterval(() => {
            const scene = document.getElementById("scene-chocolate");

            if (!scene || !scene.classList.contains("active")) {
                clearInterval(chocolateRainTimer);
                chocolateRainActive = false;
                return;
            }

            const candy = document.createElement("img");
            candy.className = "cute-chocolate-drop";
            candy.src = chocolatePhotos[count % chocolatePhotos.length];
            candy.alt = "";
            candy.draggable = false;
            candy.style.left = `${Math.random() * 92}vw`;
            candy.style.setProperty(
                "--fall-duration",
                `${4 + Math.random() * 3}s`
            );
            candy.style.setProperty(
                "--sway",
                `${Math.random() * 120 - 60}px`
            );
            candy.onerror = () => candy.remove();

            document.body.appendChild(candy);
            setTimeout(() => candy.remove(), 8000);

            count++;

            if (count >= maxDrops) {
                clearInterval(chocolateRainTimer);
                chocolateRainActive = false;
            }
        }, 240);
    }

    /* Wrong-passcode popups: first two wrong attempts, then the joke */
    let wrongAttempts = 0;
    let popupOpen = false;

    function showWrongPopup() {
        if (popupOpen) return;
        popupOpen = true;

        const overlay = document.createElement("div");
        overlay.className = "cute-wrong-overlay";

        const card = document.createElement("div");
        card.className = "cute-wrong-card";

        if (wrongAttempts === 1) {
            const img = document.createElement("img");
            img.src = "https://i.pinimg.com/474x/5d/86/e5/5d86e54c12415553710b449d29074aea.jpg";
            img.alt = "Sad pookie cat";
            card.appendChild(img);

            const heading = document.createElement("h2");
            heading.textContent = "Wrong password? 🥺";
            card.appendChild(heading);

            const text = document.createElement("p");
            text.textContent = "Pookie is sad... try again, baby! 💗";
            card.appendChild(text);
        } else if (wrongAttempts === 2) {
            const img = document.createElement("img");
            img.src = "https://i.pinimg.com/474x/5d/86/e5/5d86e54c12415553710b449d29074aea.jpg";
            img.alt = "Very sad pookie cat";
            card.appendChild(img);

            const heading = document.createElement("h2");
            heading.textContent = "Again?! 😭💔";
            card.appendChild(heading);

            const text = document.createElement("p");
            text.textContent = "One more try, my love! Don't make the cat cry.";
            card.appendChild(text);
        } else {
            const heading = document.createElement("h2");
            heading.textContent = "ASK TO YOUR HUSBAND 😼💗";
            card.appendChild(heading);

            const text = document.createElement("p");
            text.textContent = "Your husband knows the secret, pookie! 💍💕";
            card.appendChild(text);
        }

        const button = document.createElement("button");
        button.className = "cute-try-again";
        button.textContent = "TRY AGAIN ❤️";
        button.addEventListener("click", () => {
            overlay.remove();
            popupOpen = false;

            if (typeof resetPassword === "function") {
                resetPassword();
            }
        });

        card.appendChild(button);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }

    /*
      Wrap the existing checkPassword function instead of replacing
      its original logic. The original function still checks the code.
    */
    if (typeof window.checkPassword === "function") {
        const originalCheckPassword = window.checkPassword;

        window.checkPassword = function () {
            const codeWasWrong =
                typeof enteredCode === "string" &&
                enteredCode.length === 4 &&
                enteredCode !== correctPasscode;

            originalCheckPassword.apply(this, arguments);

            if (codeWasWrong) {
                wrongAttempts++;
                setTimeout(showWrongPopup, 30);
            } else {
                wrongAttempts = 0;
            }
        };
    }

    /* Watch scene changes so chocolate rain starts only on that page */
    function checkChocolateScene() {
        const scene = document.getElementById("scene-chocolate");

        if (scene && scene.classList.contains("active")) {
            startChocolateRain();
        }
    }

    document.querySelectorAll(".scene").forEach(scene => {
        new MutationObserver(checkChocolateScene).observe(scene, {
            attributes: true,
            attributeFilter: ["class"]
        });
    });

    checkChocolateScene();
})();