import React, { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import s from "./Home.module.scss";
import { searchChannels } from "@/shared/api/axios";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  const { data: searchResults, refetch } = useQuery({
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
            Vods and Clips
          </h1>
          <p>
            Watch twitch past broadcasts streams or save twitch clips Start by
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
        {searchQuery && (
          <div className={s.search}>
            {searchResults?.map((channel) => (
              <Link
                to={`streamer/${channel.id}`}
                className={s.channel}
                key={channel.id}
              >
                <div className={s.channel_info}>
                  <img src={channel.thumbnail_url} alt='' />
                  <span>{channel.display_name}</span>
                  {channel.is_live && <GoDotFill />}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
