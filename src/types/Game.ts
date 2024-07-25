export interface Game {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  released: string;
  description: string;
  metacritic: number;
  ratings: Rating[];
  publishers: Publisher[];
  developers: Developer[];
  background_image: string;
  rating: number;
  website: string;
  updated: string;
  tba: boolean;
  metacritic_platforms: MetacriticPlatform[];
  parent_platforms: ParentPlatform[];
  stores: Store[];
  genres: Genre[];
  tags: Tag[];
  esrb_rating: EsrbRating;
  description_raw: string;
  background_image_additional: string;
  rating_top: number;
  platforms: Platform[];
  reactions: Record<number, number>;
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  clip: any;
}

export interface Screenshots {
  id: number,
  image: string;
}

export interface GameStore {
  id: number;
  game_id: number;
  store_id: number;
  url: string;
}

export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Franchise {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  parent_platforms: ParentPlatform[];
}

//types for appwrite collections
//list collection
export interface List {
  $id: string;
  // userId: string;
  listName: string;
  items: Item[];
}

//items collection 
export interface Item {
  // $id: string;
  // listId: string;
  gameId: string;
  gameName: string;
  // addedAt: string;
}

export interface Additions {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  parent_platforms: ParentPlatform[];
}

export interface BaseGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  parent_platforms: ParentPlatform[];
}

export interface SeriesGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  parent_platforms: ParentPlatform[];
}

export interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: string | null;
    year_start: string | null;
    games_count: number;
    image_background: string;
  };
  released_at: string;
  requirements: {
    minimum?: string;
    recommended?: string;
  };
}

export interface Store {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}


export interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}
