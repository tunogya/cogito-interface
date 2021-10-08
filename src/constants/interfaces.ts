export interface Interfaces {
  name: string,
  description: string,
  image: string | null,
  properties: {
    attachment: [Attachment] | null,
    copyright: string | null,
    createdTimestamp: number,
  }
}

export interface Attachment {
  fileName: string
  content: File
  cid: string
}