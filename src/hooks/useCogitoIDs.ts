import {IDLE, PROCESSING} from "../constants/status";
import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import scriptFetchCogitoIDs from "../flow/script.fetchCogitoIDs";
import scriptFetchCogitoLength from "../flow/script.fetchCigitoLength";

const $idsAtom = atomFamily({
  key: "cogito-ids::value",
  default: selectorFamily({
    key: "cogito-ids::default",
    // @ts-ignore
    get: address => async () => scriptFetchCogitoIDs(address),
  }),
})

const $lengthAtom = atomFamily({
  key: "cogito-length::value",
  default: selectorFamily({
    key: "cogito-length::default",
    // @ts-ignore
    get: address => async () => scriptFetchCogitoLength(address)
  })
})

const $statusAtom = atomFamily({
  key: "cogito-ids::status",
  default: IDLE,
})

export function useCogitoIds(address: string | null) {
  const [ids, setIds] = useRecoilState($idsAtom(address))
  const [length, setLength] = useRecoilState($lengthAtom(address))
  const [status, setStatus] = useRecoilState($statusAtom(address))

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