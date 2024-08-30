export interface MediaListResponse {
  $id: string
  mediaView: MediaView
}

interface MediaView {
  $id: string
  $values: number[]
}
