import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import s from "./Streamer.module.scss";
import { StreamerVideos } from "./ui/Streamer-video";
import { getUserAndVideosById } from "@/shared/api/axios";
import { StreamerInfo } from "./ui/Streamer-info";

export const Streamer = () => {
  const { id } = useParams();

  const { data: user, isFetching: isFetchingUserAndVideos } = useQuery({
    queryKey: ["getUserAndVideosById", id],
    queryFn: async () => getUserAndVideosById(id),
    refetchOnWindowFocus: false,
  });

  console.log(user, "===");

  if (isFetchingUserAndVideos) {
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
  return (
    <article className={s.streamer_container}>
      <StreamerInfo {...user} />
      <StreamerVideos {...user} />
    </article>
  );
};
