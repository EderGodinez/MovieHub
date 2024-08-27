export interface SerieResponse {
  $id: string
  id: number
  title: string
  originalTitle: string
  overview: string
  imagePath: string
  posterImage: string
  trailerLink: string
  watchLink: string
  addedDate: string
  typeMedia: string
  relaseDate: string
  ageRate: string
  isActive: boolean
  gendersLists: GendersLists
  mediaAvailibleIns: MediaAvailibleIns
  seasons: Seasons
  rating: any
  votes: number
}

export interface GendersLists {
  $id: string
  $values: string[]
}

export interface MediaAvailibleIns {
  $id: string
  $values: string[]
}

export interface Seasons {
  $id: string
  $values: Value[]
}

export interface Value {
  $id: string
  seasonId: number
  numSeason: number
  episodes: Episodes
}

export interface Episodes {
  $id: string
  $values: Value2[]
}

export interface Value2 {
  $id: string
  id: number
  title: string
  overview: string
  e_Num: number
  duration: string
  imagePath: string
  addedDate: string
  watchLink: string
  relaseDate: string
}
