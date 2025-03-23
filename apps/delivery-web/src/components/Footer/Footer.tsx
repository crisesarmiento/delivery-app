'use client';

import { Box, Text, Divider } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        width: '100%',
        background: '#F8FAFC',
        border: '1px solid #F5FAFE',
        boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Box style={{ maxWidth: '1281px', margin: '0 auto', padding: '0 78px' }}>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '24px 0',
          }}
        >
          {/* Left: Powered by */}
          <Box style={{ justifySelf: 'start' }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#000',
              }}
            >
              Powered by
            </Text>
            <Text
              style={{
                marginTop: '6px',
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '30px',
                color: '#000',
              }}
            >
              SMARTY
            </Text>
          </Box>

          {/* Center: Links */}
          <Box
            style={{
              justifySelf: 'center',
              display: 'flex',
              gap: '30px',
            }}
          >
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#000',
                }}
              >
                Acerca de Smarty
              </Text>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#000',
                }}
              >
                Contacto
              </Text>
            </Link>
          </Box>
        </Box>
        <Divider style={{ borderColor: '#939393', borderWidth: '0.7px' }} />
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '33px',
            gap: '24px',
            marginTop: '12px',
          }}
        >
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
        <Text
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '20px',
            color: '#939393',
            textAlign: 'center',
            padding: '12px 0',
          }}
        >
          Copyright 2023 smarty.com | Todos los derechos reservados | Política
          de privacidad | Términos y Condiciones de Uso
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
