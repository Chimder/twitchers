import clsx from "clsx";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import s from "./Streamer.module.scss";
import { getAccessToken, getUserAndVideosById } from "@/shared/api/axios";

export const Streamer = () => {
  const { id } = useParams();

  const { data: accessToken, isFetching: isFetchingToken } = useQuery<string>({
    queryKey: ["accessToken"],
    queryFn: async () => getAccessToken(),
  });

  const {
    data: user,
    refetch: refetchUserAndVideos,
    isFetching: isFetchingUserAndVideos,
  } = useQuery({
    queryKey: ["getUserAndVideosById", id],
    queryFn: async () => getUserAndVideosById(accessToken, id),
    refetchOnWindowFocus: false,
  });

  console.log(user, "===");

  if (isFetchingToken || isFetchingUserAndVideos) {
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
      <section className={s.streamer_info}></section>
      <section className={s.streamer_video}>
        <div className={s.video_grid}>
          {user.videos?.map((video) => (
            <Link className={s.vod_container} to='#'>
              <span className={s.vod_img}>
                <img
                  src={video.thumbnail_url
                    .replace("%{width}", "320")
                    .replace("%{height}", "180")}
                  // decoding='async'
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
                    <span>{video.duration}</span>
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
              {/* <div>{video.thumbnail_url}</div> */}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};
