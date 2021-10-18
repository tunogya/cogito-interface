import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS

pub fun main(address: Address): [UInt64] {
    let collectionRef = getAccount(address)
        .getCapability<&{NonFungibleToken.CollectionPublic}>(/public/CogitoCollection)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs()
}
`


const scriptFetchCogitoIDs = (address: string | null) => {
  if (address == null) return Promise.resolve(false)

  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}

export default scriptFetchCogitoIDs