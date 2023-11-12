import React from "react";
import { useQuery } from "@tanstack/react-query";
// import s from "./Home.module.scss";
import {
  getAccessToken,
  getUserById,
  getVideosByUserId,
  searchChannels,
} from "../../shared/api/axios";

export function Home() {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");

  // Используем хук useQuery для запроса токена
  const { data: accessToken } = useQuery<string>({
    queryKey: ["accessToken"],
    queryFn: async () => getAccessToken(),
  });

  // Используем хук useQuery для запроса каналов
  const { data: searchResults, refetch } = useQuery({
    queryKey: ["searchResults"],
    queryFn: async () => searchChannels(accessToken, searchQuery),
    enabled: !!searchQuery,
  });

  // const { data: userByIdResult, refetch: refetchUserById } = useQuery({
  //   queryKey: ["getUserById"],
  //   queryFn: async () => getUserById(accessToken, userId),
  //   enabled: !!userId,
  // });

  const { data: userVideo } = useQuery({
    queryKey: ["getUserById"],
    queryFn: async () => getVideosByUserId(accessToken),
    // enabled: !!userId,
  });
  console.log(userVideo, "=====");

  React.useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  return (
    <>
      <div>
        <h1>Поиск каналов на Twitch</h1>
        <input
          type='text'
          placeholder='Введите запрос'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {searchResults?.map((channel) => (
            <li key={channel.id}>
              <p>Имя канала: {channel.display_name}</p>
              <p>ID канала: {channel.id}</p>
            </li>
          ))}
        </ul>

        <p>--------------------------</p>
        <input
          type='text'
          placeholder='Введите ID пользователя'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <h1>Twitch Stream</h1>
        <iframe
          src='https://player.twitch.tv/?v1972835952'
          height='1000'
          width='1000'
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
