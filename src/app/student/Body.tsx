'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useAccount } from 'wagmi'
import http from 'https'
import QRCodeComponent from '../components/QRCodeComponent'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import '../styles/custom-styles.css'
import { Address } from 'viem'

interface NFT {
  name: string
  description: string
  identifier: string
  image_url: string
  metadata_url: string
  opensea_url: string
}

const Body = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [nfts, setNfts] = useState<NFT[]>([])

  const rv = []

  useEffect(() => {
    const options = {
      method: 'GET',
      hostname: 'testnets-api.opensea.io',
      port: null,
      path: `/api/v2/chain/sepolia/account/${address}/nfts`,
      headers: {
        accept: 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_OPENSEA_API_KEY}`,
      },
    }

    const req = http.request(options, function (res) {
      const chunks: Buffer[] = []

      res.on('data', function (chunk) {
        chunks.push(chunk)
      })

      res.on('end', function () {
        const body = Buffer.concat(chunks)
        const rv = JSON.parse(body.toString()).nfts.filter(
          (x: any) => x.collection == 'metacert-certs-2'
        )
        console.log(rv)
        setNfts(rv)
      })
    })

    req.end()
  }, [address])

  return (
    <main className="pt-1 bg-gray-300">
      <div className="p-2">
        <div className="p-10 mt-20 text-3xl px-10 text-blue-600">
          Your Profile:
        </div>
        <div className="flex text-xl px-10 text-blue-600">Name:</div>
        <h1 className="text-xl pt-2 px-10 text-blue-600">Wallet Address:</h1>
        <Input
          className="bg-stone-200 placeholder:text-black py-2 mx-10 px-6 w-[400px]"
          placeholder={address}
          disabled
        />
      </div>
      <div>
        <h1 className="text-3xl py-6 px-10 text-blue-600">Your EduNFTs:</h1>
        <div className="grid grid-cols-3 px-20 py-4 space-y-8">
          {nfts.length === 0 ? (
            <h1 className="text-2xl text-black">No NFTs are held by you!</h1>
          ) : (
            nfts.map((nft, index) => (
              <Card className="w-[350px] pb-0 bg-blue-400" key={index}>
                <CardHeader className="p-2">
                  <div className="flex-row items-center justify-center">
                    {nft.image_url ? (
                      <img
                        src={nft.image_url}
                        alt={nft.name}
                        className="w-[340px] h-[260px] rounded-lg"
                      />
                    ) : (
                      <img
                        src="./dummy.png"
                        alt="none"
                        className="w-[340px] h-[220px] rounded-lg"
                      />
                    )}
                  </div>
                  <CardTitle className="text-center text-2xl">
                    {nft.name ? nft.name : 'Name'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework" className="px-4 text-xl">
                          Description: {nft.description}
                        </Label>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex gap-6 items-center justify-center">
                  <a
                    href={nft.opensea_url}
                    className="text-xl text-indigo-800 hover:text-blue-500 cursor-pointer"
                  >
                    Visit this at OpenSea
                  </a>
                  <QRCodeComponent qrData={nft.identifier} />
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default Body
