import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaEye, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signInWithGithub } from "../utils/helpers";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");

  
  const createNewUser = async() => {
    if(getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password).then(userCred => {
        if(userCred) console.log(userCred);
      }).catch (err => console.log(err));
    }
  }

  const loginWithEmailPassword = async() => {
    if(getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password).then(userCred => {
        if(userCred) {
          console.log(userCred);
        }
      }).catch(err => {
        console.log(err.message);
        if(err.message.includes("user-not-found")){
          setAlert(true);
          setAlertmsg("Invalid Id : User Not Found")
        } else if(err.message.includes("wrong-password")){
          setAlert(true);
          setAlertmsg("Incorrect Password")
        } else {
          setAlert(true);
          setAlertmsg("Temporarily disabled due to too many failed logins")
        }
        setInterval(() => {
          setAlert(false);
        }, 4000)
      });
    }
  }

  return (
    <div className="w-full py-6">
      <img src={Logo} alt="logo" className="object-contain w-32 h-auto" />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join With Us! 🧑‍💻</p>
        {/* div for auth pop-up */}
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Your Password (eg. 2#gFt0)"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />
          {/* alert */}

          <AnimatePresence>
            {alert && (
              <motion.p 
              key={"AlertMessage"}
              {...fadeInOut}
              className="text-red-500">
                {alertmsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {!isLogin ? 
        <motion.div 
        onClick={createNewUser}
        whileTap={{scale: 0.9}}
        className="flex items-center justify-center w-full py-3 bg-emerald-500 rounded-xl cursor-pointer hover:bg-emerald-400">
          <p className="text-xl text-white">Sign Up</p>
        </motion.div>
        :
<motion.div 
onClick={loginWithEmailPassword}
          whileTap={{scale: 0.9}}
          className="flex items-center justify-center w-full py-3 bg-emerald-500 rounded-xl cursor-pointer hover:bg-emerald-400">
            <p className="text-xl text-white">Login</p>
          </motion.div>
        } 
          
          {/* text */}
          {!isLogin ? <p className="text-sm text-primaryText items-center justify-center gap-3">Already a user ? <span 
onClick={() => setIsLogin(!isLogin)}
className="text-emerald-400 cursor-pointer"> Login here</span></p> :
<p className="text-sm text-primaryText items-center justify-center gap-3">New here ? <span 
onClick={() => setIsLogin(!isLogin)}
className="text-emerald-400 cursor-pointer">SignUp to Create Account</span></p>
}

          {/* or section */}
<div className="flex items-center justify-center gap-12">
  <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded:md w-24"></div>
  <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
  <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded:md w-24"></div>
</div>

          {/* or signin with google */}
<motion.div onClick={signInWithGoogle} whileTap={{sclae: 0.9}} 
className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer">
<FcGoogle className="text-3xl"/>
<p className="text-xl text-white">Sign in with Google</p>
</motion.div>

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
  <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded:md w-24"></div>
  <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
  <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded:md w-24"></div>
</div>

          {/* or signin with github */}
          <motion.div onClick={signInWithGithub} whileTap={{sclae: 0.9}} 
className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer">
<FaGithub className="text-3xl"/>
<p className="text-xl text-white">Sign in with GitHub</p>
</motion.div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
