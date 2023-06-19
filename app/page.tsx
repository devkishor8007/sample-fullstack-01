import Link from 'next/link'

async function fetchUser() {
  const res = await fetch("http://localhost:3000/api/user", {
    next: {
      revalidate: 10
    }
  })

  const data = await res.json()
  return data.users;
}

export default async function Home() {

  const users = await fetchUser()
  console.log(users);

  return (
    <main className="w-full h-full">
      <div className='px-16 py-10'>
        <p className='not-italic'>Exploring Full Stack</p>
      </div>

      <Link className='ng-teal-700 text-black py-2 px-4 rounded-lg bg-red-600 mx-6' href={"/user/add"}> Add a new User </Link>

      {/* users  */}
      <div className='w-full flex flex-col justify-center items-center'>
        {
          users.map((user: any) => {
            return (
              <>
                <div className='w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center'>
                  {/* name and action  */}
                  <div className='flex items-center my-3'>
                    <div className='mr-auto'>
                      <h2 className='mr-auto font-semibold'>{user.name}</h2>
                    </div>

                    {/* <div className=''></div> */}

                    <Link href={`user/edit/${user.id}`} className='gap-2 px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200'>Edit</Link>
                  </div>

                  {/* email  */}
                  <div className='mr-auto my-1'>
                    <h2>{user.email}</h2>
                  </div>

                  {/* date   */}

                  <div className='mr-auto my-1'>
                    <blockquote className='font-bold text-slate-700'>
                      {new Date().toDateString()}
                    </blockquote>
                  </div>


                </div>
              </>
            )
          })
        }
      </div>
    </main>
  )
}


