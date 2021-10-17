const checkMedia = (type: string | undefined) => {
  if (!type) { return false }
  const t = type.split('/')[0].toLowerCase()
  return t === "audio" || t === "image" || t === "video";
}

export default checkMedia