export interface MediaTrending {
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
}
export interface TredingResponse {
  $id: string
  $values: MediaTrending[]
}
