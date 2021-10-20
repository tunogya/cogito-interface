import {atomFamily, useRecoilState} from "recoil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../constants/status";
import txMintCogito from "../flow/tx.mintCogito";
import sleep from "../utils/sleep";

export const statusAtom = atomFamily({
  key: "pass-ids::status",
  default: IDLE,
})

const useCogitoMinter = () => {
  // @ts-ignore
  const [status, setStatus] = useRecoilState(statusAtom())

  const mint = async (metadata: string) => {
    console.log(metadata)
    return await txMintCogito(metadata, {
      onStart() {
        setStatus(PROCESSING)
      },
      async onSuccess() {
        setStatus(SUCCESS)
      },
      async onComplete() {
        await sleep(IDLE_DELAY)
        setStatus(IDLE)
      },
      async onError() {
        setStatus(ERROR)
      },
    })
  }

  return {
    status,
    mint,
  }

}

export default useCogitoMinter