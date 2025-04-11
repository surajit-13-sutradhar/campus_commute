import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [bulkBookings, setBulkBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/auth");
                    return;
                }

                const [regularBookings, bulkBookings] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_API_URL}/bookings/user`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    ),
                    axios.get(
                        `${import.meta.env.VITE_API_URL}/bookings/bulk`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    )
                ]);

                setBookings(regularBookings.data);
                setBulkBookings(bulkBookings.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError(err.response?.data?.error || "Failed to fetch bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-xl">Loading your bookings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
                
                {bulkBookings.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bulk Bookings</h2>
                        <div className="grid gap-6">
                            {bulkBookings.map((booking) => (
                                <div key={booking.id} className="bg-white shadow rounded-lg p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {booking.numberOfBuses} Buses for {booking.numberOfStudents} Students
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                Departure: {new Date(booking.departure).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Reason: {booking.reason}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                booking.status === 'APPROVED' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : booking.status === 'PENDING'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Regular Bookings</h2>
                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">You haven't made any regular bookings yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white shadow rounded-lg p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {booking.vehicle.name}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            Route: {booking.vehicle.route}
                                        </p>
                                        <p className="text-gray-600">
                                            Departure: {new Date(booking.vehicle.departure).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            booking.status === 'CONFIRMED' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage; 