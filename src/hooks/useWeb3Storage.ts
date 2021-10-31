import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"
import { useState } from "react"
import { IDLE, PROCESSING } from "../constants/status"
import { FileData } from "../state/Files/FileData"

const apiKey = process.env.REACT_APP_WEB3_STORAGE_DEFAULT_KEY

const useWeb3Storage = () => {
  const [status, setStatus] = useState(IDLE)
  const [progress, setProgress] = useState(0)

  if (!apiKey) {
    return
  }

  const web3storage = new Web3Storage({ token: apiKey })

  const storeFile = async (fileList: FileData[]) => {
    const onRootCidReady = (cid: string) => {
      console.log("uploading files with cid:", cid)
      setStatus(PROCESSING)
    }

    const totalSize = fileList.map(f => f.size).reduce((a, b) => a + b, 0)
    let uploaded = 0

    const onStoredChunk = (size: number) => {
      uploaded += size
      const pct = (uploaded / totalSize) * 100 <= 100 ? (uploaded / totalSize) * 100 : 100
      setProgress(Number(pct.toFixed(2)))
    }

    const files = fileList.map(f => new File([f.content], f.name, { type: f.type }))

    const cid = await web3storage.put(files, { onRootCidReady, onStoredChunk })
    setStatus(IDLE)
    return cid
  }

  return {
    status,
    progress,
    storeFile,
  }
}

export default useWeb3Storage
