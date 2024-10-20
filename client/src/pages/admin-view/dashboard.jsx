import BusinessReport from '@/components/admin-view/BusinessReport'
import { Separator } from '@/components/ui/separator'
import { BadgeDollarSign, ShoppingCart } from 'lucide-react'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='flex sm:gap-6 gap-4 flex-wrap justify-center sm:justify-start'>
      <div className="shadow-md bg-background w-72 h-40 rounded-lg p-6 flex items-center justify-between">
          <div className="bg-violet-100 rounded-lg p-3">
          <ShoppingCart className='text-violet-600 ' size={48} />
          </div>
        <div className='flex flex-col text-right font-semibold text-muted-foreground'>
         <span className='text-xl'>Total Orders</span>
         <span className='text-3xl'>{123}</span>
        </div>
      </div>
      <div className="shadow-md bg-background w-72 h-40 rounded-lg p-6 flex items-center justify-between">
          <div className="bg-violet-100 rounded-lg p-3">
          <BadgeDollarSign className='text-violet-600 ' size={48} />
          </div>
        <div className='flex flex-col text-right font-semibold text-muted-foreground'>
         <span className='text-xl'>Revenue</span>
         <span className='text-3xl'>${12345}</span>
        </div>
      </div>
      <div className="shadow-md bg-background w-72 h-40 rounded-lg p-6 flex items-center justify-between">
          <div className="bg-violet-100 rounded-lg p-3">
          <BadgeDollarSign className='text-violet-600 ' size={48} />
          </div>
        <div className='flex flex-col text-right font-semibold text-muted-foreground'>
         <span className='text-xl'>Monthly Earning</span>
         <span className='text-3xl'>${1234}</span>
        </div>
      </div>
      <Separator />
      <BusinessReport />
    </div>
  )
}

export default AdminDashboard
