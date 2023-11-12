import axios, { AxiosResponse } from "axios";
import {
  AccessTokenResponse,
  Category,
  Channel,
  GetUserByIdResponse,
  GetVideosResponse,
  SearchCategoriesResponse,
  SearchChannelsResponse,
  User,
  Video,
} from "./types";

const clientId = "s8sb9ppib5k1rvmrhae8twgnoyttbv";

export async function getAccessToken(): Promise<string> {
  try {
    const clientSecret = "p00lacywj1iqv9q3fu9amito3ueu4z";

    const response: AxiosResponse<AccessTokenResponse> = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Ошибка при получении токена доступа:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function searchChannels(
  accessToken: string,
  searchQuery: string
): Promise<Channel[]> {
  try {
    const response: AxiosResponse<SearchChannelsResponse> = await axios.get(
      "https://api.twitch.tv/helix/search/channels",
      {
        params: {
          query: searchQuery,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Ошибка при выполнении запроса к Twitch API:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function searchCategories(
  accessToken: string,
  searchQuery: string
): Promise<SearchCategoriesResponse> {
  try {
    const response: AxiosResponse<{ data: Category[] }> = await axios.get(
      "https://api.twitch.tv/helix/search/categories",
      {
        params: {
          query: searchQuery,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { categories: response.data.data };
  } catch (error) {
    console.error(
      "Ошибка при выполнении запроса к Twitch API:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getUserById(
  accessToken: string,
  userId: string
): Promise<GetUserByIdResponse> {
  try {
    const response: AxiosResponse<{ data: User[] }> = await axios.get(
      "https://api.twitch.tv/helix/users",
      {
        params: {
          id: userId,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { user: response.data.data[0] };
  } catch (error) {
    console.error(
      "Ошибка при выполнении запроса к Twitch API:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getVideosByUserId(
  accessToken: string
): Promise<GetVideosResponse> {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/videos", {
      params: {
        user_id: "86277097",
      },
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Ошибка при выполнении запроса к Twitch API:",
      error.response?.data || error.message
    );
    throw error;
  }
}
