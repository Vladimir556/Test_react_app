export type SortType = 'asc' | 'desc';

export interface ILaunchQuery {
  docs: ILaunch[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: any
  nextPage: number
}


export interface ILaunch {
  fairings: any
  links: Links
  static_fire_date_utc: string
  static_fire_date_unix: number
  tbd: boolean | null
  net: boolean
  window: number
  rocket: string
  success: boolean
  failures: any[]
  details: string
  crew: string[]
  ships: string[]
  capsules: string[]
  payloads: string[]
  launchpad: string
  auto_update: boolean
  flight_number: number
  name: string
  date_utc: string
  date_unix: number
  date_local: string
  date_precision: string
  upcoming: boolean
  cores: Core[]
  id: string
  launch_library_id: string | null
}

export interface Links {
  patch: Patch
  reddit: Reddit
  flickr: Flickr
  presskit: string
  webcast: string
  youtube_id: string
  article: string
  wikipedia: string
}

export interface Patch {
  small: string
  large: string
}

export interface Reddit {
  campaign: string | null
  launch: string
  media: string | null
  recovery: string | null
}

export interface Flickr {
  small: any[]
  original: string[]
}

export interface Core {
  core: string
  flight: number
  gridfins: boolean
  legs: boolean
  reused: boolean
  landing_attempt: boolean
  landing_success: boolean
  landing_type: string
  landpad: string
}
