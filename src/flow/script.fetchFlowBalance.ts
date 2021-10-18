import * as fcl from "@onflow/fcl";

const scriptFetchFlowBalance = (address: string | null) => {
  if (address == null) return Promise.resolve(null)
  // @ts-ignore
  return fcl.account(address).then(d => d.balance)
}

export default scriptFetchFlowBalance
