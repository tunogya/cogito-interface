import {Web3Storage} from 'web3.storage'
import {useState} from "react";
import {IDLE, PROCESSING} from "../constants/status";

const apiKey = process.env.REACT_APP_WEB3_STORAGE_DEFAULT_KEY

export const useWeb3Storage = () => {
  const [state, setState] = useState(IDLE)

  const validateToken = async (token: string) => {
    const web3storage = new Web3Storage({token})

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of web3storage.list({maxResults: 1})) {
        // any non-error response means the token is legit
        break
      }
      return true
    } catch (e) {
      // only return false for auth-related errors
      if (e.message.includes('401') || e.message.includes('403')) {
        console.log('invalid token', e.message)
        return false
      }
      // propagate non-auth errors
      throw e
    }
  }

  if (!apiKey || !validateToken(apiKey)) {
    return
  }

  const web3storage = new Web3Storage({token: apiKey})

  const storeFile = async (data: any) => {
    setState(PROCESSING)
    const file = new File([data], 'hello.txt', {type: 'text/plain'})
    const cid = await web3storage.put([file])
    setState(IDLE)
    return cid
  }

  return {
    state,
    validateToken,
    storeFile,
  }
}

export default useWeb3Storage