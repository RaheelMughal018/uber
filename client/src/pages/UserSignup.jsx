import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const [userData, setUserData] = useState({
    name: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      name: {
        firstname: name.firstname,
        lastname: name.lastname,
      },
      email: email,
      password: password,
    });
    setName({
      firstname: "",
      lastname: "",
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
          <h3 className="text-lg font-medium mb-2">What&apos;s your Name</h3>
          <div className="flex gap-4">
            <input
              className="px-4 py-2 bg-[#eeeeee] mb-7 border text-lg placeholder:text-base w-full rounded"
              type="text"
              placeholder="First Name"
              required
              value={name.firstname}
              onChange={(e) => setName({ ...name, firstname: e.target.value })}
            />
            <input
              className="px-4 py-2 bg-[#eeeeee] mb-7 border text-lg placeholder:text-base w-full rounded"
              type="text"
              placeholder="Last Name"
              required
              value={name.lastname}
              onChange={(e) => setName({ ...name, lastname: e.target.value })}
            />
          </div>
          <h3 className="text-lg font-medium mb-2"> What&apos;s your Email</h3>
          <input
            className="px-4 py-2 bg-[#eeeeee] mb-7 border text-lg placeholder:text-base w-full rounded"
            type="text"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
            required
            className="px-4 py-2 bg-[#eeeeee] mb-7 border text-lg placeholder:text-base w-full rounded"
          />
          <button className="px-4 py-2 bg-[#111] text-white mb-3  text-lg placeholder:text-base w-full rounded">
            Sign up
          </button>
        </form>
        <p className="text-center">
          Already have an Account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className=" leading-tight text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          cupiditate quasi ut ullam eos architecto, ratione, veniam, earum animi
          consequuntur debitis dolore recusandae fugiat alias. Soluta reiciendis
          tenetur ullam eum.
        </p>
      </div>
    </div>
  );
}
