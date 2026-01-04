/*
 * 공통 해더
 */

import React from 'react';
import { logoSvg, logoMobileSvg } from '@/assets/images/logo/logo';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles}>
      <nav>
        <a href="/">
          <picture>
            {/* 모바일 */}
            <source
              srcSet={logoMobileSvg}
              media="(max-width: 743px)"
              alt="판다마켓_로고_모바일 버전"
            />

            {/* 기본 (PC), 태블릿 */}
            <img src={logoSvg} alt="판다마켓_로고" />
          </picture>
        </a>
        <ul>
          <li>자유게시판</li>
          <li>중고마켓</li>
        </ul>
      </nav>
      <a
        href="https://ys-sprint-pandamarket.netlify.app/login"
        className={styles.login}
      >
        로그인
      </a>
    </header>
  );
};

export default Header;
