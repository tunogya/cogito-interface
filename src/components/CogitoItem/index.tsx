import {FC, Key, Suspense} from "react"
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react"
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {parseDate} from "../../utils/parseDate";

interface Props {
  address: string | null
  id: number
}

const CogitoItem: FC<Props> = props => {
  return (
    <AccordionItem>
      <AccordionButton h={12}>
        <Heading flex="1" textAlign="left" fontWeight={"normal"} fontSize={"md"}>
          #{props.id}
        </Heading>
        <AccordionIcon/>
      </AccordionButton>
      <AccordionPanel>
        <Suspense fallback={<Spinner size={"sm"}/>}>
          <CogitoContent address={props.address} id={props.id}/>
        </Suspense>
      </AccordionPanel>
    </AccordionItem>
  )
}

const CogitoContent: FC<Props> = props => {
  const cogito = useCogitoTokenURI(props.address, props.id)
  console.log(cogito.cogito?.attachment?.media)

  return (
    <Stack>
      <Text>{cogito.cogito.text}</Text>
      { cogito.cogito?.attachment?.media.map((media: any, index: Key)=> (
        <Text key={index}>{media.name}</Text>
      )) }
      <Text fontSize={"xs"} color={"gray"}>{parseDate(cogito.cogito.create_at)}</Text>
    </Stack>

  )
}

export default CogitoItem
