import { Blob, NFTStorage } from "nft.storage"
import { IDLE, PROCESSING } from "../constants/status"
import { useState } from "react"

const apiKey = process.env.REACT_APP_NFT_STORAGE_DEFAULT_KEY

export const useNFTStorage = () => {
  const [state, setState] = useState(IDLE)

  if (!apiKey) {
    return
  }

  const nftStorage = new NFTStorage({ token: apiKey })

  const storeBlob = async (data: any) => {
    setState(PROCESSING)
    const cid = await nftStorage.storeBlob(new Blob([data]))
    setState(IDLE)
    return cid
  }

  const queryStatus = async (cid: string) => {
    return await nftStorage.status(cid)
  }

  return {
    state,
    storeBlob,
    queryStatus,
  }
}
