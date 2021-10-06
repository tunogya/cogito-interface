import { config } from "@onflow/fcl"

config()
  .put("grpc.metadata", {"api_key": process.env.REACT_APP_ALCHEMY_API_KEY})
  .put("app.detail.title", process.env.REACT_APP_DETAIL_TITLE)
  .put("app.detail.icon", process.env.REACT_APP_DETAIL_ICON)
  .put("env", process.env.REACT_APP_CHAIN_ENV)
  .put("accessNode.api", process.env.REACT_APP_FLOW_ACCESS_API_URL)
  .put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY)
  .put("0xFungibleToken", process.env.REACT_APP_CONTRACT_FUNGIBLE_TOKEN)
  .put("0xNonFungibleToken", process.env.REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN)
  // .put("0xCOGITO", process.env.REACT_APP_CONTRACT_COGITO)
// .put("decoder.Type", (val) => val.staticType)

