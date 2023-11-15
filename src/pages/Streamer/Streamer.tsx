import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TwitchPlayer } from "react-twitch-embed";
import s from "./Streamer.module.scss";
import { StreamerVideos } from "./ui/Streamer-video";
import {
  getCurrentStreamByUserId,
  getUserAndVideosById,
} from "@/shared/api/axios";

export const Streamer = () => {
  const { id } = useParams();

  const { data: user, isFetching: isFetchingUserAndVideos } = useQuery({
    queryKey: ["getUserAndVideosById", id],
    queryFn: async () => getUserAndVideosById(id),
    refetchOnWindowFocus: false,
  });

  const { data: currentStream, isFetching: isFetchingStream } = useQuery({
    queryKey: ["getCurrentStreamByUserId", id],
    queryFn: async () => getCurrentStreamByUserId(id),
    refetchOnWindowFocus: false,
  });

  console.log(user, "===");
  console.log(currentStream, "stream");

  if (isFetchingUserAndVideos || isFetchingStream) {
    return (
      <div className={s.loading}>
        <div className={s.ldio}>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <div>Пользователь не найден.</div>;
  }
  if (!user.videos || user.videos.length === 0) {
    return <div>У пользователя нет видео.</div>;
  }
  return (
    <article className={s.streamer_container}>
      <section className={s.streamer}>
        <div className={s.streamer_logo}>
          <img src={user.user.profile_image_url} alt='' />
        </div>
        <div className={s.streamer_info}>
          <div>
            <div className={s.streamer_name}>{user.user.display_name}</div>
            <div className={s.streamer_joined}>
              <span>Joined</span>
              <span>
                {new Date(user.user.created_at).toISOString().split("T")[0]}
              </span>
            </div>
            <div className={s.streamer_lang}>
              <span>Language</span>
              <span>{user.videos[0]?.language || ""}</span>
            </div>
            <div className={s.streamer_description}>
              {user.user.description}
            </div>
            <div className={s.streamer_online}>
              {!currentStream ? "offline" : "online"}
            </div>
          </div>
        </div>
        {currentStream && (
          <div className={s.twitch_player}>
            <TwitchPlayer
              channel={user.user.display_name}
              width={500}
              height={360}
              parent={["localhost", "twitchers.vercel.app"]}
            />
          </div>
        )}
      </section>
      {/* <StreamerVideos {...user} /> */}
    </article>
  );
};
