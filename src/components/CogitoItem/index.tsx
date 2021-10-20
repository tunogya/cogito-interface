import {FC, Suspense} from "react"
import {Text} from "@chakra-ui/react"

interface Props {
  id: Number
}

const CogitoItem: FC<Props> = (props) => {
  return (
    <>
      <Text>{props.id}</Text>
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