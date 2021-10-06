export const shortenCid = (address: string, chars = 6) => {
  if (!address) { return }
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`
}

export const parseCidToHttpUrl = (cid: string) => {
  if (cid === "") { return }
  return "https://" + cid + ".ipfs.dweb.link/"
}