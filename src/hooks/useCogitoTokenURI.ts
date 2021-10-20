import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../constants/status";
import scriptFetchTokenURI from "../flow/script.fetchTokenURI";

const $valueAtom = atomFamily({
  // @ts-ignore
  key: ({address, id}) => { return address + id + "cogito-uri::value"} ,
  default: selectorFamily({
    key: "cogito-uri::default",
    // @ts-ignore
    get: ({address, id}) => async () => scriptFetchTokenURI(address, id),
  }),
})

const $statusAtom = atomFamily({
  key: "cogito-ids::status",
  default: IDLE,
})

const useCogitoTokenURI = (address: string | null, id: number) => {
  const [uri, setUri] = useRecoilState($valueAtom({address, id}))
  // @ts-ignore
  const [status, setStatus] = useRecoilState($statusAtom())

  async function refresh() {
    setStatus(PROCESSING)
    await scriptFetchTokenURI(address, id).then(setUri)
    setStatus(IDLE)
  }

  return {
    uri,
    status,
    refresh
  }

}

export default useCogitoTokenURI