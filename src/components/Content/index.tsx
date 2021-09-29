import {Box, Divider, Stack, Text} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {FC, ReactNode} from "react";

interface ContentProps {
  label: string
  children: ReactNode
}

export const Content: FC<ContentProps> = (props: ContentProps) => {
  return (
    <Box w={"100%"} h={"100%"}>
      <Text fontWeight={"bold"} fontSize={"xl"} p={"8px 16px"}>
        <Trans>{props.label}</Trans>
      </Text>
      <Divider/>
      <Stack p={"8px 16px 0 16px"}>
        { props.children }
      </Stack>
    </Box>
  )
}

export default Content