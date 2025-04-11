import BookingSearch from "../components/BookingSearch";

const HomePage = ({ isLoggedIn }) => {
    return (
        <div className="p-6">
        {isLoggedIn ? (
            <BookingSearch />
        ) : (
            <div className="text-center mt-20">
            <h2 className="text-3xl font-semibold mb-4">Welcome to CampusCommute 🚍</h2>
            <p className="text-lg text-gray-600">
                Please login to book a vehicle or view routes.
            </p>
            </div>
        )}
        </div>
    );
};

export default HomePage;
