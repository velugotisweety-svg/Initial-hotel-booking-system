import API_URL from "./apiConfig.js";

export async function getHotels() {
    const response = await fetch(`${API_URL}/hotels`);

    if (!response.ok) {
        throw new Error("Unable to fetch hotels");
    }

    return await response.json();
}


export async function getHotelById(id) {
    const response = await fetch(`${API_URL}/hotels/${id}`);

    if (!response.ok) {
        throw new Error("Hotel not found");
    }

    return await response.json();
}


export async function getRoomsByHotelId(hotelId) {
    const response = await fetch(
        `${API_URL}/rooms?hotelId=${hotelId}`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch rooms");
    }

    return await response.json();
}


export async function getAvailableRooms(hotelId) {
    const rooms = await getRoomsByHotelId(hotelId);

    return rooms.filter(room => room.status === "available");
}


export async function createBooking(booking) {
    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    });

    if (!response.ok) {
        throw new Error("Booking failed");
    }

    return await response.json();
}


export async function getBookings() {
    const response = await fetch(`${API_URL}/bookings`);

    if (!response.ok) {
        throw new Error("Unable to fetch bookings");
    }

    return await response.json();
}


export async function cancelBooking(id) {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "cancelled"
        })
    });

    if (!response.ok) {
        throw new Error("Unable to cancel booking");
    }

    return await response.json();
}


export async function updateRoomStatus(roomId, status) {
    const response = await fetch(`${API_URL}/rooms/${roomId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    });

    if (!response.ok) {
        throw new Error("Unable to update room");
    }

    return await response.json();
}