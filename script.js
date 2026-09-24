// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


// Close mobile menu after clicking a link

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navMenu.classList.remove("active");

    });

});


// ================= BIKE BOOKING BUTTON =================

const bikeButtons = document.querySelectorAll(".book-bike");

const bikeSelect = document.getElementById("bikeSelect");

bikeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const bikeName = button.getAttribute("data-bike");

        if (bikeName.includes("Classic")) {
            bikeSelect.value = "Classic 350";
        }

        else if (bikeName.includes("Hunter")) {
            bikeSelect.value = "Hunter 350";
        }

        else if (bikeName.includes("Meteor")) {
            bikeSelect.value = "Meteor 350";
        }

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ================= DATE VALIDATION =================

const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");


// Set minimum pickup date to today

const today = new Date().toISOString().split("T")[0];

pickupDate.min = today;
returnDate.min = today;


pickupDate.addEventListener("change", function() {

    returnDate.min = pickupDate.value;

});


// ================= BOOKING FORM =================

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const bike =
        bikeSelect.value;

    const pickup =
        pickupDate.value;

    const returnDateValue =
        returnDate.value;

    const message =
        document.getElementById("bookingMessage");


    // Phone validation

    if (!/^[0-9]{10}$/.test(phone)) {

        message.style.color = "red";

        message.innerHTML =
            "Please enter a valid 10-digit phone number.";

        return;
    }


    // Date validation

    if (returnDateValue < pickup) {

        message.style.color = "red";

        message.innerHTML =
            "Return date cannot be before pickup date.";

        return;
    }


    // Calculate rental days

    const start = new Date(pickup);
    const end = new Date(returnDateValue);

    const difference =
        end - start;

    let days =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

    if (days === 0) {
        days = 1;
    }


    // Price

    let price = 0;

    if (bike === "Classic 350") {
        price = 999;
    }

    else if (bike === "Hunter 350") {
        price = 899;
    }

    else if (bike === "Meteor 350") {
        price = 1099;
    }


    const total =
        days * price;


    // Success message

    message.style.color = "green";

    message.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Booking request received!<br><br>

        <strong>${name}</strong>, your
        <strong>${bike}</strong> is requested for
        <strong>${days} day(s)</strong>.

        <br>

        Estimated rental:
        <strong>₹${total.toLocaleString("en-IN")}</strong>
    `;


    // Reset after successful booking

    setTimeout(function() {

        bookingForm.reset();

    }, 500);

});
