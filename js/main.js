let hotels = [];


// Get hotels from JSON Server
async function loadHotels() {

    try {

        const response =
            await fetch("http://localhost:3000/hotels");

        hotels = await response.json();

        console.log("Hotels:", hotels);

        displayHotels(hotels);

    } catch (error) {

        console.log("Error:", error);

        document.getElementById("hotelContainer").innerHTML =
            "<h3>Unable to load hotels</h3>";
    }
}


// Display hotels
function displayHotels(hotelList) {

    const container =
        document.getElementById("hotelContainer");

    container.innerHTML = "";


    hotelList.forEach(function(hotel) {

        container.innerHTML += `

            <div class="hotel-card">

                <img
                    src="${hotel.image}"
                    alt="${hotel.name}"
                >

                <div class="hotel-content">

                    <h3>
                        ${hotel.name}
                    </h3>

                    <p>
                        Location: ${hotel.location}
                    </p>

                    <p>
                        ⭐ ${hotel.rating}
                    </p>

                    <p>
                        ₹${hotel.price} / night
                    </p>

                    <button
                        onclick="viewHotel('${hotel.id}')">

                        View Hotel

                    </button>

                </div>

            </div>

        `;

    });

}


// Search button
document.getElementById("searchBtn")
    .addEventListener("click", function() {

        const search =
            document.getElementById("searchInput")
                .value
                .toLowerCase();

        const location =
            document.getElementById("locationInput")
                .value
                .toLowerCase();

        const price =
            document.getElementById("maxPrice")
                .value;


        const filtered =
            hotels.filter(function(hotel) {

                const nameMatch =
                    hotel.name
                        .toLowerCase()
                        .includes(search);

                const locationMatch =
                    hotel.location
                        .toLowerCase()
                        .includes(location);

                const priceMatch =
                    price === "" ||
                    hotel.price <= Number(price);


                return (
                    nameMatch &&
                    locationMatch &&
                    priceMatch
                );

            });


        displayHotels(filtered);

    });


// View hotel
function viewHotel(id) {

    window.location.href =
        "details.html?id=" + id;

}


// Make function available to button
window.viewHotel = viewHotel;


// Load hotels
loadHotels();