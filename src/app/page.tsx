'use client'
import Image from 'next/image'
import Navbar from './components/Navbar'
import Body from './components/Body'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
const config = getDefaultConfig({
  appName: 'MetaCert',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, sepolia],
  ssr: true,
})
const queryClient = new QueryClient()

export default function Home() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#E5E5E5',
              accentColorForeground: 'black',
              borderRadius: 'large',
              fontStack: 'rounded',
              overlayBlur: 'small',
            })}
            modalSize="compact"
          >
            <Navbar />
            <Body />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
