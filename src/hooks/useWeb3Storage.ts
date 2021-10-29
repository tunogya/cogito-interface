import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"
import {useState} from "react";
import {IDLE, PROCESSING} from "../constants/status";

const apiKey = process.env.REACT_APP_WEB3_STORAGE_DEFAULT_KEY

export const useWeb3Storage = () => {
  const [state, setState] = useState(IDLE)

  if (!apiKey) {
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
    storeFile,
  }
}

export default useWeb3Storage