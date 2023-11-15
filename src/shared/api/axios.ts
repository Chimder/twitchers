/* eslint-disable prefer-const */
import axios, { AxiosResponse } from "axios";
import {
  AccessTokenResponse,
  Channel,
  SearchChannelsResponse,
  User,
  Video,
} from "./types";

const clientId = import.meta.env.VITE_CLIENT_ID;
let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

export async function getAccessToken(): Promise<string> {
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }
  try {
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
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

    accessToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000;

    console.log(response.data, "token");
    console.log(tokenExpirationTime, "Toitressfs");

    return accessToken;
  } catch (error) {
    console.error(
      "Ошибка при получении токена доступа:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function searchChannels(searchQuery: string): Promise<Channel[]> {
  const accessToken = await getAccessToken();
  try {
    const response: AxiosResponse<SearchChannelsResponse> = await axios.get(
      "https://api.twitch.tv/helix/search/channels",
      {
        params: {
          query: searchQuery,
          first: 5,
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

export async function getUserAndVideosById(
  userId: string
): Promise<{ user: User; videos: Video[] }> {
  const accessToken = await getAccessToken();
  try {
    const userResponse = await axios.get("https://api.twitch.tv/helix/users", {
      params: {
        id: userId,
      },
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const videosResponse = await axios.get(
      "https://api.twitch.tv/helix/videos",
      {
        params: {
          user_id: userId,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = userResponse.data.data[0];
    const videos = videosResponse.data.data;

    return { user, videos };
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentStreamByUserId(
  userId: string
): Promise<any | null> {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get("https://api.twitch.tv/helix/streams", {
      params: {
        user_id: userId,
      },
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const stream = response.data.data[0];
    return stream || null;
  } catch (error) {
    console.error(
      "Ошибка при выполнении запроса к Twitch API:",
      error.response?.data || error.message
    );
    throw error;
  }
}
