import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/me`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            );
            setUserRole(response.data.role);
        } catch (err) {
            console.error('Error fetching user role:', err);
        }
        };

        if (isLoggedIn) {
        fetchUserRole();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        console.log('Logging out...');
        console.log('Token before removal:', localStorage.getItem("token"));
        localStorage.removeItem("token");
        console.log('Token after removal:', localStorage.getItem("token"));
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600 tracking-wider">
                        KhogenCommute
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                        <>
                            <Link
                            to="/booking"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                            Book a Ride
                            </Link>
                            {(userRole === "CLUB_SECY" || userRole === "FACULTY") && (
                            <Link
                                to="/bulk-booking"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                                Book for a Day
                            </Link>
                            )}
                            <Link
                            to="/dashboard"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                            Dashboard
                            </Link>
                            <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                            Logout
                            </button>
                        </>
                        ) : (
                        <Link
                            to="/auth"
                            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login/Signup
                        </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
