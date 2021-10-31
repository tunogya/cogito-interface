import { atomFamily, selectorFamily, useRecoilState } from "recoil"
import { IDLE, PROCESSING } from "../constants/status"
import fetchFlowStorage from "../flow/script.fetchFlowStorage"

export const valueAtom = atomFamily({
  key: "flow-storage::state",
  default: selectorFamily({
    key: "flow-storage::default",
    get: (address: string | null) => async () => fetchFlowStorage(address),
  }),
})

export const statusAtom = atomFamily({
  key: "flow-storage::status",
  default: IDLE,
})

const useFlowStorageHook = (address: string | null) => {
  const [storage, setStorage] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  return {
    storage,
    status,
    async refresh() {
      setStatus(PROCESSING)
      await fetchFlowStorage(address).then(setStorage)
      setStatus(IDLE)
    },
  }
}

export default useFlowStorageHook
