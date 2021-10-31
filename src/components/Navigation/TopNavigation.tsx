import { Button, Stack } from "@chakra-ui/react"
import { links } from "./index"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export const TopNavigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const { width } = useWindowDimensions()

  return (
    <Stack direction={"row"} justifyContent={"flex-end"} p={2} alignItems={"center"}>
      {links.map((link, index) => (
        <Button
          key={index}
          fontWeight={currentPath === link.pathname ? "bold" : "normal"}
          variant={currentPath === link.pathname ? "solid" : "ghost"}
          size={"sm"}
          onClick={() => {
            history.push(link.pathname)
            setCurrentPath(link.pathname)
          }}
        >
          {link.label}
        </Button>
      ))}
      {width < 980 && (
        <Button
          fontWeight={currentPath === "explore" ? "bold" : "normal"}
          variant={currentPath === "explore" ? "solid" : "ghost"}
          size={"sm"}
          onClick={() => {
            history.push("explore")
            setCurrentPath("explore")
          }}
        >
          Explore
        </Button>
      )}
    </Stack>
  )
}
