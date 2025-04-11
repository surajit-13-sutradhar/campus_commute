import AuthForm from "./components/Authform.jsx"
import BookingSearch from "./components/BookingSearch.jsx"
import './App.css'

function App() {
    const isLoggedIn = !!localStorage.getItem("token")

    return (
        <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold py-6">CampusCommute 🚍</h1>

        {isLoggedIn ? (
                <BookingSearch />
        ) : (
            <div className="max-w-md mx-auto">
                <AuthForm />
            </div>
        )}
    </div>
    )
}

export default App
