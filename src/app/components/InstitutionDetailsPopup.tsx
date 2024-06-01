import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { getTransactionReceipt } from '@wagmi/core'
import { config } from './config'
import { abi } from './abi'
import Link from 'next/link'
// import ListenEvent from './listenEvent'

interface InstitutionDetailsFormProps {
  onSubmit: (details: {
    institutionId: string
    institutionname: string
    addressclg: string
    district: string
    address: string
  }) => void
  onClose: () => void
  name: string
}

export const InstitutionDetailsPopUp: React.FC<InstitutionDetailsFormProps> = ({
  onSubmit,
  onClose,
  name,
}) => {
  const [institutionId, setInstitutionId] = useState('')
  const [addressclg, setAddressclg] = useState('')
  const [district, setDistrict] = useState('')
  const [insname, setInsname] = useState(name)
  const { address, isConnecting, isDisconnected } = useAccount()
  const [isHashReady, setIsHashReady] = useState(false)
  const [isLoads, setIsLoads] = useState(false)

  const router = useRouter()
  const { data: hashd, writeContract } = useWriteContract()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoads(true)
    writeContract({
      address: '0x9Dc51E8Cfc9F88385376a685Bf7997426467f487',
      abi,
      functionName: 'registerIssuer',
      args: [insname, addressclg, BigInt(institutionId), BigInt(1)],
    })
    try {
      const response = await fetch('http://localhost:3000/api/issuer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          institutionId,
          institutionname: insname,
          addressclg,
          district,
          address,
        }),
      })
      console.log(
        JSON.stringify({
          institutionId,
          institutionname: insname,
          addressclg,
          district,
          address,
        })
      )
      if (!response.ok) {
        throw new Error('Failed to send institution details')
      }

      // Handle the response if needed
    } catch (error) {
      console.error('Error sending institution details:', error)
    }
  }

  const {
    data: receipt,
    isLoading,
    isError,
  } = useWaitForTransactionReceipt({
    hash: hashd,
  })

  useEffect(() => {
    if (receipt?.logs) {
      setIsLoads(false)
      setIsHashReady(true)
      console.log(receipt.logs)
      setTimeout(() => {
        router.push('/issuer')
      }, 3000)
    }
  }, [receipt])
  // const res = useTransactionReceipt({
  //   hash: hashd
  // });

  // console.log(res);

  // useEffect(() => {
  //   const m = async () => {
  //     console.log("test");
  //     const t = await getTransactionReceipt(config, {
  //       hash: await hashd,
  //     })

  //     console.log(await t);
  //   }
  //   m();
  // }, [hashd]);

  return (
    <div>
      {!isHashReady && (
        <div className="fixed inset-0 flex z-50 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-stone-400 p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Enter Institution Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-6">
                <div className="flex flex-col space-y-2 pb-2">
                  <label htmlFor="institutionName">Institution Name:</label>
                  <Input
                    id="institutionName"
                    value={insname}
                    onChange={(e) => setInsname(e.target.value)}
                    placeholder="Enter institution Name"
                    className="text-black placeholder:text-black"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="institutionId">Institution ID:</label>
                  <Input
                    id="institutionId"
                    type="number"
                    value={institutionId}
                    onChange={(e) => setInstitutionId(e.target.value)}
                    placeholder="Enter institution ID"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col space-y-2 mt-4">
                  <label htmlFor="address">Address:</label>
                  <Input
                    id="address"
                    value={addressclg}
                    onChange={(e) => setAddressclg(e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label htmlFor="address">District:</label>
                  <Input
                    id="address"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <label htmlFor="address">Wallet Address:</label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 px-2 pt-1 hover:bg-blue-600 text-white rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex py-1 items-center gap-2">
                      <div className="w-5 h-5 border-4 border-t-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
                <button className="ml-2" onClick={onClose}>
                  Cancel
                </button>
              </div>
              {hashd && (
                <div className="text-sm pt-2">Transaction Hash: {hashd}</div>
              )}
            </form>
          </div>
        </div>
      )}
      {isHashReady && receipt && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-stone-400 p-8 rounded-lg">
            <h1 className="text-center text-xl">
              Congratulations, you have succesfully registered as an Issuer!
            </h1>
            <h2 className="flex gap-4">
              <h2 className="pt-2">Here is your UID: </h2>
              <h1 className="text-blue-600 text-3xl font-bold">
                {parseInt(receipt?.logs[0].data)}
              </h1>{' '}
              <h2 className="pt-2 text-md">..keep it safe</h2>
            </h2>
            <div className="flex items-end justify-end">
              <button
                className="mt-3 px-2 py-1 bg-blue-500 rounded-lg justify-end"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
