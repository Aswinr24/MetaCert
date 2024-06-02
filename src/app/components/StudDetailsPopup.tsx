'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { useRouter } from 'next/navigation'
type CryptoAddress = `0x${string}`

interface StudentDetailsFormProps {
  onSubmit: (details: { name: string; address1: CryptoAddress }) => void
  onClose: () => void
  name: string
}

export const StudDetailsPopUp: React.FC<StudentDetailsFormProps> = ({
  onSubmit,
  onClose,
  name,
}) => {
  const router = useRouter()
  const [studname, setStudname] = useState(name)
  const { address, isConnecting, isDisconnected } = useAccount()
  const address1: CryptoAddress = address ? address : '0x'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      onSubmit({ name: studname, address1 })
    } catch (error) {
      console.error('Error submitting student details:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-stone-400 p-8 w-[410px] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Student Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex-row">
            <div className="flex flex-col space-y-2 pb-4">
              <label htmlFor="studentname">Student Name:</label>
              <Input
                id="studentname"
                value={studname}
                onChange={(e) => setStudname(e.target.value)}
                placeholder="Enter your name"
                className="text-black"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="walletaddress">Wallet Address:</label>
              <Input id="walletaddress" value={address} disabled />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 px-2 pt-1 hover:bg-blue-600 text-white rounded-lg"
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
