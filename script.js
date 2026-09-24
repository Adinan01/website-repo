// =====================================================
// BULLETRIDE - BIKE RENTAL JAVASCRIPT
// =====================================================


// ================= BIKE DATABASE =================

const bikes = {

    classic350: {
        id: "classic350",
        name: "Royal Enfield Classic 350",
        category: "Classic",
        engine: "349cc",
        power: "20.2 HP",
        torque: "27 Nm",
        mileage: "35 km/l",
        transmission: "5 Speed Manual",
        fuel: "Petrol",
        seats: 2,
        topSpeed: "114 km/h",
        rent: 999,
        deposit: 3000,
        kmLimit: 150,
        extraKm: 8,
        rating: 4.8,
        color: "Black",
        description:
            "A timeless motorcycle with a relaxed riding position, classic styling and smooth 349cc engine."
    },

    hunter350: {
        id: "hunter350",
        name: "Royal Enfield Hunter 350",
        category: "Roadster",
        engine: "349cc",
        power: "20.2 HP",
        torque: "27 Nm",
        mileage: "36 km/l",
        transmission: "5 Speed Manual",
        fuel: "Petrol",
        seats: 2,
        topSpeed: "114 km/h",
        rent: 899,
        deposit: 3000,
        kmLimit: 150,
        extraKm: 8,
        rating: 4.7,
        color: "Green",
        description:
            "A compact and agile roadster designed for city rides and weekend trips."
    },

    meteor350: {
        id: "meteor350",
        name: "Royal Enfield Meteor 350",
        category: "Cruiser",
        engine: "349cc",
        power: "20.2 HP",
        torque: "27 Nm",
        mileage: "35 km/l",
        transmission: "5 Speed Manual",
        fuel: "Petrol",
        seats: 2,
        topSpeed: "114 km/h",
        rent: 1099,
        deposit: 3500,
        kmLimit: 150,
        extraKm: 8,
        rating: 4.8,
        color: "Red",
        description:
            "A comfortable cruiser made for long-distance rides and relaxed highway touring."
    },

    bullet350: {
        id: "bullet350",
        name: "Royal Enfield Bullet 350",
        category: "Classic",
        engine: "349cc",
        power: "20.2 HP",
        torque: "27 Nm",
        mileage: "35 km/l",
        transmission: "5 Speed Manual",
        fuel: "Petrol",
        seats: 2,
        topSpeed: "110 km/h",
        rent: 949,
        deposit: 3000,
        kmLimit: 150,
        extraKm: 8,
        rating: 4.9,
        color: "Black",
        description:
            "The iconic Bullet experience with classic styling and a modern 349cc platform."
    },

    himalayan450: {
        id: "himalayan450",
        name: "Royal Enfield Himalayan 450",
        category: "Adventure",
        engine: "452cc",
        power: "40 HP",
        torque: "40 Nm",
        mileage: "30 km/l",
        transmission: "6 Speed Manual",
        fuel: "Petrol",
        seats: 2,
        topSpeed: "140 km/h",
        rent: 1699,
        deposit: 5000,
        kmLimit: 200,
        extraKm: 10,
        rating: 4.9,
        color: "Grey",
        description:
            "An adventure motorcycle built for touring, mountain roads and challenging terrain."
    },

    interceptor650: {
        id: "interceptor650",
        name: "Royal Enfield Interceptor 650",
        category: "Roadster",
        engine: "648cc",
        power: "47 HP",
        torque: "52 Nm",
        mileage: "25 km/l",
        transmission: "6 Speed Manual",
        fuel: "Petrol",
        seats: 2,
        topSpeed: "160 km/h",
        rent: 1899,
        deposit: 5000,
        kmLimit: 200,
        extraKm: 12,
        rating: 4.9,
        color: "Chrome",
        description:
            "A powerful twin-cylinder roadster designed for highway cruising and performance."
    }

};


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let selectedBike = null;
let rentalDays = 1;
let totalRental = 0;
let extraKmCharge = 0;
let helmetCharge = 0;


// =====================================================
// GET BIKE
// =====================================================

function getBike(bikeId) {

    if (!bikes[bikeId]) {
        console.error("Bike not found:", bikeId);
        return null;
    }

    return bikes[bikeId];
}


// =====================================================
// FORMAT MONEY
// =====================================================

function formatMoney(amount) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);

}


// =====================================================
// CALCULATE RENTAL DAYS
// =====================================================

function calculateRentalDays(startDate, endDate) {

    if (!startDate || !endDate) {
        return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
        return 0;
    }

    const difference =
        end.getTime() - start.getTime();

    let days =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

    if (days === 0) {
        days = 1;
    }

    return days;

}


// =====================================================
// CALCULATE RENTAL PRICE
// =====================================================

