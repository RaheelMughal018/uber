import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  // console.log("🚀 ~ file: userLogin.jsx:8 ~ userData:", userData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What is your email?</h3>
          <input
            className="px-4 py-2 bg-[#eeeeee] mb-7 border text-lg placeholder:text-sm w-full rounded"
            type="text"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
            required
            className="px-4 py-2 bg-[#eeeeee] mb-7 border text-lg placeholder:text-sm w-full rounded"
          />
          <button className="px-4 py-2 bg-[#111] text-white mb-3  text-lg placeholder:text-sm w-full rounded">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className="px-4 py-2 flex items-center justify-center bg-[#10b461] text-white mb-7  text-lg placeholder:text-sm w-full rounded"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}
