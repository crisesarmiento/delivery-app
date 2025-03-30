'use client';

import {
  Box,
  Container,
  Title,
  Text,
  Stack,
  Button,
  Group,
} from '@mantine/core';
import { HERO_BANNER_TEXTS } from '../../config/constants';

interface HeroBannerProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  height?: number;
  onButtonClick?: () => void;
}

export function HeroBanner({
  imageUrl,
  title = HERO_BANNER_TEXTS.DEFAULT_TITLE,
  subtitle = HERO_BANNER_TEXTS.DEFAULT_SUBTITLE,
  buttonText = HERO_BANNER_TEXTS.DEFAULT_BUTTON_TEXT,
  height = 500,
  onButtonClick,
}: HeroBannerProps) {
  return (
    <Box
      style={{
        position: 'relative',
        height: height,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Dark Overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Container
        size="lg"
        style={{
          position: 'relative',
          height: '100%',
          zIndex: 3,
        }}
      >
        <Stack
          justify="center"
          style={{
            height: '100%',
            color: 'white',
            maxWidth: '600px',
            gap: '1.5rem',
          }}
        >
          {title && (
            <Title
              order={1}
              size="2.5rem"
              style={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {title}
            </Title>
          )}

          {subtitle && (
            <Text
              size="xl"
              style={{
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}
            >
              {subtitle}
            </Text>
          )}

          <Group mt="md">
            <Button
              size="lg"
              radius="md"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.75rem 2rem',
                fontWeight: 600,
              }}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroBanner;
