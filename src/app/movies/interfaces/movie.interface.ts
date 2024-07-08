export interface Movie {
  adult: boolean
  public_image_path: string
  genders: string[]
  id: number
  original_title?: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  media_type: string
}
