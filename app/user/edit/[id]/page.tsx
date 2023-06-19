'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'

type UpdateUserParams = {
    email: string;
    id: string;
    name: string;
    age: number;
}

const updateUser = async (data: UpdateUserParams) => {
    const res = fetch(`http://localhost:3000/api/user/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            email: data.email,
            name: data.name,
            age: data.age,
        }),
        // @ts-ignore
        'Content-Type': "application/json"
    });
    return (await res).json()

}

const getUserById = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/user/${id}`)
    const data = await res.json()
    return data.user
}

const deleteUser = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
        // @ts-ignore
        'Content-Type': "application/json"
    });
    return (await res).json()
  
  }

const Edit = ({ params }: { params: { id: string } }) => {
    const router = useRouter()

    useEffect(() => {
        getUserById(params.id).then((data) => {
            console.log(data, "is the data");
            if (emailRef.current && nameRef.current && ageRef.current) {
                emailRef.current.value = data.email;
                nameRef.current.value = data.name;
                ageRef.current.value = data.age;
            }
        }).catch(error => console.log(error))
    }, [])

    const handleDelete = async()=> {
        await deleteUser(params.id);
        router.push('/')
      }

    const emailRef = useRef<HTMLInputElement | null>(null)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const ageRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (emailRef.current && nameRef.current && ageRef.current) {
            await updateUser({ email: emailRef.current?.value, name: nameRef.current?.value, id: params.id, age: +ageRef.current?.value })
            router.push('/')
        }
    }
    return (
        <>
            <div className='w-full m-auto flex my-4'>
                <div className='flex flex-col justify-center items-center m-auto'>
                    <p className='text-2xl text-slate-200 font-bold p-3'>Edit a User Detail</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            ref={emailRef}
                            placeholder='enter the email'
                            type="text" className='bg-slate-100 rounded-md px-4 w-full py-2 my-2' />
                        <input
                            ref={nameRef}
                            placeholder='enter the name'
                            className='bg-slate-100 rounded-md px-4 py-2 w-full my-2'></input>
                             <input
                            type='number'
                            ref={ageRef}
                            placeholder='enter the age'
                            className='bg-slate-100 rounded-md px-4 py-2 w-full my-2'></input>
                <div className=''>
                <button
                            className='font-semibold px-4 py-1 m-2 shadow-xl bg-slate-200 rounded-lg'
                        >Update</button>
                         <button onClick={handleDelete}
                            className='font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto'
                        >Delete</button>
                </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Edit