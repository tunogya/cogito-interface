import { IDLE, PROCESSING } from "../constants/status"
import { atomFamily, selectorFamily, useRecoilState } from "recoil"
import scriptFetchCogitoIDs from "../flow/script.fetchCogitoIDs"
import scriptFetchCogitoLength from "../flow/script.fetchCigitoLength"

export const idsAtom = atomFamily({
  key: "cogito-ids::value",
  default: selectorFamily({
    key: "cogito-ids::default",
    get: (address: string | null) => async () => scriptFetchCogitoIDs(address),
  }),
})

export const lengthAtom = atomFamily({
  key: "cogito-length::value",
  default: selectorFamily({
    key: "cogito-length::default",
    get: (address: string | null) => async () => scriptFetchCogitoLength(address),
  }),
})

export const statusAtom = atomFamily({
  key: "cogito-ids::status",
  default: IDLE,
})

const useCogitoIDs = (address: string | null) => {
  const [ids, setIds] = useRecoilState(idsAtom(address))
  const [length, setLength] = useRecoilState(lengthAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    scriptFetchCogitoLength(address).then(setLength)
    await scriptFetchCogitoIDs(address).then(setIds)
    setStatus(IDLE)
  }

  return {
    ids,
    length,
    status,
    refresh,
  }
}

export default useCogitoIDs
