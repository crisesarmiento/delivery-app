'use client';

import { Box, Text, Divider } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

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
              Powered by
            </Text>
            <Text
              className={styles.smartyText}
              data-testid="footer-smarty-text"
            >
              SMARTY
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
              <Text>Acerca de Smarty</Text>
            </Link>
            <Link
              href="#"
              className={styles.link}
              data-testid="footer-link-contact"
            >
              <Text>Contacto</Text>
            </Link>
          </Box>
        </Box>
        <Divider className={styles.divider} data-testid="footer-divider" />
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
        <Text className={styles.copyright} data-testid="footer-copyright">
          Copyright 2023 smarty.com | Todos los derechos reservados | Política
          de privacidad | Términos y Condiciones de Uso
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
