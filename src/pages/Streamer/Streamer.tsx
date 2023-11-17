import s from "./Streamer.module.scss";
import { StreamerInfo } from "./ui/Streamer-info";
import { StreamerVideos } from "./ui/Streamer-video";

export const Streamer = () => {
  return (
    <article className={s.streamer_container}>
      <StreamerInfo />
      <StreamerVideos />
    </article>
  );
};
