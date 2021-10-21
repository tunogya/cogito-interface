import {atomFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../constants/status";
import scriptFetchTokenURI from "../flow/script.fetchTokenURI";
import fetcher from "../utils/fetcher";
import parseUriToHttp from "../utils/parseUriToHttp";
import {useEffect, useState} from "react";

const $statusAtom = atomFamily({
  key: "cogito-ids::status",
  default: IDLE,
})

interface AttachmentItem {
  name: string
  uri: string
}

interface CogitoProps {
  author?: string
  create_at: number
  text?: string
  attachment?: {
    media?: [AttachmentItem],
    files?: [AttachmentItem],
  }
}

const useCogitoTokenURI = (address: string | null, id: number) => {
  // @ts-ignore
  const [status, setStatus] = useRecoilState($statusAtom())
  const [cogito, setCogito] = useState<CogitoProps>()

  async function refresh() {
    setStatus(PROCESSING)
    // @ts-ignore
    const uri = await scriptFetchTokenURI(address, id).then(res=>res)
    const cogito =await fetcher(parseUriToHttp(uri)[0]).then(res=>res)
    setCogito(cogito)
    await
    setStatus(IDLE)
  }

  useEffect(()=>{
    refresh()
  }, [])

  return {
    cogito,
    status,
    refresh,
  }
}

export default useCogitoTokenURI