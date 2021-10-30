import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {IDLE, PROCESSING} from "../constants/status"
import scriptFetchTokenURI from "../flow/script.fetchTokenURI"
import fetcher from "../utils/fetcher"
import parseUriToHttp from "../utils/parseUriToHttp"

const $cogitoAtom = atomFamily({
  // @ts-ignore
  key: ({address, id}) => () => { return address + id + "cogito::value" },
  default: selectorFamily({
    key: "cogito::default",
    // @ts-ignore
    get: ({address, id}) => async () => {
      return await fetchCogito(address, id)
    }
  })
})

const $uriAtom = atomFamily({
  // @ts-ignore
  key: ({address, id}) => () => { return address + id + "cogito-uri::value" },
  default: selectorFamily({
    key: "cogito-uri::default",
    // @ts-ignore
    get: ({address, id}) => async () => {
      return await fetchUri(address, id)
    }
  })
})

const $statusAtom = atomFamily({
  // @ts-ignore
  key: ({address, id}) => () => { return address + id + "cogito-ids::status" },
  default: IDLE,
})

const fetchCogito = async (address: string, id: number) => {
  const uri = await fetchUri(address, id)
  return await fetcher(parseUriToHttp(uri)[0] + "metadata.json").then(res => res)
}

const fetchUri = async (address: string, id: number) => {
  return await scriptFetchTokenURI(address, id).then((res: any) => res)
}

const useCogitoTokenURI = (address: string | null, id: number) => {
  const [status, setStatus] = useRecoilState($statusAtom({ address, id}))
  const [uri, setUri] = useRecoilState($uriAtom({address, id}))
  const [cogito, setCogito] = useRecoilState($cogitoAtom({ address, id }))

  async function refresh() {
    setStatus(PROCESSING)
    if (address && id) {
      const uri = await fetchUri(address, id)
      setUri(uri)
      const cogito = await fetchCogito(address, id)
      setCogito(cogito)
    }
    setStatus(IDLE)
  }

  return {
    uri,
    cogito,
    status,
    refresh,
  }
}

export default useCogitoTokenURI
