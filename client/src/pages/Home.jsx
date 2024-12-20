import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex flex-col justify-between h-screen w-full bg-red-400 pt-5">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <div className="bg-white pb-10 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to={"/login"}
            className="flex items-center justify-center bg-black w-full py-3 text-white rounded-none mt-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
