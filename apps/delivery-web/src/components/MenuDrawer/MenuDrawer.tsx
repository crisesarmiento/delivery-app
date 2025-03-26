'use client';

import { Drawer, Box, Text, UnstyledButton } from '@mantine/core';
import {
  IconBuildingStore,
  IconUsers,
  IconPhoneCall,
  IconX,
} from '@tabler/icons-react';

// Constants for text
const MENU_TEXTS = {
  TITLE: 'Menú',
  BRANCHES: 'Sucursales',
  ABOUT_US: 'Acerca de Nosotros',
  CONTACT: 'Contacto',
};

interface MenuDrawerProps {
  opened: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export function MenuDrawer({ opened, onClose, onNavigate }: MenuDrawerProps) {
  const handleNavigation = (route: string) => {
    onNavigate(route);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="left"
      withCloseButton={false}
      size="301px"
      zIndex={2000}
      styles={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1999,
        },
        inner: {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2000,
        },
        content: {
          backgroundColor: '#000000',
          boxShadow:
            '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)',
          height: '100vh',
          padding: 0,
          width: '301px',
          border: '1px solid #303030',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
        },
        header: {
          display: 'none',
        },
        body: {
          padding: 0,
          height: '100%',
        },
      }}
    >
      <Box style={{ position: 'relative', height: '100%', width: '100%' }}>
        {/* Menu title */}
        <Text
          style={{
            position: 'absolute',
            width: '37px',
            height: '20px',
            left: '63px',
            top: '26px',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#FFFFFF',
          }}
        >
          {MENU_TEXTS.TITLE}
        </Text>

        {/* Close icon */}
        <Box
          style={{
            position: 'absolute',
            width: '26px',
            height: '26px',
            left: '14px',
            top: '23px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <IconX
            size={26}
            style={{
              position: 'relative',
              color: '#FFFFFF',
            }}
            stroke={2}
          />
        </Box>

        {/* Menu Items Container */}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            position: 'absolute',
            width: '263px',
            height: '184px',
            left: '19px',
            top: '86px',
            gap: '8px',
          }}
        >
          {/* Branches Button (active/highlighted) */}
          <UnstyledButton
            onClick={() => handleNavigation('/branches')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px',
              gap: '8px',
              width: '263px',
              height: '46px',
              background: '#B3FF00',
              borderRadius: '4px',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0,
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                width: '26px',
                height: '26px',
                background: '#000000',
                borderRadius: '4px',
                flex: 'none',
                order: 0,
                flexGrow: 0,
              }}
            >
              <IconBuildingStore
                size={18}
                style={{
                  color: '#B3FF00',
                  width: '18px',
                  height: '18px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                }}
              />
            </Box>
            <Text
              style={{
                width: 'auto',
                height: '20px',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#000000',
                flex: 'none',
                order: 1,
                flexGrow: 0,
              }}
            >
              {MENU_TEXTS.BRANCHES}
            </Text>
          </UnstyledButton>

          {/* About Us Button */}
          <UnstyledButton
            onClick={() => handleNavigation('/about')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px',
              gap: '8px',
              width: '263px',
              height: '46px',
              borderRadius: '4px',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0,
              background: 'transparent',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                width: '26px',
                height: '26px',
                borderRadius: '4px',
                flex: 'none',
                order: 0,
                flexGrow: 0,
              }}
            >
              <IconUsers
                size={18}
                style={{
                  color: '#FFFFFF',
                  width: '18px',
                  height: '18px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                }}
              />
            </Box>
            <Text
              style={{
                width: 'auto',
                height: '20px',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#FFFFFF',
                flex: 'none',
                order: 1,
                flexGrow: 0,
              }}
            >
              {MENU_TEXTS.ABOUT_US}
            </Text>
          </UnstyledButton>

          {/* Contact Button */}
          <UnstyledButton
            onClick={() => handleNavigation('/contact')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px',
              gap: '8px',
              width: '263px',
              height: '46px',
              borderRadius: '4px',
              flex: 'none',
              order: 2,
              alignSelf: 'stretch',
              flexGrow: 0,
              background: 'transparent',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                width: '26px',
                height: '26px',
                borderRadius: '4px',
                flex: 'none',
                order: 0,
                flexGrow: 0,
              }}
            >
              <IconPhoneCall
                size={18}
                style={{
                  color: '#FFFFFF',
                  width: '18px',
                  height: '18px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                }}
              />
            </Box>
            <Text
              style={{
                width: 'auto',
                height: '20px',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#FFFFFF',
                flex: 'none',
                order: 1,
                flexGrow: 0,
              }}
            >
              {MENU_TEXTS.CONTACT}
            </Text>
          </UnstyledButton>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MenuDrawer;
