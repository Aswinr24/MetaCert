import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StudDetailsPopUp } from './StudDetailsPopup'
import { Address } from 'viem'

export function CardCompStud() {
  const [showPopup, setShowPopup] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()

  const handleRegisterClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleSubmitDetails = (details: {
    name: string
    address1: Address
  }) => {
    console.log('Submitted student details:', details)
    setShowPopup(false)
    router.push('/student')
  }

  return (
    <Card className="w-[350px] bg-stone-400 py-10">
      <CardHeader className="py-10">
        <CardTitle className="text-center text-2xl">
          Are You A Student?
        </CardTitle>
        <CardDescription className="text-center text-xl text-blue-600 font-semibold">
          Register Here
        </CardDescription>
        <div className="flex-row items-center justify-center px-28 pt-4">
          <img src="./graduation.png" className="w-20 h-20" />
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          onClick={handleRegisterClick}
        >
          Register
        </Button>
      </CardFooter>
      {showPopup && (
        <StudDetailsPopUp
          onSubmit={handleSubmitDetails}
          onClose={handleClosePopup}
          name={name}
        />
      )}
    </Card>
  )
}
