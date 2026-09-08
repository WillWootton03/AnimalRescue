import { useEffect, useRef, useState } from "react"
import FormField from "../components/FormField"
import { request } from "../api/client";
import { useNavigate } from "react-router";
import { randomLoginImg, type RegisterUser } from "../api/users";

export default function Signup () {

  const navigate = useNavigate();

  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verify_password, setVerifyPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const imgIt = randomLoginImg();

  useEffect(() => {
    if((email && password && name) && (password == verify_password)) setAllFieldsValid(true);
    else setAllFieldsValid(false);
  }, [email, password, name, verify_password]);

    async function register() {
        try {
          setLoading(true);
            await request('/auth/register', {
                method: "POST",
                body: JSON.stringify({
                  email,
                  name,
                  password
                })  
            });
            navigate('/app')
        } catch (e) {
            console.error(`Something went wrong in signUp : ${e}`)
        } finally {
          setLoading(false);
        }

    }  

    return (
      <div className='w-full min-h-screen flex'>
        {/* Left Hero */}
        <div className="lg:flex lg:flex-1 lg:flex-col hidden min-h-screen max-h-screen relative">
          <img src={`/login_img${imgIt}.jpg`} className="min-h-screen max-h-screen w-full"/>
          <div className="absolute inset-0 flex items-end mb-10 p-10">
            <div className="flex flex-col gap-y-4">
              <p className="text-4xl font-bold text-white">
                "Every animal needs a home. Find your perfect pal and adopt as soon as today!"
              </p>
              <p className="text-md text-white">
                Connecting you to animal rescues all around North America.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 min-h-screen justify-center z-10">
          <div className="flex flex-col w-full px-10 md:w-120 justify-center">
            {/* Header */}
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => navigate('/')}>
                <img src="/animal_rescue_sq.png" width={40} alt="Logo" />
                <h1 className="text-3xl flex font-bold text-black/90 mb-2">
                  AnimalRescue
                </h1>
              </div>
              <h2 className="text-4xl font-bold text-black/90">
                Welcome
              </h2>
              <p className="text-black/50 font-medium mb-12">
                Create an account and start your journey to adoption today.
              </p>
              {/* Forms */}
              <div className="flex flex-col gap-y-2">
                <FormField 
                  id='email'
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="john@example.com"
                  required
                />
                <FormField 
                  id='name'
                  label="Full Name"
                  value={name}
                  onChange={setName}
                  placeholder="John Smith"
                  required
                />
                <FormField 
                  id="password"
                  variant="password"
                  label='Password'
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  required
                />
                <FormField 
                  id="verify_password"
                  variant="password"
                  label='Verify Password'
                  value={verify_password}
                  onChange={setVerifyPassword}
                  placeholder="••••••••"
                  required
                />
              {/* Fields Footer */}
              <div className="flex flex-row justify-between px-2">
                {/* TODO : Remember this device? */}
                <div></div>
                <a href="/forgot_password" className="font-medium text-sm text-amber-800/80 hover:text-amber-900">
                  Forgot Password?
                </a>
              </div>
              {/* Login Footer */}
              <div className="flex flex-col gap-y-4"> 
                <button className="bg-amber-800/50 hover:bg-amber-800/80 py-2 rounded-lg text-white font-medium" onClick={register}>
                  Log In
                </button>
                <div className="flex gap-x-1 justify-center">
                <p className="tracking-wide text-black/60">
                  Already have an account? 
                </p>
                <a href="/login" className="font-medium text-amber-800 hover:text-amber-900">Login here.</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
          