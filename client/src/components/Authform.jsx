import { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    idImage: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropzone handler
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setForm((prev) => ({ ...prev, idImage: acceptedFiles[0] }));
      setErrors((prev) => ({ ...prev, idImage: null }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!form.name) {
        newErrors.name = "Name is required";
      }
      if (form.role !== "STUDENT" && !form.idImage) {
        newErrors.idImage = "ID proof is required for non-student roles";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    
    try {
      let data;
      let config = {};

      if (isLogin) {
        console.log('📝 Preparing login data...');
        data = {
          email: form.email,
          password: form.password
        };
        config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        console.log('📤 Login request data:', { email: form.email });
      } else {
        console.log('📝 Preparing signup data...');
        data = new FormData();
        data.append("name", form.name);
        data.append("role", form.role);
        if (form.idImage) {
          data.append("idImage", form.idImage);
        }
        data.append("email", form.email);
        data.append("password", form.password);
        config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        console.log('📤 Signup request data:', { 
          name: form.name, 
          email: form.email, 
          role: form.role,
          hasIdImage: !!form.idImage 
        });
      }

      const url = isLogin
        ? `${import.meta.env.VITE_API_URL}/auth/login`
        : `${import.meta.env.VITE_API_URL}/auth/signup`;
      
      console.log('🌐 Sending request to:', url);

      const response = await axios.post(url, data, config);
      console.log('✅ Server response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log('🔑 Token stored in localStorage');
        setIsLoggedIn(true);
        navigate("/booking");
      } else {
        throw new Error("No token received from server");
      }
    } catch (err) {
      console.error('❌ Authentication error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = "Authentication failed. Please try again.";
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.details) {
        errorMessage = `${err.response.data.error}: ${err.response.data.details}`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
      idImage: null,
    });
    setErrors({});
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
            {isLogin ? "Login" : "Sign Up"}
        </h2>

        {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.submit}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            {!isLogin && (
            <>
                <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={`mb-3 w-full border px-3 py-2 rounded ${errors.name ? 'border-red-500' : ''}`}
                required
                />
                {errors.name && (
                <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                )}
            </>
            )}

            <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`mb-3 w-full border px-3 py-2 rounded ${errors.email ? 'border-red-500' : ''}`}
            required
            />
            {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
            )}

            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`mb-3 w-full border px-3 py-2 rounded pr-10 ${errors.password ? 'border-red-500' : ''}`}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>
            {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
            )}

            {!isLogin && (
            <>
                <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mb-3 w-full border px-3 py-2 rounded"
                required
                >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="CLUB_SECY">Club Secretary</option>
                </select>

                {form.role !== "STUDENT" && (
                <div
                    {...getRootProps()}
                    className={`mb-3 p-4 border-2 border-dashed rounded text-center cursor-pointer ${
                    errors.idImage ? 'border-red-500' : ''
                    }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive
                    ? "Drop ID image here..."
                    : form.idImage
                    ? `Uploaded: ${form.idImage.name}`
                    : "Drag & drop or click to upload ID proof"}
                </div>
                )}
                {errors.idImage && (
                <p className="text-red-500 text-sm mb-2">{errors.idImage}</p>
                )}
            </>
            )}

            <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            >
            {isSubmitting ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
            </button>
        </form>

        <p
            onClick={toggleMode}
            className="mt-4 text-sm text-center text-blue-500 hover:underline cursor-pointer"
        >
            {isLogin ? (
            <div>Don't have an account? <span className="text-blue-800">Sign Up</span></div>
            ) : (
            <div>Already have an account? <span className="text-blue-800">Log In</span></div>
            )}
        </p>
    </div>
  );
};

export default AuthForm;
