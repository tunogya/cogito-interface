import { atomFamily, selectorFamily, useRecoilState } from "recoil"
import { ERROR, IDLE, IDLE_DELAY, LOADING, PROCESSING } from "../constants/status"
import scriptIsCogitoInit from "../flow/script.isCogitoInit"
import txSetupCogito from "../flow/tx.setupCogito"
import sleep from "../utils/sleep"

export const $status = atomFamily({
  key: "init-cogito::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init-cogito::state",
  default: selectorFamily({
    key: "init-cogito::default",
    // @ts-ignore
    get: address => () => scriptIsCogitoInit(address),
  }),
})

const useSetupCogito = (address: string | null) => {
  const [init, setInit] = useRecoilState($init(address))
  const [status, setStatus] = useRecoilState($status(address))

  const recheck = () => {
    scriptIsCogitoInit(address).then(setInit)
  }

  const setup = async () => {
    await txSetupCogito(address, {
      onStart() {
        setStatus(PROCESSING)
      },
      onSuccess() {
        recheck()
      },
      onError() {
        setStatus(ERROR)
      },
      async onComplete() {
        await sleep(IDLE_DELAY)
        setStatus(IDLE)
      },
    })
  }

  return {
    init,
    status: init === null ? LOADING : status,
    recheck,
    setup,
  }
}

export default useSetupCogito
