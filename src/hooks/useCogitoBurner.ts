import { atomFamily, useRecoilState } from "recoil"
import { ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS } from "../constants/status"
import txBurnCogito from "../flow/tx.burnCogito"
import sleep from "../utils/sleep"

export const statusAtom = atomFamily({
  key: "pass-ids::status",
  default: IDLE,
})

const useCogitoBurner = () => {
  // @ts-ignore
  const [status, setStatus] = useRecoilState(statusAtom())

  const burn = async (id: Number) => {
    await txBurnCogito(id, {
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

    return {
      status,
      burn,
    }
  }
}

export default useCogitoBurner
