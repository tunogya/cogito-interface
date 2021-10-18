import {account} from "@onflow/fcl";

const scriptFetchFlowBalance = (address: string | null) => {
  if (address == null) return Promise.resolve(null)
  // @ts-ignore
  return account(address).then(d => d.balance)
}

export default scriptFetchFlowBalance
