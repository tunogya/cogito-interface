import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS

pub fun main(address: Address): Bool {
  let collection: Bool = getAccount(address)
      .getCapability<&{NonFungibleToken.CollectionPublic}>(/public/CogitoCollection)
      .check()

  return collection
}
`

const scriptIsCogitoInit = (address: string | null) => {
  if (address == null) return Promise.resolve(false)

  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}

export default scriptIsCogitoInit