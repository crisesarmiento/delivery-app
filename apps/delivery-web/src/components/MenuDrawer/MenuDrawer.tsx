'use client';

import {
  Drawer,
  Box,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBuildingStore,
  IconUsers,
  IconPhoneCall,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { MENU_TEXTS } from '../../config/constants';
import { CartClearingModal } from '../CartClearingModal/CartClearingModal';
import { useDisclosure } from '@mantine/hooks';
import { useCart } from '@/context/CartContext';
import { MenuDrawerProps } from './types';

export function MenuDrawer({ opened, onClose, onNavigate }: MenuDrawerProps) {
  const theme = useMantineTheme();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [clicked, { close: closeClicked, open: openClicked }] =
    useDisclosure(false);
  const { cartItems } = useCart();

  // Add a class to the body when the drawer is opened to prevent scrolling
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
      // Ensure cart clearing modal is closed when drawer is closed
      closeClicked();
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
      closeClicked();
    };
  }, [opened, closeClicked]);

  const handleClose = () => {
    onClose();
    closeClicked();
  };

  const handleBranchesClick = () => {
    if (cartItems.length > 0) {
      openClicked();
    } else {
      onNavigate('/');
      handleClose();
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={handleClose}
        position="left"
        withCloseButton={false}
        size="301px"
        zIndex={2000}
        styles={{
          overlay: {
            backgroundColor: 'rgba(66, 61, 61, 0.8)',
            zIndex: 1999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            userSelect: 'none',
            pointerEvents: 'auto',
          },
          root: {
            position: 'relative',
            '&[dataOpened]': {
              '& + *': {
                pointerEvents: 'none',
                userSelect: 'none',
              },
            },
          },
          inner: {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2000,
          },
          content: {
            backgroundColor: theme.colors.neutral[9],
            boxShadow: theme.shadows.md,
            height: '100vh',
            padding: 0,
            width: '301px',
            border: `1px solid ${theme.colors.neutral[7]}`,
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
              onClick={handleBranchesClick}
              onMouseEnter={() => setHoveredItem(0)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '10px',
                gap: '8px',
                width: '263px',
                height: '46px',
                background:
                  hoveredItem === 0 ? theme.colors.action[4] : 'transparent',
                borderRadius: '4px',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0,
                transition: 'background-color 0.2s',
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
                  background:
                    hoveredItem === 0 ? theme.colors.neutral[9] : 'transparent',
                  borderRadius: '4px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                  transition: 'background-color 0.2s',
                }}
              >
                <IconBuildingStore
                  size={18}
                  style={{
                    color:
                      hoveredItem === 0 ? theme.colors.action[4] : '#FFFFFF',
                    width: '18px',
                    height: '18px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                    transition: 'color 0.2s',
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
                  color:
                    hoveredItem === 0 ? theme.colors.neutral[9] : '#FFFFFF',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0,
                  transition: 'color 0.2s',
                }}
              >
                {MENU_TEXTS.BRANCHES}
              </Text>
            </UnstyledButton>

            {/* About Us Button */}
            <UnstyledButton
              onClick={() => onNavigate('/about')}
              onMouseEnter={() => setHoveredItem(1)}
              onMouseLeave={() => setHoveredItem(null)}
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
                background:
                  hoveredItem === 1 ? theme.colors.action[4] : 'transparent',
                transition: 'background-color 0.2s',
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
                  background:
                    hoveredItem === 1 ? theme.colors.neutral[9] : 'transparent',
                  borderRadius: '4px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                  transition: 'background-color 0.2s',
                }}
              >
                <IconUsers
                  size={18}
                  style={{
                    color:
                      hoveredItem === 1 ? theme.colors.action[4] : '#FFFFFF',
                    width: '18px',
                    height: '18px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                    transition: 'color 0.2s',
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
                  color:
                    hoveredItem === 1 ? theme.colors.neutral[9] : '#FFFFFF',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0,
                  transition: 'color 0.2s',
                }}
              >
                {MENU_TEXTS.ABOUT_US}
              </Text>
            </UnstyledButton>

            {/* Contact Button */}
            <UnstyledButton
              onClick={() => onNavigate('/contact')}
              onMouseEnter={() => setHoveredItem(2)}
              onMouseLeave={() => setHoveredItem(null)}
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
                background:
                  hoveredItem === 2 ? theme.colors.action[4] : 'transparent',
                transition: 'background-color 0.2s',
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
                  background:
                    hoveredItem === 2 ? theme.colors.neutral[9] : 'transparent',
                  borderRadius: '4px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                  transition: 'background-color 0.2s',
                }}
              >
                <IconPhoneCall
                  size={18}
                  style={{
                    color:
                      hoveredItem === 2 ? theme.colors.action[4] : '#FFFFFF',
                    width: '18px',
                    height: '18px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                    transition: 'color 0.2s',
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
                  color:
                    hoveredItem === 2 ? theme.colors.neutral[9] : '#FFFFFF',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0,
                  transition: 'color 0.2s',
                }}
              >
                {MENU_TEXTS.CONTACT}
              </Text>
            </UnstyledButton>
          </Box>
        </Box>
      </Drawer>
      {/* Only render CartClearingModal if clicked is true to prevent unnecessary overlay rendering */}
      {clicked && (
        <CartClearingModal
          clicked={clicked}
          onNavigate={onNavigate}
          onClose={closeClicked}
        />
      )}
    </>
  );
}

export default MenuDrawer;
