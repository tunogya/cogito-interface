import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {ERROR, IDLE, IDLE_DELAY, LOADING, PROCESSING} from "../constants/status";
import scriptIsCogitoInit from "../flow/script.isCogitoInit";
import txInitCogito from "../flow/tx.initCogito";
import sleep from "../utils/sleep";

export const $status = atomFamily({
  key: "init-cogito::status",
  default: IDLE
})

export const $init = atomFamily({
  key: "init-cogito::state",
  default: selectorFamily({
    key: "init-cogito::default",
    // @ts-ignore
    get: address => () => scriptIsCogitoInit(address),
  })
})

// export const $computedInit = selectorFamily({
//   key: "init-cogito::computed",
//   get:
//     address =>
//       async ({get}) => {
//         return get($init(address))
//       },
// })

const useInitCogito = (address: string | null) => {
  const [init, setInit] = useRecoilState($init(address))
  // const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  const recheck = () => {
    scriptIsCogitoInit(address).then(setInit)
  }

  const initialize = async () => {
    await txInitCogito(address, {
      onStart(){
        setStatus(PROCESSING)
      },
      onSuccess(){
        recheck()
      },
      onError() {
        setStatus(ERROR)
      },
      async onComplete() {
        await sleep(IDLE_DELAY);
        setStatus(IDLE)
      },
    })
  }

  return {
    init,
    // isInitialized,
    status: init === null ? LOADING : status,
    recheck,
    initialize,
  }
}

export default useInitCogito