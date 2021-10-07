export interface Interfaces {
  name: string,
  description: string,
  image: string,
  properties: {
    attachment: [Attachment],
    copyright: string | null,
  }
}

export interface Attachment {
  fileName: string
  content: File
  cid: string
}