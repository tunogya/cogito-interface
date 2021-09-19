// @ts-ignore
import { config } from "@onflow/fcl"

config()
  .put("app.detail.title", "Cogito Interface")
  .put("env", process.env.REACT_APP_CHAIN_ENV)
  .put("accessNode.api", process.env.REACT_APP_FLOW_ACCESS_API_URL)
  .put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)
  .put("0xFungibleToken", process.env.REACT_APP_CONTRACT_FUNGIBLE_TOKEN)
  .put("0xNonFungibleToken", process.env.REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN)
  .put("0xFUSD", process.env.REACT_APP_CONTRACT_FUSD)
  .put("0xCOGITO", process.env.REACT_APP_CONTRACT_COGITO)
// .put("decoder.Type", (val) => val.staticType)
