export interface Domain {
  id: number
  slug: string
  title: string
  label: string
  image: string
  video?: string
  mainVideo?: string
  description: string
  longDescription: string
  capabilities: string[]
  projects: { title: string; client: string; image: string }[]
}

export interface Playlist {
  title: string
  url: string
}

export interface Section {
  label: string
  title: string
  content: string
}

export interface HomeSettings {
  heroTitle1: string
  heroTitle2: string
  heroSubtitle: string
  heroVideo: string
  positioningTitle1: string
  positioningTitle2: string
  positioningDesc: string
}

export interface SocialSettings {
  email: string
  instagram: string
  youtube: string
  playlists: Playlist[]
}
