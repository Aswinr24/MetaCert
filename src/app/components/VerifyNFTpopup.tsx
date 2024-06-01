import QRCodeComponent from './QRCodeComponent'

interface VerifyNFTpopupProps {
  NFT: Object
  address: string
  onClose: () => void
}

const VerifyNFTpopup: React.FC<VerifyNFTpopupProps> = ({
  NFT,
  address,
  onClose,
}) => {
  console.log(address)
  const nfts = JSON.parse(NFT.toString()).nft
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-stone-400 w-[540px] px-6 py-2 rounded-lg">
        <h2 className="text-xl font-semibold mb-4"></h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 pb-2">
            <label htmlFor="studwallet" className="flex text-md">
              Student&apos;s Wallet Address:{' '}
              <div className="text-xs pl-2 pt-1">{address}</div>
            </label>
            <div className="flex pt-2 items-center justify-center">
              <div className="flex-row p-2 items-center justify-center w-[350px] border-amber-300 border-2 rounded-lg">
                <div className="flex items-center justify-center">
                  <img
                    src={nfts.image_url}
                    alt="image"
                    className="w-[340px] h-[300px] rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col pt-2 space-y-2 pb-2 text-xl font-semibold">
                    {nfts.name}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col space-y-2 mt-4">
                    {nfts.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2 justify-center">
            <img src="./check-mark.png" className="w-10 h-10" /> Verified !
          </div>
          <div className="pt-3 flex justify-center">
            <QRCodeComponent qrData={nfts.identifier} />
          </div>
          <div className="flex justify-end mt-6">
            <button className="ml-2" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyNFTpopup
