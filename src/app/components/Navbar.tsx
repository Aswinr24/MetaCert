import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <nav className="bg-blue-400 py-2 shadow-xl fixed w-full bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a
                href="/"
                className="text-xl font-bold text-gray-800 flex items-center"
              >
                <img src="./certified.png" className="w-8 h-8" />
                MetaCert
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center gap-10">
            <div className="hidden sm:ml-6 sm:flex space-x-8">
              <a
                href="/"
                className="border-b-2 border-transparent text-black hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/issuer"
                className="border-b-2 border-transparent text-black hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Issuer
              </a>
              <a
                href="/student"
                className="border-b-2 border-transparent text-black hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Student
              </a>
            </div>
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m1.09-5.08A7.5 7.5 0 1115.66 3.34a7.5 7.5 0 014.35 12.66z"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-2/3 pl-10 mt-3 py-2 border border-transparent leading-5 bg-orange-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-white focus:ring-0 focus:text-gray-900 sm:text-sm rounded-xl"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6 gap-0">
            <div className="w-full">
              <ConnectButton
                label="Sign In / Connect"
                chainStatus="icon"
                showBalance={false}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
