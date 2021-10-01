import fs from 'fs'
import {Blob, File, NFTStorage} from 'nft.storage'
import {Cogito} from "../constants/Cogito";

const apiKey = process.env.REACT_APP_NFT_STORAGE_DEFAULT_KEY

export const useNFTStorage = () => {
  if (!apiKey) {
    return
  }
  const client = new NFTStorage({token: apiKey})

  const storeCogito = async (cogito: Cogito) => {
    const metadata = await client.store({
      name: cogito.name,
      description: cogito.description,
      image: new File([cogito.image], `${cogito.name}.jpg`, {type: 'image/jpg'}),
      properties: {
        owner: cogito.owner,
      }
    } as any)
    console.log(metadata)
    return metadata
  }

  const storeBlob = async () => {
    const data = await fs.promises.readFile('useCurrentUser.ts')
    return await client.storeBlob(new Blob([data]))
  }

  const storeDirectory = async () => {
    return  await client.storeDirectory([
      new File([await fs.promises.readFile("useCurrentUser.ts")], 'useCurrentUser.ts'),
      new File([await fs.promises.readFile("useActiveLocale.ts")], 'useActiveLocale.ts'),
    ])
  }

  const queryStatus = async (cid: string) => {
    return await client.status(cid)
  }

  const deleteFile = async (cid: string) => {
    return await client.delete(cid)
  }

  return {
    storeCogito,
    storeBlob,
    storeDirectory,
    queryStatus,
    deleteFile,
  }
}