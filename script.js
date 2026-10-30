/* =====================================
   1. SELECT HTML ELEMENTS
===================================== */

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");


/* =====================================
   2. OPEN AND CLOSE NAVIGATION MENU
===================================== */

// Open menu
menuButton.addEventListener("click", function () {
    sidebar.classList.add("show");
    overlay.classList.add("show");
});

// Close menu
function hideMenu() {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
}

closeMenu.addEventListener("click", hideMenu);

overlay.addEventListener("click", hideMenu);


// Close menu after clicking a navigation link
const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigationLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        hideMenu();

    });

});


/* =====================================
   3. DISPLAY CURRENT DATE
===================================== */

const currentDate = document.getElementById("currentDate");

const today = new Date();

currentDate.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});


/* =====================================
   4. NOTIFICATION FUNCTION
===================================== */

let toastTimer;

function showMessage(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================
   5. DEMO BUTTON INTERACTIONS
===================================== */

const actionButtons = document.querySelectorAll("[data-action]");

actionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const action = button.dataset.action;

        if (action === "deposit") {

            showMessage(
                "Demo mode: Real deposits are not available."
            );

        }

        else if (action === "withdraw") {

            showMessage(
                "Demo mode: Real withdrawals are not available."
            );

        }

        else if (action === "plan") {

            showMessage(
                "This is a sample investment plan preview."
            );

        }

    });

});


/* =====================================
   6. COPY REFERRAL LINK
===================================== */

const copyButton = document.getElementById("copyButton");

const referralLink = document.getElementById("referralLink");

copyButton.addEventListener("click", async function () {

    try {

        await navigator.clipboard.writeText(referralLink.value);

        showMessage("Demo referral link copied!");

    }

    catch (error) {

        referralLink.select();

        document.execCommand("copy");

        showMessage("Referral link copied!");

    }

});


/* =====================================
   7. KEYBOARD SUPPORT
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        hideMenu();

    }

});


/* =====================================
   8. WEBSITE STARTUP MESSAGE
===================================== */

console.log("VeltaraX frontend loaded successfully.");

console.log("This website is currently running in demo mode.");