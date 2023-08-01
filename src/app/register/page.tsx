'use client'

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';


const RegisterPage = () => {

  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);             // Data del formulario

      const signupResponse = await axios.post("/api/auth/signup", {   // Grabamos usuario en BD
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });

      const res = await signIn('credentials', {                       // Comprobación de las credenciales segun [...nextauth]
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if(res?.ok) return router.push("/dashboard/profile");                   // Redirección a donde queramos 

    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
    }
  }
}

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-3/12"
      >
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <h1 className="text-4xl font-bold mb-7 text-white">Signup</h1>

        <label className="text-slate-300">Fullname:</label>
        <input 
          type="text"
          placeholder='Fullname'
          name='fullname'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />

        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder='Email'
          name='email'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder='********'
          name='password'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Signup
        </button>

      </form>

    </div>
  )
}

export default RegisterPage