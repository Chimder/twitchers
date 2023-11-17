import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { BiError } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import s from "./Home.module.scss";
import { searchChannels } from "@/shared/api/axios";

export const Home = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 400);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    const userNotFound = sessionStorage.getItem("userNotFound");
    if (userNotFound) {
      setShowNotification(true);

      sessionStorage.removeItem("userNotFound");

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, []);
  console.log(showNotification);

  const {
    data: searchResults,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchResults", debouncedSearchQuery],
    queryFn: async () => searchChannels(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
  });

  useEffect(() => {
    if (debouncedSearchQuery) {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);

  return (
    <article className={s.home_container}>
      <div className={s.noise}></div>
      <div className={s.figure3}></div>
      <div className={s.figure4}></div>
      <header className={s.home_header}>
        <div className={s.main_h1}>
          <h1>
            Discover Twitch <br />
            Vods
          </h1>
          <p>
            Watch twitch past broadcasts streams  Start by
            <br />
            Typing twitch username or game title...
          </p>
        </div>
        <div className={s.input_container}>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <div className={s.search_container}>
        {searchQuery && isFetching ? (
          <div className={s.loader}>
            <FaSpinner className={s.spinner} />
          </div>
        ) : (
          <div className={s.search}>
            {searchResults?.map((channel) => (
              <div
                className={s.channel}
                key={channel.id}
                onClick={() => navigate(`/streamer/${channel.id}`)}
              >
                <div className={s.channel_info}>
                  <img src={channel.thumbnail_url} alt='' />
                  <span>{channel.display_name}</span>
                  {channel.is_live && <GoDotFill />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showNotification && (
        <div className={s.notification}>
          <div className={s.notification_constainer}>
            <BiError />
            <div className={s.alert_message}>User Not Found</div>
          </div>
        </div>
      )}
    </article>
  );
};
