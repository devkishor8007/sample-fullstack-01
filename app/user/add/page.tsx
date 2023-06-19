'use client'
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

type CreateUserParams = {
    name: string; 
    email: string; 
    age: number;
}

const postUser = async ({ name, email, age }: CreateUserParams) => {
    const res = fetch('http://localhost:3000/api/user', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            age
        }),
        // @ts-ignore
        'Content-Type': "application/json"
    });
    return (await res).json()

}

const Add = () => {
    const router = useRouter()
    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const ageRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (nameRef.current && emailRef.current && ageRef.current) {
       
            await postUser({ name: nameRef.current?.value, email: emailRef.current?.value, age: +ageRef.current?.value })
            router.push('/')
        }
    }
    return (
        <>
            <div className='w-full m-auto flex my-4'>
                <div className='flex flex-col justify-center items-center m-auto'>
                    <p className='text-2xl text-slate-200 font-bold p-3'>Get To Know Each Others</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            ref={nameRef}
                            placeholder='enter the name'
                            type="text" className='bg-slate-100 rounded-md px-4 w-full py-2 my-2' />
                        <input
                            type='email'
                            ref={emailRef}
                            placeholder='enter the email'
                            className='bg-slate-100 rounded-md px-4 py-2 w-full my-2'></input>
                        <input
                            type='number'
                            ref={ageRef}
                            placeholder='enter the age'
                            className='bg-slate-100 rounded-md px-4 py-2 w-full my-2'></input>
                        <button
                            className='font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto'
                        >Submit</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Add