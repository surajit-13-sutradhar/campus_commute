import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BulkBookingPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        date: "",
        time: "",
        numberOfBuses: 1,
        numberOfStudents: 0,
        reason: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/auth");
                return;
            }

            // Combine date and time into a single datetime
            const departureDateTime = new Date(`${form.date}T${form.time}`);
            
            await axios.post(
                `${import.meta.env.VITE_API_URL}/bookings/bulk`,
                {
                    ...form,
                    departureDateTime,
                    numberOfStudents: parseInt(form.numberOfStudents, 10),
                    numberOfBuses: parseInt(form.numberOfBuses, 10)
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            alert("Bulk booking request submitted successfully!");
            navigate("/dashboard");
        } catch (err) {
            console.error('Bulk booking error:', err);
            setError(err.response?.data?.error || "Failed to submit bulk booking request");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Calculate minimum date (2 days from today)
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    const minDateString = minDate.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Bulk Booking Request</h1>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date of Travel
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                min={minDateString}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Time of Departure
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Number of Buses Required
                            </label>
                            <input
                                type="number"
                                name="numberOfBuses"
                                value={form.numberOfBuses}
                                onChange={handleChange}
                                min="1"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Number of Students
                            </label>
                            <input
                                type="number"
                                name="numberOfStudents"
                                value={form.numberOfStudents}
                                onChange={handleChange}
                                min="1"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Reason for Booking
                            </label>
                            <textarea
                                name="reason"
                                value={form.reason}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Please provide details about the event or purpose of travel"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BulkBookingPage; 