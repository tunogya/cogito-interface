import {send, decode, script, cdc, args} from "@onflow/fcl";

const CODE = cdc`
import Cogito from 0xCOGITOADDRESS

pub fun main(): UInt64 {
    let supply = Cogito.totalSupply
    return supply
}
`

const scriptFetchCogitoSupply = () => {
  return send([
    script(CODE),
    args([])
  ]).then(decode)
}

export default scriptFetchCogitoSupply