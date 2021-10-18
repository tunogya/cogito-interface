import scriptFetchFlowBalance from "../flow/script.fetchFlowBalance";
import {IDLE, PROCESSING} from "../constants/status";
import {atomFamily, selectorFamily, useRecoilState} from "recoil";


const valueAtom = atomFamily({
  key: "flow-balance::value",
  default: selectorFamily({
    key: "flow-balance::init",
    get: (address: string | null) => async() => scriptFetchFlowBalance(address)
  }),
})

const statusAtom = atomFamily({
  key: "flow-balance::status",
  default: IDLE,
})

const useFlowBalance = (address: string | null) => {
  const [balance, setBalance] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function update(){
    setStatus(PROCESSING)
    await scriptFetchFlowBalance(address).then(setBalance)
    setStatus(IDLE)
  }

  return {
    balance,
    status,
    update,
  }
}

export default useFlowBalance




