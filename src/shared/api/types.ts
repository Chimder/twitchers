export interface SearchChannelsResponse {
  data: Channel[];
}
export interface AccessTokenResponse {
  access_token: string;
  expires_in?: number;
}

export interface Channel {
  id: string;
  display_name: string;
  thumbnail_url: string;
  broadcaster_language: string;
  is_live: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  display_name: string;
  broadcaster_type: string;
  created_at: string;
  description: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: string;
}

export interface SearchChannelsResponse {
  accessToken: string;
  channels: Channel[];
}

export interface SearchCategoriesResponse {
  categories: Category[];
}

export interface SearchUsersResponse {
  users: User[];
}

export interface GetUserByIdResponse {
  user: User;
}

export interface Video {
  id: string;
  title: string;
  created_at: string;
  description: string;
  duration: string;
  language: string;
  muted_segments: string;
  published_at: string;
  stream_id: string;
  thumbnail_url: string;
  type: string;
  url: string;
  user_id: string;
  user_login: string;
  user_name: string;
  view_count: string;
  viewable: string;
}
