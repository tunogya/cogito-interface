import {IDLE, PROCESSING} from "../constants/status";
import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import scriptFetchCogitoIDs from "../flow/script.fetchCogitoIDs";

export const valueAtom = atomFamily({
  key: "cogito-ids::value",
  default: selectorFamily({
    key: "pass-ids::default",
    // @ts-ignore
    get: address => async () => scriptFetchCogitoIDs(address),
  }),
})

export const statusAtom = atomFamily({
  key: "cogito-ids::status",
  default: IDLE,
})

export function useCogitoIds(address: string | null) {
  const [ids, setIds] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await scriptFetchCogitoIDs(address).then(setIds)
    setStatus(IDLE)
  }

  return {
    ids,
    status,
    refresh,
  }
}