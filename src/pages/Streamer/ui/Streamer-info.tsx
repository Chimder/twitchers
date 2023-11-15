import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TwitchPlayer } from "react-twitch-embed";
import s from "../Streamer.module.scss";
import { getCurrentStreamByUserId } from "@/shared/api/axios";
import { HiOutlineStatusOffline } from "react-icons/hi";

export const StreamerInfo = ({ ...user }) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: currentStream, isFetching: isFetchingStream } = useQuery({
    queryKey: ["getCurrentStreamByUserId", id],
    queryFn: async () => getCurrentStreamByUserId(id),
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <section className={s.streamer}>
        <div className={s.streamer_logo}>
          <img src={user.user.profile_image_url} alt='' />
          <div className={s.streamer_name}>{user.user.display_name}</div>
        </div>
        <div className={s.streamer_info}>
          <div className={s.streamer_info_container}>
            <div className={s.streamer_joined}>
              <span>Joined</span>
              <span>
                {new Date(user.user.created_at).toISOString().split("T")[0]}
              </span>
            </div>
            <div className={s.streamer_joined}>
              <span>Language</span>
              <span>{user.videos[0]?.language.toUpperCase() || ""}</span>
            </div>
            <div className={s.streamer_description}>
              {user.user.description}
            </div>
          </div>
        </div>
        <div
          className={s.twitch_player}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {currentStream && !isModalOpen ? (
            <div className={s.twitch_player2}>
              <TwitchPlayer
                channel={user.user.display_name}
                width={500}
                height={360}
                parent={["localhost", "twitchers.vercel.app"]}
              />
            </div>
          ) : (
            <HiOutlineStatusOffline className={s.twitch_offline} />
          )}
        </div>
      </section>
      {isModalOpen && currentStream && (
        <div className={s.modal_overlay}>
          <div className={s.modal_content}>
            <div
              className={s.close_button}
              onClick={() => setIsModalOpen(false)}
            ></div>
            {currentStream && (
              <TwitchPlayer
                channel={user.user.display_name}
                width={1200}
                height={700}
                parent={["localhost", "twitchers.vercel.app"]}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
