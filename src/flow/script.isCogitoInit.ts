import { send, decode, script, args, arg, cdc } from "@onflow/fcl"
import * as t from "@onflow/types"

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

pub fun main(address: Address): Bool {
  let collection: Bool = getAccount(address)
      .getCapability<&{NonFungibleToken.CollectionPublic}>(Cogito.CollectionPublicPath)
      .check()

  return collection
}
`

const scriptIsCogitoInit = (address: string | null) => {
  if (address == null) return Promise.resolve(null)

  return send([script(CODE), args([arg(address, t.Address)])]).then(decode)
}

export default scriptIsCogitoInit
