import { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    idImage: null,
  });

  // Dropzone handler
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setForm((prev) => ({ ...prev, idImage: acceptedFiles[0] }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // Text/Select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (!isLogin) {
        data.append("name", form.name);
        data.append("role", form.role);
        if (form.idImage) {
          data.append("idImage", form.idImage);
        }
      }
      data.append("email", form.email);
      data.append("password", form.password);

      const url = isLogin
        ? `${process.env.REACT_APP_API_URL}/auth/login`
        : `${process.env.REACT_APP_API_URL}/auth/signup`;

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Auth success:", response.data);
      alert("Success!");
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error("❌ Auth error:", err);
      alert("Authentication failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

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
                className="mb-3 p-4 border-2 border-dashed rounded text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive
                  ? "Drop ID image here..."
                  : form.idImage
                  ? `Uploaded: ${form.idImage.name}`
                  : "Drag & drop or click to upload ID proof"}
              </div>
            )}
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p
        onClick={() => setIsLogin((prev) => !prev)}
        className="mt-4 text-sm text-center text-blue-500 hover:underline cursor-pointer"
      >
        {isLogin ? <div>Don't have an account? <span className="text-blue-800">Sign Up</span></div> : <div>Already have an account? <span className="text-blue-800">Log In</span></div>}
      </p>
    </div>
  );
};

export default AuthForm;
