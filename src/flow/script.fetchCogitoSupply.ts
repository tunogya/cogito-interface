import {send, decode, script, cdc, args} from "@onflow/fcl";

const CODE = cdc`
import Cogito from 0xCOGITOADDRESS

// This script reads the current number of cogito that have been minted
// from the Cogito contract and returns that number to the caller

// Returns: UInt64
// Number of cogito minted from Cogito contract

pub fun main(): UInt64 {

    return Cogito.totalSupply
}
`

const scriptFetchCogitoSupply = () => {
  return send([
    script(CODE),
    args([])
  ]).then(decode)
}

export default scriptFetchCogitoSupply