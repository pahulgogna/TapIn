import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { useState } from "react"
import axios from "axios"
import TextInput from "../components/basics/TextInput"
import Button from "../components/basics/Button"
import { useSetRecoilState } from "recoil"
import { userAtom } from "../store/atom/atom"


const validateEmail = (e: string) => {
    return e.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


function SignupPage() {

    const setUser = useSetRecoilState(userAtom)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const navigate = useNavigate()


    async function handleSignup() {

        if(!validateEmail(email)){
            toast.error("Invalid Email.", {
                position: "bottom-right"
            })
            return
        }

        if(password.length < 8){
            toast.error("Password must be at least 8 characters long.", {
                position: "bottom-right"
            })
            return
        }

        if(name.length < 3){
            toast.error("Name must be at least 3 characters long.", {
                position: "bottom-right"
            })
            return
        }

        try{
            await axios.post(`${import.meta.env.VITE_BEEP}/user/register`,
                {"email": email, "password": password, "name":name}, {
                    withCredentials: true
                })
                .then((res) => {
                    setUser(res.data)
                    navigate("/dashboard")
                })
                .catch((e) => {
                    if(e.response && e.response.data && e.response.data.detail){
                        if(e.response.data.detail.issues){
                            e.response.data.detail.issues.map((v:any) => {
                                toast.error(v.message, {
                                    position: "bottom-right"
                                })
                            })
                        }
                        else if(typeof e.response.data.detail == "string"){
                            toast.error(e.response.data.detail, {
                                position: "bottom-right"
                            })
                        }
                        else{
                            toast.error("Sorry, we could not register this email.", {
                                position: "bottom-right"
                            })
                        }
                        return
                        
                    }
                    else{
                        toast.error("Sorry, we could not register this email.", {
                            position: "bottom-right"
                        })
                    }
                })
                
        }
        catch(e){
            toast.error("Invalid Credentials.", {
                position: "bottom-right"
            })
        }
        return
    }

    return (
        <div>
            <div className="flex justify-center pt-16">
                <div className="flex justify-center flex-col border p-14 rounded-lg">
                    <div className="text-md md:text-2xl font-bold">
                        Create your new account!
                    </div>
                    <TextInput value={name} setValue={setName} lable="Name" placeholder="John Doe"/>
                    <TextInput value={email} setValue={setEmail} lable="Email" placeholder="JohnDoe@gmail.com"/>
                    <TextInput hidden value={password} setValue={setPassword} lable="Password" placeholder="*********"/>
    
                    <Button onClick={handleSignup} className="mt-5"> 
                        Signup
                    </Button>
    
                    <div className="flex justify-center">
                        Already have an account? 
                        <Link className="mx-2 font-semibold text-blue-500" to={"/login"}>Login </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignupPage