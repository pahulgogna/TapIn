import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/basics/TextInput";
import Button from "../components/basics/Button";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atom/atom";

function Login() {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      if (email === "" && password === "") {
        toast.error("Please fill in all the required fields before logging in.", {
          position: "bottom-right",
        });
      } else if (email === "") {
        toast.error("Email is required.", { position: "bottom-right" });
      } else {
        toast.error("Password is required.", { position: "bottom-right" });
      }
      return;
    }

    try {
      const data = (
        await axios.post(
          `${import.meta.env.VITE_BEEP}/user/login`,
          { email: email, password: password },
          { withCredentials: true }
        )
      ).data;

      if (data) {
        setUser(data);
        navigate("/dashboard");
      }
    } catch (e) {
      toast.error("Invalid Credentials.", { position: "bottom-right" });
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('images/background.png')" }}
    >
      <div className="bg-black/70 backdrop-blur-lg p-14 rounded-2xl border border-gray-600 shadow-lg w-full max-w-md">
        <div className="text-xl md:text-2xl font-bold text-white text-center mb-5">
          Login to your account!
        </div>
        <TextInput value={email} setValue={setEmail} lable="Email" placeholder="JohnDoe@gmail.com" />
        <TextInput hidden value={password} setValue={setPassword} lable="Password" placeholder="*********" />

        <Button onClick={handleLogin} className="mt-5 w-full bg-[#18cb96] hover:bg-[#14a67f] text-black py-2 rounded-lg shadow-md transition duration-300">
          Login
        </Button>

        <div className="flex justify-center text-white mt-3">
          Don't have an account? 
          <Link className="mx-2 font-semibold text-[#18cb96] hover:underline" to={"/signup"}>
            Signup
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
