'use client';

import { Box, Text, Divider } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FOOTER_TEXTS } from '../../config/constants';
import useIsMobile from '@/hooks/useIsMobile';

const Footer = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Box component="footer" className={styles.footer} data-testid="footer">
        <Box className={styles.container} data-testid="footer-container">
          {/* Centered Powered by */}
          <Box
            className={styles.poweredByContainer}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
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
          <Box className={styles.bottomContainer}>
            {/* Centered Links */}
            <Box className={styles.linksContainer}>
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
            <Box
              className={styles.socialContainer}
              data-testid="footer-social-container"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingLeft: '16px',
                marginBottom: '12px',
              }}
            >
              <Box
                className={styles.socialIconsContainer}
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
                    width={10}
                    height={10}
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
                    width={10}
                    height={10}
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
                    width={10}
                    height={10}
                  />
                </Link>
              </Box>
            </Box>
          </Box>

          <Box
            className={styles.copyrightContainer}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '21px',
            }}
          >
            <Divider className={styles.divider} data-testid="footer-divider" />
            <Text
              className={styles.copyright}
              data-testid="footer-copyright"
              style={{ textAlign: 'center', margin: '8px 0 0 0' }}
            >
              {`${FOOTER_TEXTS.COPYRIGHT} | ${FOOTER_TEXTS.RIGHTS_RESERVED}`}
            </Text>
            <Text
              className={styles.copyright}
              style={{ textAlign: 'center', margin: 0 }}
            >
              {FOOTER_TEXTS.PRIVACY} | {FOOTER_TEXTS.TERMS}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  // Desktop (default)
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
