import React from "react";
import s from "./Header.module.scss";
import clsx from "clsx";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.left}>
          <Link to='/'>
            <img
              src='https://cdn.thegameawards.com//frontend/svgs/tga_icon_2023.svg'
              alt=''
            />
          </Link>
          <div className={clsx(s.news, s.header_word)}>NEWS</div>
          <div className={clsx(s.about, s.header_word)}>ABOUT</div>
          <div className={clsx(s.watch, s.header_word)}>WATCH</div>
        </div>
        <div className={s.right}>
          <div className={clsx(s.sing_in, s.header_word)}>SING IN</div>
          <LuLogIn />
        </div>
      </div>
    </header>
  );
};
