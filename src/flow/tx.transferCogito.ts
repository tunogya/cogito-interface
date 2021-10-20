import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./utils/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

// This transaction transfers a Cogito from one account to another.

transaction(recipient: Address, withdrawID: UInt64) {
    prepare(signer: AuthAccount) {

        // get the recipients public account object
        let recipient = getAccount(recipient)

        // borrow a reference to the signer's NFT collection
        let collectionRef = signer.borrow<&Cogito.Collection>(from: Cogito.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        // borrow a public reference to the receivers collection
        let depositRef = recipient.getCapability(Cogito.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()!

        // withdraw the NFT from the owner's collection
        let nft <- collectionRef.withdraw(withdrawID: withdrawID)

        // Deposit the NFT in the recipient's collection
        depositRef.deposit(token: <-nft)
    }
}
`

const txTransferCogito = (recipient: string, withdrawID: Number, opts = {}) => {
  invariant(recipient != null, "transferWakandaToken({recipient, withdrawID}) -- amount required")
  invariant(withdrawID != null, "transferWakandaToken({recipient, withdrawID}) -- to required")

  return tx([
    transaction(CODE),
    args([
      arg(recipient, t.Address),
      arg(withdrawID, t.UInt64),
    ]),
    proposer(authz),
    payer(authz),
    authorizations([authz]),
    limit(1000),
  ], opts)
}

export default txTransferCogito