import { transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg } from "@onflow/fcl"
import { invariant } from "@onflow/util-invariant"
import { tx } from "./utils/tx"
import * as t from "@onflow/types"

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

// This transaction uses the Collection resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path Cogito.CollectionStoragePath

transaction(metadata: String) {

    // local variable for storing the minter reference
    let minter: &Cogito.Collection

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&Cogito.Collection>(from: Cogito.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // mint the NFT and deposit it to minter's collection
        self.minter.mintNFT(metadata: metadata)
    }
}
`

const txMintCogito = (metadata: string, opts = {}) => {
  invariant(metadata != null, "Tried to mint a cogito but no metadata")

  return tx(
    [
      transaction(CODE),
      args([arg(metadata, t.String)]),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
      limit(1000),
    ],
    opts
  )
}

export default txMintCogito
