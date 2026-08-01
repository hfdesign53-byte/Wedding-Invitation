document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // LENIS SMOOTH SCROLL
    // ===============================
    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ===============================
    // ELEMENT
    // ===============================
    const openBtn = document.getElementById("btn-open");
    const music = document.getElementById("bg-Music2");
    const overlay = document.getElementById("opening-overlay");

    // RSVP
    const btnRSVP = document.getElementById("btn-rsvp");
    const popupRSVP = document.getElementById("rsvp-popup");
    const closeRSVP = document.getElementById("close-rsvp");

    // ===============================
    // GUEST NAME
    // ===============================
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get("to");
    const guestElement = document.getElementById("guest-name");

    if (guest && guestElement) {
        guestElement.textContent = decodeURIComponent(guest);
    } else if (guestElement) {
        guestElement.textContent = "TAMU UNDANGAN";
    }

    // ===============================
    // OPEN INVITATION
    // ===============================
    if (openBtn && overlay) {

        openBtn.addEventListener("click", () => {

            if (music) {
                music.volume = 0.5;
                music.play().catch(() => {});
            }

            gsap.to(".overlay-content", {
                y: -100,
                opacity: 0,
                duration: 1
            });

            gsap.to(overlay, {
                yPercent: -100,
                duration: 1.5,
                delay: 0.5,
                onComplete: () => {
                    overlay.style.display = "none";
                    initMainAnimations();
                }
            });

        });

    }

    // ===============================
    // RSVP POPUP
    // ===============================
    if (btnRSVP && popupRSVP) {

        btnRSVP.addEventListener("click", () => {
            popupRSVP.classList.add("active");
        });

        if (closeRSVP) {
            closeRSVP.addEventListener("click", () => {
                popupRSVP.classList.remove("active");
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === popupRSVP) {
                popupRSVP.classList.remove("active");
            }
        });

    }

    // ===============================
    // GSAP ANIMATION
    // ===============================
    gsap.registerPlugin(ScrollTrigger);

    function initMainAnimations() {

        gsap.to(".hero-bg", {
            scale: 1,
            duration: 3
        });

        document.querySelectorAll(".reveal-up").forEach((el) => {

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%"
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                immediateRender: false
            });

        });

        gsap.from(".fade-up", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });

    }

    // ===============================
    // COUNTDOWN
    // ===============================
    const targetDate = new Date("2026-09-05T00:00:00").getTime();

    setInterval(() => {

        const now = new Date().getTime();
        const diff = targetDate - now;

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (!dEl || !hEl || !mEl || !sEl) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        dEl.textContent = String(d).padStart(2, "0");
        hEl.textContent = String(h).padStart(2, "0");
        mEl.textContent = String(m).padStart(2, "0");
        sEl.textContent = String(s).padStart(2, "0");

    }, 1000);

});

// ===============================
// COPY REKENING
// ===============================
function copyRekening(id) {

    const rekening = document.getElementById(id).innerText;

    navigator.clipboard.writeText(rekening);

    alert("Nomor rekening berhasil disalin");

}

// ===============================
// GALLERY LIGHTBOX
// ===============================
function openLightbox(img) {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.classList.add("show");
    lightboxImg.src = img.src;
}

function closeLightbox() {

    document.getElementById("lightbox").classList.remove("show");

}