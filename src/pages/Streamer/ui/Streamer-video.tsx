import React from "react";
import { Link } from "react-router-dom";
import s from "../Streamer.module.scss";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { User, Video } from "@/shared/api/types";

interface UserProps {
  user: User;
  videos: Video[];
}

export const StreamerVideos = ({ ...user }: UserProps) => {
  return (
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
            {/* <div>{video.thumbnail_url}</div> */}
          </Link>
        ))}
      </div>
    </section>
  );
};
