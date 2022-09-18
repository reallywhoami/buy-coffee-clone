import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Donate from '../components/Donate'

import { contractAddress } from '../config'

import BuyMeATea from './artifacts/contracts/BuyMeATea.sol/BuyMeATea.json'

export default function Home() {
  const [donates, setDonates] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [value, setValue] = useState()
  const [provider, setProvider] = useState()

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log('please install MetaMask')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
    } catch (error) {
      console.log(error)
    }
  }

  const buyTea = async () => {
    try {
      if (!provider) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
      }
      await provider.send('eth_requestAccounts', []) // <- this promps user to connect metamask
      const signer = provider.getSigner()

      const buyMeATea = new ethers.Contract(
        contractAddress,
        BuyMeATea.abi,
        signer
      )

      console.log('buying tea..')
      const teaTxn = await buyMeATea.donate(
        name ? name : 'Anonymous',
        message ? message : 'Enjoy your tea!',
        value
          ? { value: ethers.utils.parseEther(value.toString()) }
          : { value: ethers.utils.parseEther('0.001') }
      )

      await teaTxn.wait()

      console.log('mined ', teaTxn.hash)

      console.log('tea purchased!')
      getDonates()

      // Clear the form fields.
      setName('')
      setMessage('')
      setValue()
    } catch (error) {
      console.log(error)
    }
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onMessageChange = event => {
    setMessage(event.target.value)
  }

  const onValueChange = event => {
    setValue(event.target.value)
  }

  // Function to fetch all donates stored on-chain.
  const getDonates = async () => {
    try {
      if (provider) {
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const signer = provider.getSigner()
        const buyMeATea = new ethers.Contract(
          contractAddress,
          BuyMeATea.abi,
          provider
        )

        // console.log('fetching donates from the blockchain..')
        const donates = await buyMeATea.getDonates()
        // console.log('fetched!')
        setDonates(donates)
      } else {
        // console.log('Metamask is not connected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])

  useEffect(() => {
    getDonates()
  }, [provider])

  return (
    <div className='main flex justify-center mt-10'>
      <div className='flex-col content-center justify-center'>
        <div className='flex flex-col px-5'>
          <h1 className='font-[Dosis] text-6xl mb-16 text-center'>
            If you like my work, please support me!
            <p className='mt-7'>☕</p>
          </h1>

          {provider && (
            <>
              <h2 className='text-3xl text-center mb-4'>Buy me a tea!</h2>
              <div className='flex flex-col gap-5 items-center'>
                <Input label={'Name'} onc={onNameChange} />
                <Input label={'Message'} onc={onMessageChange} />
                <Input
                  label={'Value (ETH)'}
                  onc={onValueChange}
                  validate={true}
                />
                <button
                  className='text-white px-7 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-3 rounded-full text-xl'
                  onClick={buyTea}
                >
                  Donate!
                </button>
              </div>
            </>
          )}
        </div>
        {provider && (
          <h1 className='mt-8 mb-4 text-2xl text-gray-800 font-medium font-[Roboto] px-5'>
            Recent donates
          </h1>
        )}
        {provider && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mb-8 px-5'>
            {donates
              .slice(0)
              .reverse()
              .map((d, idx) => {
                let { value, name, message } = d
                value = ethers.utils.formatEther(value)
                return (
                  <Donate
                    key={idx}
                    name={name}
                    value={value}
                    message={message}
                  />
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
