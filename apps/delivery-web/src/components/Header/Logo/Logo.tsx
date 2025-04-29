import { Text } from '@mantine/core';
import { HEADER_TEXTS } from '@/config/constants';
import styles from './Logo.module.css';

const Logo = () => (
  <Text className={styles.logo}>{HEADER_TEXTS.LOGO_TEXT}</Text>
);

export default Logo;