function calculateRentalPrice() {

    if (!selectedBike) {
        return;
    }

    const baseRent =
        selectedBike.rent * rentalDays;

    const securityDeposit =
        selectedBike.deposit;

    totalRental =
        baseRent +
        securityDeposit +
        helmetCharge +
        extraKmCharge;

    updatePriceDisplay();

}


// =====================================================
// UPDATE PRICE DISPLAY
// =====================================================

function updatePriceDisplay() {

    const basePriceElement =
        document.getElementById("basePrice");

    const depositElement =
        document.getElementById("securityDeposit");

    const extraKmElement =
        document.getElementById("extraKmCharge");

    const helmetElement =
        document.getElementById("helmetCharge");

    const totalElement =
        document.getElementById("totalPrice");


    if (basePriceElement) {

        basePriceElement.textContent =
            formatMoney(
                selectedBike.rent * rentalDays
            );

    }


    if (depositElement) {

        depositElement.textContent =
            formatMoney(
                selectedBike.deposit
            );

    }


    if (extraKmElement) {

        extraKmElement.textContent =
            formatMoney(
                extraKmCharge
            );

    }


    if (helmetElement) {

        helmetElement.textContent =
            formatMoney(
                helmetCharge
            );

    }


    if (totalElement) {

        totalElement.textContent =
            formatMoney(
                totalRental
            );

    }

}


// =====================================================
// SELECT BIKE
// =====================================================

function selectBike(bikeId) {

    const bike =
        getBike(bikeId);

    if (!bike) return;

    selectedBike = bike;

    console.log(
        "Selected Bike:",
        selectedBike.name
    );


    // Update select box

    const bikeSelect =
        document.getElementById("bikeSelect");

    if (bikeSelect) {

        bikeSelect.value =
            bikeId;

    }


    calculateRentalPrice();

}


// =====================================================
// BIKE DETAILS MODAL
// =====================================================

function showBikeDetails(bikeId) {

    const bike =
        getBike(bikeId);

    if (!bike) return;


    const modal =
        document.getElementById("bikeModal");

    if (!modal) return;


    document.getElementById("modalBikeName")
        .textContent = bike.name;

    document.getElementById("modalEngine")
        .textContent = bike.engine;

    document.getElementById("modalPower")
        .textContent = bike.power;

    document.getElementById("modalTorque")
        .textContent = bike.torque;

    document.getElementById("modalMileage")
        .textContent = bike.mileage;

    document.getElementById("modalTransmission")
        .textContent = bike.transmission;

    document.getElementById("modalTopSpeed")
        .textContent = bike.topSpeed;

    document.getElementById("modalFuel")
        .textContent = bike.fuel;

    document.getElementById("modalRent")
        .textContent =
            formatMoney(bike.rent) + " / day";

    document.getElementById("modalDeposit")
        .textContent =
            formatMoney(bike.deposit);

    document.getElementById("modalRating")
        .textContent =
            "★ " + bike.rating;

    document.getElementById("modalDescription")
        .textContent =
            bike.description;


    modal.classList.add("active");

}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeBikeModal() {

    const modal =
        document.getElementById("bikeModal");

    if (modal) {

        modal.classList.remove("active");

    }

}


// =====================================================
// BOOK BIKE BUTTONS
// =====================================================

document
    .querySelectorAll(".book-bike")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const bikeId =
                    button.dataset.bikeId;

                selectBike(bikeId);

                document
                    .getElementById("booking")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


// =====================================================
// BIKE DETAILS BUTTONS
// =====================================================

document
    .querySelectorAll(".details-bike")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const bikeId =
                    button.dataset.bikeId;

                showBikeDetails(bikeId);

            }
        );

    });


// =====================================================
// BIKE SELECT CHANGE
// =====================================================

const bikeSelect =
    document.getElementById("bikeSelect");

if (bikeSelect) {

    bikeSelect.addEventListener(
        "change",
        function() {

            selectBike(
                this.value
            );

        }
    );

}


// =====================================================
// DATE ELEMENTS
// =====================================================

const pickupDate =
    document.getElementById("pickupDate");

const returnDate =
    document.getElementById("returnDate");


// Set today's date

const today =
    new Date()
        .toISOString()
        .split("T")[0];


if (pickupDate) {

    pickupDate.min = today;

}


if (returnDate) {

    returnDate.min = today;

}


// =====================================================
// PICKUP DATE CHANGE
// =====================================================

if (pickupDate) {

    pickupDate.addEventListener(
        "change",
        function() {

            if (returnDate) {

                returnDate.min =
                    this.value;

            }

            updateRentalDates();

        }
    );

}


// =====================================================
// RETURN DATE CHANGE
// =====================================================

if (returnDate) {

    returnDate.addEventListener(
        "change",
        function() {

            updateRentalDates();

        }
    );

}


// =====================================================
// UPDATE RENTAL DATES
// =====================================================

