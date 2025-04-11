import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingSearch from "../components/BookingSearch.jsx";

const BookingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/auth");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <BookingSearch />
            </div>
        </div>
    );
};

export default BookingPage; 