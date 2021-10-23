import { send, decode, script, args, arg, cdc } from "@onflow/fcl"
import { Address } from "@onflow/types"

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

// This transaction gets the length of an account's nft collection

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(Cogito.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs().length
}
`

const scriptFetchCogitoLength = (address: string | null) => {
  if (address == null) return Promise.resolve(false)

  return send([script(CODE), args([arg(address, Address)])]).then(decode)
}

export default scriptFetchCogitoLength