function updateRentalDates() {

    rentalDays =
        calculateRentalDays(
            pickupDate?.value,
            returnDate?.value
        );


    if (rentalDays > 0) {

        const daysElement =
            document.getElementById(
                "rentalDays"
            );

        if (daysElement) {

            daysElement.textContent =
                rentalDays +
                (rentalDays === 1
                    ? " Day"
                    : " Days");

        }

    }


    calculateRentalPrice();

}


// =====================================================
// ESTIMATED KM
// =====================================================

const estimatedKm =
    document.getElementById(
        "estimatedKm"
    );


if (estimatedKm) {

    estimatedKm.addEventListener(
        "input",
        function() {

            calculateExtraKm();

        }
    );

}


// =====================================================
// EXTRA KM CALCULATION
// =====================================================

function calculateExtraKm() {

    if (!selectedBike) return;


    const km =
        Number(
            estimatedKm?.value || 0
        );


    if (
        km >
        selectedBike.kmLimit *
        rentalDays
    ) {

        const extra =
            km -
            (
                selectedBike.kmLimit *
                rentalDays
            );


        extraKmCharge =
            extra *
            selectedBike.extraKm;

    } else {

        extraKmCharge = 0;

    }


    calculateRentalPrice();

}


// =====================================================
// HELMET SELECTION
// =====================================================

const helmetSelect =
    document.getElementById(
        "helmetSelect"
    );


if (helmetSelect) {

    helmetSelect.addEventListener(
        "change",
        function() {

            const quantity =
                Number(this.value);

            helmetCharge =
                quantity * 50;

            calculateRentalPrice();

        }
    );

}


// =====================================================
// BOOKING FORM
// =====================================================

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (!selectedBike) {

                alert(
                    "Please select a bike."
                );

                return;

            }


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const pickup =
                pickupDate.value;


            const returnDateValue =
                returnDate.value;


            // Validate phone

            if (
                !/^[6-9][0-9]{9}$/.test(
                    phone
                )
            ) {

                alert(
                    "Please enter a valid Indian mobile number."
                );

                return;

            }


            // Validate dates

            rentalDays =
                calculateRentalDays(
                    pickup,
                    returnDateValue
                );


            if (rentalDays === 0) {

                alert(
                    "Please select valid rental dates."
                );

                return;

            }


            calculateRentalPrice();


            // Booking ID

            const bookingId =
                "BR" +
                Date.now()
                    .toString()
                    .slice(-6);


            // Display confirmation

            showBookingConfirmation(
                bookingId,
                name,
                phone,
                selectedBike,
                rentalDays,
                totalRental
            );

        }
    );

}


// =====================================================
// BOOKING CONFIRMATION
// =====================================================

function showBookingConfirmation(
    bookingId,
    name,
    phone,
    bike,
    days,
    total
) {

    const message =
        document.getElementById(
            "bookingMessage"
        );


    if (!message) return;


    message.innerHTML = `

        <div class="booking-success">

            <div class="success-icon">
                ✓
            </div>

            <h3>
                Booking Request Received
            </h3>

            <p>
                Thank you,
                <strong>${name}</strong>.
            </p>

            <div class="booking-summary">

                <p>
                    <strong>Booking ID:</strong>
                    ${bookingId}
                </p>

                <p>
                    <strong>Bike:</strong>
                    ${bike.name}
                </p>

                <p>
                    <strong>Rental:</strong>
                    ${days} day(s)
                </p>

                <p>
                    <strong>Total:</strong>
                    ${formatMoney(total)}
                </p>

            </div>

            <small>
                Our rental team will contact you
                at ${phone}.
            </small>

        </div>

    `;

}


// =====================================================
// RESET BOOKING
// =====================================================

function resetBooking() {

    selectedBike = null;

    rentalDays = 1;

    totalRental = 0;

    extraKmCharge = 0;

    helmetCharge = 0;

    if (bookingForm) {

        bookingForm.reset();

    }

}


// =====================================================
// FILTER BIKES
// =====================================================

function filterBikes(category) {

    const cards =
        document.querySelectorAll(
            ".bike-card"
        );


    cards.forEach(function(card) {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";

        }

    });

}


// =====================================================
// SEARCH BIKES
// =====================================================

function searchBikes() {

    const input =
        document.getElementById(
            "bikeSearch"
        );


    if (!input) return;


    const search =
        input.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".bike-card"
        );


    cards.forEach(function(card) {

        const name =
            card.dataset.name
                ?.toLowerCase();


        if (
            !search ||
            name?.includes(search)
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";

        }

    });

}


// =====================================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =====================================================

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "bikeModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeBikeModal();

        }

    }
);


// =====================================================
// ESC KEY CLOSE MODAL
// =====================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeBikeModal();

        }

    }
);


// =====================================================
// INITIAL LOAD
// =====================================================

console.log(
    "BulletRide Rental System Loaded"
);

console.log(
    "Available Bikes:",
    Object.keys(bikes)
);
