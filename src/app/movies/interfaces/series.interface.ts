import { Episode } from "./Episode.interface";
import { Media } from "./media.interface";

export interface Serie extends Media{
  EpisodeList?:Episode[]
}








