import { useState } from "react";
import axios from "axios";

const BookingSearch = () => {
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("B");
  const [time, setTime] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicles/search`,
        { params: { start, end, time } }
      );
      setResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.error || "Failed to search vehicles");
    } finally {
      setLoading(false);
    }
  };

  const bookVehicle = async (vehicleId, vehicleType) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated");
      }
      
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        { vehicleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${vehicleType} booked successfully`);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.error || "Failed to book vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Search & Book a Ride</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <input
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Start Point (e.g. A)"
          className="border px-3 py-2 rounded"
        />
        <input
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="End Point (e.g. E)"
          className="border px-3 py-2 rounded"
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={searchVehicles}
          disabled={loading}
          className={`bg-blue-600 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Available Buses</h3>
          {results.buses.map((bus) => (
            <div key={bus.id} className="flex justify-between items-center border p-2 rounded mb-2">
              <div>
                <div className="font-medium">{bus.name}</div>
                <div className="text-sm text-gray-600">
                  Route: {bus.route} | Departure: {new Date(bus.departure).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => bookVehicle(bus.id, "BUS")}
                disabled={loading}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Book
              </button>
            </div>
          ))}

          <h3 className="font-semibold text-lg mt-4 mb-2">Available Autos</h3>
          {results.autos.map((auto) => (
            <div key={auto.id} className="flex justify-between items-center border p-2 rounded mb-2">
              <div>{auto.name}</div>
              <button
                onClick={() => bookVehicle(auto.id, "AUTO")}
                disabled={loading}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingSearch;


