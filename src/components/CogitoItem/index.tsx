import {FC, Suspense} from "react"
import {Divider, Spacer, Stack, Text} from "@chakra-ui/react"
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import shortenCid from "../../utils/shortenCid";

interface Props {
  id: number
}

const CogitoItem: FC<Props> = (props) => {
  const {user} = useCurrentUser()
  const cogitoReq = useCogitoTokenURI(user.addr, props.id)

  return (
    <Stack spacing={0}>
      <Stack p={8}>
        <Text fontWeight={"bold"}>{cogitoReq.cogito?.text}</Text>
        <Stack direction={"row"}>
          <Text fontSize={"xs"}>#{props.id}</Text>
          { cogitoReq.cogito?.author && cogitoReq.cogito?.author !== user.addr && (
            <Text fontSize={"xs"} fontWeight={"bold"}>{shortenCid(cogitoReq.cogito?.author, 6)}</Text>
          )}
          <Spacer/>
          { cogitoReq.cogito?.create_at && (
            <Text fontSize={"xs"}>{ new Date(Number(cogitoReq.cogito?.create_at)).toLocaleString()}</Text>
          ) }
        </Stack>
      </Stack>
      <Divider/>
    </Stack>
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