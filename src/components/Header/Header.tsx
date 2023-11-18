import clsx from "clsx";
import React, { useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
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
        <div className={s.mobile_toggle} onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "≡"}
        </div>
        {isMenuOpen && (
          <div className={s.mobile_container}>
            <div className={s.header_word_mob}>NEWS</div>
            <div className={s.header_word_mob}>ABOUT</div>
            <div className={s.header_word_mob}>WATCH</div>
            <div className={s.right_mob}>
              <div className={s.sing_in_mob}>SING IN</div>
              <LuLogIn />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
