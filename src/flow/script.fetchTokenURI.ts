import { send, decode, script, args, arg, cdc } from "@onflow/fcl"
import * as t from "@onflow/types"

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

pub fun main(address: Address, id: UInt64): String? {
  if let collection = getAccount(address).getCapability<&Cogito.Collection{NonFungibleToken.CollectionPublic, Cogito.CogitoCollectionPublic}>(Cogito.CollectionPublicPath).borrow() {
    if let item = collection.borrowCogito(id: id) {
      return item.metadata
    }
  }

  return nil
}
`

const scriptFetchTokenURI = (address: string | null, id: Number) => {
  if (address == null) return Promise.resolve(null)

  return send([script(CODE), args([arg(address, t.Address), arg(id, t.UInt64)])]).then(decode)
}

export default scriptFetchTokenURI
