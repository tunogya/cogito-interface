import { Web3Storage } from 'web3.storage'

const apiKey = process.env.REACT_APP_WEB3_STORAGE_DEFAULT_KEY

const useWeb3Storage = () => {
  if (!apiKey){
    return
  }

  const client = new Web3Storage({token: apiKey})

  return null
}

export default useWeb3Storage