export interface SearchChannelsResponse {
  data: Channel[];
}
export interface AccessTokenResponse {
  access_token: string;
}

export interface Channel {
  id: string;
  display_name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  display_name: string;
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
  // Добавьте другие поля, если они вам нужны
}

export interface GetVideosResponse {
  videos: Video[];
}