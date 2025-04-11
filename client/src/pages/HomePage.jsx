import { Link } from "react-router-dom";


const HomePage = ({ isLoggedIn }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            Welcome to <span className="text-blue-600">KhogenCommute</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Book buses and autos for your daily commute or special events.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-blue-600">Regular Bookings</h3>
                        <p className="mt-2 text-gray-500">
                            Book individual seats on buses or autos for your daily commute.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-blue-600">Bulk Bookings</h3>
                        <p className="mt-2 text-gray-500">
                            For faculty and club secretaries - book multiple vehicles for events and trips.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-blue-600">Easy Management</h3>
                        <p className="mt-2 text-gray-500">
                            View and manage all your bookings in one place through your dashboard.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-blue-600">Run Ads</h3>
                        <p className="mt-2 text-gray-500">
                            Run your ads on our buses and autos to reach a wider audience.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        {isLoggedIn ? (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900">Ready to book your ride?</h2>
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        to="/booking"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Book a Ride
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                                    >
                                        View Dashboard
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900">Get started with KhogenCommute</h2>
                                <Link
                                    to="/auth"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Login / Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
