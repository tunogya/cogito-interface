import {Blob, NFTStorage} from 'nft.storage'
import {atom, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../constants/status";

const apiKey = process.env.REACT_APP_NFT_STORAGE_DEFAULT_KEY

export const stateAtom = atom({
  key: "STORE_STATE",
  default: IDLE,
})

export const useNFTStorage = () => {
  const [state, setState] = useRecoilState(stateAtom)

  if (!apiKey) {
    return
  }

  const client = new NFTStorage({token: apiKey})

  const storeBlob = async (data: any) => {
    setState(PROCESSING)
    const result = await client.storeBlob(new Blob([data]))
    setState(IDLE)
    console.log(result)
    return result
  }

  const queryStatus = async (cid: string) => {
    return await client.status(cid)
  }

  const deleteFile = async (cid: string) => {
    return await client.delete(cid)
  }

  return {
    state,
    storeBlob,
    queryStatus,
    deleteFile,
  }
}