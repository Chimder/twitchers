import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { TwitchPlayer } from "react-twitch-embed";
import s from "../Streamer.module.scss";
import { getCurrentStreamByUserId, getUserById } from "@/shared/api/axios";

export const StreamerInfo = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: user, isFetching: isFetchingUser } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => getUserById(id),
    refetchOnWindowFocus: false,
  });

  const { data: currentStream, isFetching: isFetchingStream } = useQuery({
    queryKey: ["getCurrentStream"],
    queryFn: async () => getCurrentStreamByUserId(id),
    refetchOnWindowFocus: false,
  });

  if (!user && !isFetchingUser && !isFetchingStream) {
    sessionStorage.setItem("userNotFound", "true");
    navigate("/");
  }
  return (
    <>
      <section className={s.streamer}>
        <div className={s.streamer_logo}>
          <img src={user?.profile_image_url} alt='' />
          <div className={s.streamer_name}>{user?.display_name}</div>
        </div>
        <div
          className={s.twitch_player}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {currentStream && !isModalOpen ? (
            <div className={s.twitch_player2}>
              <TwitchPlayer
                className={s.twitch_player_main}
                channel={user?.display_name}
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
                className={s.twitch_player_main_2}
                channel={user?.display_name}
                // width={1200}
                // height={700}
                parent={["localhost", "twitchers.vercel.app"]}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
