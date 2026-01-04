/*
 * 공통 풋터
 */

import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles}>
      <p>©codeit - 2026</p>
      <ul className={styles.center}>
        <li>
          <a href="/privacy.html">Privacy Policy</a>
        </li>
        <li>
          <a href="/faq.html">FAQ</a>
        </li>
      </ul>

      <ul className={styles.icons}>
        <li className={styles.iconFacebook}>
          <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
            페이스북
          </a>
        </li>
        <li className={styles.iconTwitter}>
          <a href="https://x.com/?lang=ko" target="_blank">
            트위터
          </a>
        </li>
        <li className={styles.iconYoutube}>
          <a
            href="https://www.youtube.com/?hl=ko&gl=KR&app=desktop"
            target="_blank"
          >
            유튜브
          </a>
        </li>
        <li className={styles.iconInstargram}>
          <a href="https://www.instagram.com/" target="_blank">
            인스타그램
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
