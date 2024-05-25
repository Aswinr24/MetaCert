import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Address } from 'viem'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type CryptoAddress = `0x${string}`

interface MintNFTPopupprops {
  onSubmit: (details: { uid: string; address: Address; file: File }) => void
  onClose: () => void
}

export const MintNFTPopup: React.FC<MintNFTPopupprops> = ({
  onSubmit,
  onClose,
}) => {
  const [uid, setUid] = useState('')
  const [sname, setSname] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const [studaddress, setStudaddress] = useState<CryptoAddress | undefined>(
    undefined
  )
  const [file, setFile] = useState<File | null>(null)

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.startsWith('0x')) {
      setStudaddress(value as CryptoAddress)
    } else {
      console.error('Invalid address format')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ uid, studaddress })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    } else {
      setFile(null)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-stone-400 p-8 w-[800px] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create a Certificate</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex-row">
            <div className="flex gap-6">
              <div className="flex flex-col space-y-2 pb-4">
                <label htmlFor="uid">Enter UID:</label>
                <Input
                  id="uid"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="Enter your UID"
                  className="text-black w-full"
                />
              </div>
              <div className="flex flex-col space-y-2 pb-4">
                <label htmlFor="studentname">Enter Student Name:</label>
                <Input
                  id="studentname"
                  value={sname}
                  onChange={(e) => setSname(e.target.value)}
                  placeholder="Enter the Student Name"
                  className="text-black w-[250px]"
                />
              </div>
              <div className="flex flex-col space-y-2 pb-4">
                <label htmlFor="certtitle">Enter Certificate Title:</label>
                <Input
                  id="certtitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="text-black w-[280px]"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 pb-4">
              <label htmlFor="description">Enter Description:</label>
              <Input
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter the Description"
                className="text-black"
              />
            </div>
            <div className="flex flex-col space-y-2 pb-4">
              <label htmlFor="duration">Enter Duration:</label>
              <div className={cn('grid gap-2')}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'ghost'}
                      className={cn(
                        'w-[300px] justify-start text-left font-normal hover:bg-stone-300',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      className="bg-amber-500"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="walletaddress">Wallet Address of Student:</label>
              <Input
                id="walletaddress"
                value={studaddress}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 py-2 mt-2">
            <label htmlFor="walletaddress">File:</label>
            <Input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-amber-500 px-2 pt-1 hover:bg-amber-600 text-white rounded-md"
            >
              Submit
            </button>
            <button className="ml-2" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
