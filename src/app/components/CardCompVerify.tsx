import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Address } from 'cluster'
import { VerifierDetailsPopUp } from './VerifierDetailsPopup'

export function CardCompVerify() {
  const [showPopup, setShowPopup] = useState(false)
  const [name, setName] = useState('')

  const handleRegisterClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setName('')
  }

  const handleSubmitDetails = (details: {
    organizationname: string
    address: Address
  }) => {
    console.log('Submitted institution details:', details)
    setShowPopup(false)
    setName('')
  }
  return (
    <Card className="w-[350px] bg-stone-400">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Employer/ Organization?
        </CardTitle>
        <CardDescription className="text-center text-xl text-blue-600 font-semibold">
          Verify a Certificate here
        </CardDescription>
        <div className="flex-row items-center justify-center px-24 pt-4">
          <img src="./organization.png" className="w-28 h-24" />
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework" className="px-4">
                Name Of Your Organisation
              </Label>
              <Input
                id="name"
                value={name}
                className="px-2 w-[280px] mx-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          onClick={handleRegisterClick}
        >
          Verify
        </Button>
        {showPopup && (
          <VerifierDetailsPopUp
            onSubmit={handleSubmitDetails}
            onClose={handleClosePopup}
          />
        )}
      </CardFooter>
    </Card>
  )
}
