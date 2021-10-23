import scriptFetchFlowBalance from "../flow/script.fetchFlowBalance"
import { IDLE, IDLE_DELAY, PROCESSING } from "../constants/status"
import { atomFamily, selectorFamily, useRecoilState } from "recoil"
import sleep from "../utils/sleep"

export const $value = atomFamily({
  key: "flow-balance::value",
  default: selectorFamily({
    key: "flow-balance::init",
    get: (address: string | null) => async () => scriptFetchFlowBalance(address),
  }),
})

export const $status = atomFamily({
  key: "flow-balance::status",
  default: IDLE,
})

const useFlowBalance = (address: string | null) => {
  const [balance, setBalance] = useRecoilState($value(address))
  const [status, setStatus] = useRecoilState($status(address))

  async function update() {
    setStatus(PROCESSING)
    await scriptFetchFlowBalance(address).then(setBalance)
    await sleep(IDLE_DELAY)
    setStatus(IDLE)
  }

  return {
    balance,
    status,
    update,
  }
}

export default useFlowBalance
