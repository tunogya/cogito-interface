import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./utils/tx";
import * as t from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNFTADDRESS
import Cogito from 0xCOGITOADDRESS

// This script uses the CogitoMinter resource to mint a new Cogito NFT
// It must be run with the account that has the minter resource
// stored in /storage/CogitoMinter

transaction(recipient: Address, metadata: String) {

    // local variable for storing the minter reference
    let minter: &Cogito.CogitoMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&Cogito.CogitoMinter>(from: /storage/CogitoMinter)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let receiver = getAccount(recipient)
            .getCapability(/public/CogitoCollection)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, metadata: metadata)
    }
}
`

const txMintCogito = (recipient: string, metadata: string, opts = {}) => {
  invariant(recipient != null, "Tried to mint a cogito but no address")
  invariant(metadata != null, "Tried to mint a cogito but no metadata")

  return tx(
    [
      transaction(CODE),
      args([
        arg(recipient, t.Address),
        arg(metadata, t.String),
      ]),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
      limit(1000),
    ],
    opts
  )
}

export default txMintCogito