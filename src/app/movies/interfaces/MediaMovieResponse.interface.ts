export interface MovieListResponse{
  $id:string
  $values:MediaMovieResponse[]
}
export interface MediaMovieResponse {
  $id: string
  movieData: MovieData
  duration: string
  genderLists: GenderLists
}

interface MovieData {
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
  relaseDate: string
  ageRate: string
  isActive: boolean
  typeMedia: string
}

export interface GenderLists {
  $id: string
  $values: string[]
}
