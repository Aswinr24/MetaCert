import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useAccount } from 'wagmi'
import { Address } from 'cluster'
import { useReadContract } from 'wagmi'
import { abi } from './abi'
import { readContract } from '@wagmi/core'
import { config } from './config'
import http from 'https'
import VerifyNFTpopup from './VerifyNFTpopup'

type CryptoAddress = `0x${string}`

const test = async (y: number, x: CryptoAddress) => {
  const result = await readContract(config, {
    abi,
    address: '0x9Dc51E8Cfc9F88385376a685Bf7997426467f487',
    functionName: 'verifyCert',
    args: [x, BigInt(y)],
  })
  return result
}

interface VerifierDetailsFormProps {
  onSubmit: (details: { organizationname: string; address: Address }) => void
  onClose: () => void
  name: string
}

interface NFT {
  name: string
  description: string
  identifier: string
  image_url: string
  metadata_url: string
  opensea_url: string
}

export const VerifierDetailsPopUp: React.FC<VerifierDetailsFormProps> = ({
  onSubmit,
  onClose,
  name,
}) => {
  const [certuid, setCertuid] = useState(name)
  const [studwallet, setStudwallet] = useState('')
  const { address, isConnecting, isDisconnected } = useAccount()
  const [responseBody, setResponseBody] = useState('')
  const [response, setResponse] = useState(false)

  const [nfts, setNfts] = useState<NFT[]>([])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (await test(certuid, studwallet)) {
      const options = {
        method: 'GET',
        hostname: 'testnets-api.opensea.io',
        port: null,
        path: `/api/v2/chain/sepolia/contract/0x9Dc51E8Cfc9F88385376a685Bf7997426467f487/nfts/${certuid}`,
        headers: {
          accept: 'application/json',
          'x-api-key': `${process.env.NEXT_PUBLIC_OPENSEA_API_KEY}`,
        },
      }

      const req = http.request(options, function (res) {
        const chunks = []

        res.on('data', function (chunk) {
          chunks.push(chunk)
        })

        res.on('end', function () {
          const body = Buffer.concat(chunks)
          const rv = body.toString()
          setResponse(true)
          if (rv.length > 0) {
            setNfts(rv)
          } else {
            alert('No NFTs are held.')
          }
        })
      })

      req.end()
    } else {
      alert('Verification failed!')
    }
  }

  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-stone-400 w-[400px] p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Student Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 pb-2">
            <label htmlFor="studwallet">Student Wallet Address:</label>
            <Input
              id="studwallet"
              value={studwallet}
              onChange={(e) => setStudwallet(e.target.value)}
              className="text-black placeholder:text-black"
            />
          </div>
          <div className="flex flex-col space-y-2 pb-2">
            <label htmlFor="certuid">Certificate Uid :</label>
            <Input
              id="certuid"
              value={certuid}
              onChange={(e) => setCertuid(e.target.value)}
              className="text-black placeholder:text-black"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="address">Your Wallet Address:</label>
            <Input id="address" value={address} disabled />
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
            {response && nfts && (
              <VerifyNFTpopup
                NFT={nfts}
                address={studwallet}
                onClose={onClose}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
