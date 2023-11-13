import React from "react";
import s from "./Home.module.scss";

export const Home = () => {
  return (
    <article className={s.home_container}>
      <div className={s.figure}></div>
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
          <input type='text'  />
        </div>
      </header>
      <div className={s.search}></div>
    </article>
  );
};
