import AuthForm from "../components/AuthForm";

const AuthPage = ({ setIsLoggedIn }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20">
            <AuthForm setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
};

export default AuthPage;
