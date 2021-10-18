import * as fcl from "@onflow/fcl";

const scriptFetchFlowBalance = (address: string) => {
  if (address == null) return Promise.resolve(null)
  return fcl.account(address).then((d: { balance: string; }) => d.balance)
}

export default scriptFetchFlowBalance