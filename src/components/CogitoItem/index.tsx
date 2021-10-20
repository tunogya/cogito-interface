import {FC, Suspense} from "react"
import {Text} from "@chakra-ui/react"
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {useCurrentUser} from "../../hooks/useCurrentUser";

interface Props {
  id: number
}

const CogitoItem: FC<Props> = (props) => {
  const {user} = useCurrentUser()
  const cogito = useCogitoTokenURI(user.addr, props.id)
  return (
    <>
      <Text>{props.id}</Text>
      <Text>{cogito.uri}</Text>
    </>
  )
}

const SkeletonPage = () => {
  return (
    <></>
  )
}

const WrappedCogitoItem: FC<Props> = (props) => {
  return (
    <Suspense fallback={<SkeletonPage/>}>
      <CogitoItem {...props}/>
    </Suspense>
  )
}

export default WrappedCogitoItem