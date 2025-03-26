'use client';

import { Box, Text, Divider } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Box className={styles.container}>
        <Box className={styles.gridContainer}>
          {/* Left: Powered by */}
          <Box className={styles.poweredByContainer}>
            <Text className={styles.poweredByText}>Powered by</Text>
            <Text className={styles.smartyText}>SMARTY</Text>
          </Box>

          {/* Center: Links */}
          <Box className={styles.linksContainer}>
            <Link href="#" className={styles.link}>
              <Text>Acerca de Smarty</Text>
            </Link>
            <Link href="#" className={styles.link}>
              <Text>Contacto</Text>
            </Link>
          </Box>
        </Box>
        <Divider className={styles.divider} />
        <Box className={styles.socialContainer}>
          <Link href="#" style={{ textDecoration: 'none' }}>
            <Image
              src="/images/social/facebook.svg"
              alt="Facebook"
              width={16}
              height={16}
            />
          </Link>
          <Link href="#" style={{ textDecoration: 'none' }}>
            <Image
              src="/images/social/twitter.svg"
              alt="Twitter"
              width={16}
              height={16}
            />
          </Link>
          <Link href="#" style={{ textDecoration: 'none' }}>
            <Image
              src="/images/social/instagram.svg"
              alt="Instagram"
              width={16}
              height={16}
            />
          </Link>
        </Box>
        <Text className={styles.copyright}>
          Copyright 2023 smarty.com | Todos los derechos reservados | Política
          de privacidad | Términos y Condiciones de Uso
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
