import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../constants/status";
import scriptFetchTokenURI from "../flow/script.fetchTokenURI";
import fetcher from "../utils/fetcher";
import parseUriToHttp from "../utils/parseUriToHttp";

const $valueAtom = atomFamily({
  // @ts-ignore
  key: ({address, id}) => () => { return address + id + "cogito::value" } ,
  default: selectorFamily({
    key: "cogito::default",
    // @ts-ignore
    get: ({address, id}) => async () => {
      // @ts-ignore
      const uri = await scriptFetchTokenURI(address, id).then(res=>res)
      return await fetcher(parseUriToHttp(uri)[0]).then(res=>res)
    }
  })
})

const $statusAtom = atomFamily({
  // @ts-ignore
  key: ({address, id}) => () => { return address + id + "cogito-ids::status" },
  default: IDLE,
})

const useCogitoTokenURI = (address: string | null, id: number) => {
  // @ts-ignore
  const [status, setStatus] = useRecoilState($statusAtom())
  // @ts-ignore
  const [cogito, setCogito] = useRecoilState($valueAtom({address, id}))

  async function refresh() {
    setStatus(PROCESSING)
    // @ts-ignore
    const uri = await scriptFetchTokenURI(address, id).then(res=>res)
    const cogito =await fetcher(parseUriToHttp(uri)[0]).then(res=>res)
    setCogito(cogito)
    await
    setStatus(IDLE)
  }

  return {
    cogito,
    status,
    refresh,
  }
}

export default useCogitoTokenURI