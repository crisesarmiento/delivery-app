'use client';

import { Box, Text, Divider } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FOOTER_TEXTS } from '../../config/constants';

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer} data-testid="footer">
      <Box className={styles.container} data-testid="footer-container">
        <Box className={styles.gridContainer} data-testid="footer-grid">
          {/* Left: Powered by */}
          <Box
            className={styles.poweredByContainer}
            data-testid="footer-powered-by"
          >
            <Text
              className={styles.poweredByText}
              data-testid="footer-powered-by-text"
            >
              {FOOTER_TEXTS.POWERED_BY}
            </Text>
            <Text
              className={styles.smartyText}
              data-testid="footer-smarty-text"
            >
              {FOOTER_TEXTS.SMARTY}
            </Text>
          </Box>

          {/* Center: Links */}
          <Box
            className={styles.linksContainer}
            data-testid="footer-links-container"
          >
            <Link
              href="#"
              className={styles.link}
              data-testid="footer-link-about"
            >
              <Text>{FOOTER_TEXTS.ABOUT_SMARTY}</Text>
            </Link>
            <Link
              href="#"
              className={styles.link}
              data-testid="footer-link-contact"
            >
              <Text>{FOOTER_TEXTS.CONTACT}</Text>
            </Link>
          </Box>
        </Box>
        <Divider className={styles.divider} data-testid="footer-divider" />
        <Box className={styles.bottomContainer}>
          <Box
            className={styles.socialContainer}
            data-testid="footer-social-container"
          >
            <Link
              href="#"
              style={{ textDecoration: 'none' }}
              data-testid="footer-social-facebook"
            >
              <Image
                src="/images/social/facebook.svg"
                alt="Facebook"
                width={16}
                height={16}
              />
            </Link>
            <Link
              href="#"
              style={{ textDecoration: 'none' }}
              data-testid="footer-social-twitter"
            >
              <Image
                src="/images/social/twitter.svg"
                alt="Twitter"
                width={16}
                height={16}
              />
            </Link>
            <Link
              href="#"
              style={{ textDecoration: 'none' }}
              data-testid="footer-social-instagram"
            >
              <Image
                src="/images/social/instagram.svg"
                alt="Instagram"
                width={16}
                height={16}
              />
            </Link>
          </Box>
          <Box className={styles.copyrightContainer}>
            <Text className={styles.copyright} data-testid="footer-copyright">
              {FOOTER_TEXTS.COPYRIGHT}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
