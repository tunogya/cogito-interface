import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./utils/tx";
import * as t from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

// This script uses the Cogito Collection resource to destroy a Cogito NFT
// It must be run with the account that has the collection resource
// stored in /storage/CogitoCollection

transaction(id: UInt64) {

    // local variable for storing the minter reference
    let collection: &Cogito.Collection

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.collection = signer.borrow<&Cogito.Collection>(from: Cogito.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the NFT collection")
    }

    execute {
        // Burn the NFT
        self.collection.burnNFT(id: id)
    }
}
`

const txBurnCogito = (id: Number, opts = {}) => {
  invariant(id != null, "Tried to mint a cogito but no metadata")

  return tx(
    [
      transaction(CODE),
      args([
        arg(id, t.UInt64),
      ]),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
      limit(1000),
    ],
    opts
  )
}

export default txBurnCogito