import React from 'react'
import pro_pic from '/public/icon.png'
import { useDispatch, useSelector } from 'react-redux'

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='flex flex-wrap sm:gap-6 gap-4'>
      <div className="min-w-60 rounded-lg bg-white shadow-md p-6 flex flex-col items-center space-y-2 mx-auto">
        <div className="rounded-full h-24 aspect-square border mb-4">
          {pro_pic ? (
            <img
              src={pro_pic}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-24 w-24 bg-violet-100 text-violet-500 text-2xl font-semibold">
              H
            </div>
          )}
        </div>
        <h1 className='font-semibold text-xl text-muted-foreground border-b pb-2 w-full text-center uppercase'>{user?.name}</h1>
        <p className='font-semibold text-slate-400'>{user?.role}</p>
        <p className='italic text-muted-foreground'>{user?.email}</p>
        <p className='text-muted-foreground'>{user?.phone}</p>
      </div>
      <div className='min-w-80 flex-1 rounded-lg bg-white shadow-md p-6 flex flex-col space-y-2 text-muted-foreground'>
          <h1 className='font-bold text-xl border-b pb-2 w-full'>Details</h1>
          <p>Address: Dhaka, Bangladesh</p>

      </div>
    </div>
  )
}

export default AdminProfile;
