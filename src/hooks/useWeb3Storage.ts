import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"
import {useState} from "react";
import {IDLE, PROCESSING} from "../constants/status";
import {FileData} from "../state/Files/FileData";

const apiKey = process.env.REACT_APP_WEB3_STORAGE_DEFAULT_KEY

export const useWeb3Storage = () => {
  const [state, setState] = useState(IDLE)

  if (!apiKey) {
    return
  }

  const web3storage = new Web3Storage({token: apiKey})

  const storeFile = async (fileList: FileData[]) => {
    setState(PROCESSING)
    const files = fileList.map((f)=>(
      new File([f.content], f.name, {type: f.type})
    ))
    const cid = await web3storage.put(files)
    setState(IDLE)
    return cid
  }

  return {
    state,
    storeFile,
  }
}

export default useWeb3Storage