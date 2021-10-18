import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import scriptFetchCogitoSupply from "../flow/script.fetchCogitoSupply";
import {IDLE, PROCESSING} from "../constants/status";

export const supplyAtom = atomFamily({
  key: "wkdt-supply::state",
  default: selectorFamily({
    key: "wkdt-supply::default",
    get: () => async () => scriptFetchCogitoSupply(),
  }),
})

export const statusAtom = atomFamily({
  key: "wkdt-supply::status",
  default: IDLE,
})

const useCogitoSupply = () => {
  // @ts-ignore
  const [supply, setSupply] = useRecoilState(supplyAtom())
  // @ts-ignore
  const [status, setStatus] = useRecoilState(statusAtom())

  return {
    supply,
    status,
    async refresh() {
      setStatus(PROCESSING)
      await scriptFetchCogitoSupply().then(setSupply)
      setStatus(IDLE)
    },
  }
}

export default useCogitoSupply