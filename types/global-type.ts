export interface Domain {
  id: number
  slug: string
  title: string
  label: string
  image: string
  video?: string
  description: string
  longDescription: string
  capabilities: string[]
  projects: { title: string; client: string; image: string }[]
  playlistUrl: string
}

export interface Section {
  label: string
  title: string
  content: string
}
