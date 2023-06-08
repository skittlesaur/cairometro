import { useEffect, useState } from 'react'

import DataTable from '@/components/data-table'
import Input from '@/components/input'
import SearchIcon from '@/icons/search-outline.svg'
import Refund from '@/types/refund'

import * as Tabs from '@radix-ui/react-tabs'
import cn from 'classnames'
import useRefunds from '@/graphql/admin/refunds/refunds'

interface Cell {
  row: {
    getValue: (cell: string)=> unknown
  }
}

const columns = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }: Cell) => {
      const user = row.getValue('user') as {name: string, email: string}
      return (
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',    
    cell: ({ row }: Cell) => {
      const date = row.getValue('createdAt') as Date
      return (
        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString(
          'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )} at {new Date(date).toLocaleTimeString(
          'en-US', {
            hour: 'numeric',
            minute: 'numeric',
          }
        )}
        </p>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: Cell) => {
      const status = row.getValue('status') as string
      const capitalFirstLetter = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      return (
        <p
          className={cn(
            'px-4 py-2 rounded text-xs font-medium border w-fit',
            {
              'bg-orange-100 border-orange-200 text-orange-500': status.toLowerCase() === 'pending',
              'bg-green-100 border-green-200 text-green-500': status.toLowerCase() === 'accepted',
              'bg-red-100 border-red-200 text-red-500': status.toLowerCase() === 'rejected',
            },
          )}
        >
          {capitalFirstLetter}
        </p>
      )
    },
  },
  {
    accessorKey: 'price',
    header: 'Amount',
    cell: ({ row }: Cell) => {
      const amount = row.getValue('price') as number
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
      }).format(amount)
      
      return (
        <p className="text-sm text-gray-500">{formatted}</p>
      )
    },
  },
]

interface RefundsTableProps {
  setRefundOpen: (refund: Refund | undefined)=> void
  data: Refund[]
  setFilterBy: (filterBy: string)=> void
}
const RefundsTable = ({ setRefundOpen, data, setFilterBy}: RefundsTableProps) => {
  const [currentTab, setCurrentTab] = useState('all')
  

  const tabs = [
    'All',
    'Pending',
    'Accepted',
    'Rejected',
  ]

  
  return (
    <div className="w-full flex flex-col gap-5">
      <Tabs.Root
        defaultValue="all"
        className="flex flex-col gap-3"
        onValueChange={(value) => {setCurrentTab(value) 
          setFilterBy(value.toUpperCase())}}
        
      >
        <Tabs.List className="border-b">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab.toLowerCase()}
              className={cn(
                'px-4 py-2 text-sm font text-gray-500 transition duration-200 ease-in-out',
                {
                  'border-b-2 border-primary font-semibold text-primary': currentTab === tab.toLowerCase(),
                  'hover:text-gray-700': currentTab !== tab.toLowerCase(),
                },
              )}
            >
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <label
          htmlFor="search"
          className="flex gap-2 bg-gray-50 rounded-lg px-2"
        >
          <SearchIcon className="w-5" />
          <Input
            id="search"
            className="p-2 w-full border-0"
            placeholder="Search by user name, email, or id"
          />
        </label>
      </Tabs.Root>
      <div className="border-b" />
      <DataTable
        columns={columns}
        data={data}
        rowOnClick={(row) => {
          setRefundOpen(row)
        }}
      />
    </div>
  )
}


export default RefundsTable 