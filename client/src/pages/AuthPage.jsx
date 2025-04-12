
import Authform from '../components/AuthForm.jsx';

const AuthPage = ({ setIsLoggedIn }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20">
            <Authform setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
};

export default AuthPage;
