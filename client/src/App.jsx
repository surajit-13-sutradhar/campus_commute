import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import BookingPage from "./pages/BookingPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import BulkBookingPage from "./pages/BulkBookingPage.jsx"
import "./App.css"

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("token");
    return isLoggedIn ? children : <Navigate to="/auth" />;
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    
    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
                <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route 
                    path="/booking" 
                    element={
                        <ProtectedRoute>
                            <BookingPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/bulk-booking" 
                    element={
                        <ProtectedRoute>
                            <BulkBookingPage />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    )
}

export default App
