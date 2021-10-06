export const parseCidToHttpUrl = (cid: string) => {
  if (cid === "") { return }
  return "https://" + cid + ".ipfs.dweb.link/"
}