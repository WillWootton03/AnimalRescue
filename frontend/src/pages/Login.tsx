import { useEffect, useState } from "react"
import FormField from "../components/FormField"
import { request } from "../api/client"
import { useNavigate } from "react-router";
import { randomLoginImg } from "../api/users";

export default function Login() {

  const navigate = useNavigate();

  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPlaintextPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const imgIt = randomLoginImg();

  useEffect(() => {
    if(email && password) setAllFieldsValid(true);
    else setAllFieldsValid(false);
  }, [email, password]);


    async function login() {
      console.log('t')
        try {
          setLoading(true);
            const user = await request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                  email,
                  password,
                })
            });
            navigate('/u_dashboard');
        } catch (e) {
            console.error(`Something went wrong in login : ${e}`)
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
              "Get back to searching for your pal. Or check your shelters stats."
            </p>
            <p className="text-md text-white">
              Connecting you to animal rescues all around North America.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 min-h-screen justify-center z-10">
        <div className="flex flex-col w-full px-10 md:w-120 justify-center">
          <div className="flex flex-col gap-y-3">
            {/* Header */}
            <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => navigate('/')}>
              <img src="/animal_rescue_sq.png" width={40} alt="Logo" />
              <h1 className="text-3xl flex font-bold text-black/90">
                AnimalRescue
              </h1>
            </div>
            <h2 className="text-4xl font-bold text-black/90">
              Welcome Back
            </h2>
            <p className="text-black/50 font-medium mb-12">
              Sign into your account and find your new furry companion, or check your shelter's stats.
            </p>
            {/* Forms */}
            <div className="flex flex-col gap-y-8">
              <FormField
                id="email"
                label="Email Address"
                placeholder="john@example.com"
                value={email}
                onChange={setEmail}
                required
              />
              <FormField
                id="password"
                label="Password"
                variant="password"
                placeholder="••••••••"
                value={password}
                onChange={setPlaintextPassword}
                required
              />
            </div>
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
              <button className="bg-amber-800/50 hover:bg-amber-800/80 py-2 rounded-lg text-white font-medium" onClick={login}>
                Log In
              </button>
              <div className="flex gap-x-1 justify-center">
              <p className="tracking-wide text-black/60">
                Don&apos;t have an account? 
              </p>
              <a href="/signUp" className="font-medium text-amber-800 hover:text-amber-900">Register now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
