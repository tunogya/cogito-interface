import {atom} from "recoil";
import {FileData} from "./FileData";

const defaultFiles: FileData[] = []

export const filesAtom = atom({
  key: "upload::files",
  default: defaultFiles,
})