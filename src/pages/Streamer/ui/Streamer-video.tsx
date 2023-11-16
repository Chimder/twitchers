import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useParams } from "react-router-dom";
import s from "../Streamer.module.scss";
import { getVideosByUserId } from "@/shared/api/axios";
import { TwitchVideo } from "@/shared/api/types";

export const StreamerVideos = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [videoId, setVideoId] = React.useState<number | null>();

  const fetchVideos = async ({ pageParam = null }: { pageParam?: string }) => {
    const result = await getVideosByUserId(id, pageParam);
    return result;
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    { videos: TwitchVideo[]; nextCursor: string | null },
    Error
  >({
    queryKey: ["getVideosByUserId", id],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
    
  });

  const openModal = (id) => {
    setVideoId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setVideoId(null);
    setIsModalOpen(false);
  };
  if (!data || data.pages.length === 0) {
    return <div>У пользователя нет видео.</div>;
  }

  const videos = data.pages.flatMap((page) => page.videos);

  return (
    <section className={s.streamer_video}>
      <div className={s.noise}></div>
      <div className={s.figure1}></div>
      <div className={s.figure2}></div>
      <div className={s.video_grid}>
        {videos?.map((video) => (
          <div
            key={video.id}
            onClick={() => openModal(video.id)}
            className={s.vod_container}
          >
            <span className={s.vod_img}>
              <img
                src={video.thumbnail_url
                  .replace("%{width}", "320")
                  .replace("%{height}", "180")}
                alt=''
              />
            </span>
            <div className={s.vod_info}>
              <div className={s.vod_info_top}>
                <div className={s.vod_view}>
                  <MdOutlineRemoveRedEye />
                  <span>{video.view_count}</span>
                </div>
                <div className={s.vod_duration}>
                  <span>
                    {video.duration
                      .split(/[hms]/)
                      .filter(Boolean)
                      .map((tp) => tp.padStart(2, "0"))
                      .join(":")}
                  </span>
                </div>
              </div>
              <div className={s.vod_info_bottom}>
                <div className={s.vod_info_container}>
                  <div className={s.vod_user}>{video.user_login}</div>
                  <div className={s.vod_title}>{video.title}</div>
                  <div className={s.vod_day}>1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          Получить следующие 20 видео
        </button>
      )}
      {isModalOpen && (
        <div className={s.modal_overlay}>
          <div className={s.modal_content}>
            <div className={s.close_button} onClick={() => closeModal()}></div>
            <iframe
              className={s.twitch_iframe}
              src={`https://player.twitch.tv/?video=v${videoId}&parent=localhost&parent=twitchers.vercel.app&autoplay=false`}
              width='1280'
              height='720'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
