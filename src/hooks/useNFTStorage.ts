import { Blob, NFTStorage } from "nft.storage"
import { IDLE, PROCESSING } from "../constants/status"
import { useState } from "react"

const apiKey = process.env.REACT_APP_NFT_STORAGE_DEFAULT_KEY

export const useNFTStorage = () => {
  const [state, setState] = useState(IDLE)

  if (!apiKey) {
    return
  }

  const client = new NFTStorage({ token: apiKey })

  const storeBlob = async (data: any) => {
    setState(PROCESSING)
    const result = await client.storeBlob(new Blob([data]))
    setState(IDLE)
    return result
  }

  const queryStatus = async (cid: string) => {
    return await client.status(cid)
  }

  return {
    state,
    storeBlob,
    queryStatus,
  }
}
