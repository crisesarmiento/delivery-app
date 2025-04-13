import { Text, Box, Tabs, ScrollArea } from '@mantine/core';
import styles from './CategoryTabs.module.css';
import { CATEGORY_TEXTS } from '../../config/constants';
import { useEffect, useRef } from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeTab: string;
  onTabChange: (value: string | null) => void;
}

export default function CategoryTabs({
  categories,
  activeTab,
  onTabChange,
}: CategoryTabsProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Scroll the active tab into view when it changes
  useEffect(() => {
    if (activeTabRef.current && scrollAreaRef.current) {
      const tabElement = activeTabRef.current;
      const scrollArea = scrollAreaRef.current;

      // Calculate positions to check if tab is in view
      const tabLeft = tabElement.offsetLeft;
      const tabRight = tabLeft + tabElement.offsetWidth;
      const scrollLeft = scrollArea.scrollLeft;
      const scrollRight = scrollLeft + scrollArea.clientWidth;

      // Log actual height to diagnose rendering issues
      console.log('Tab height:', tabElement.offsetHeight);
      console.log(
        'Tab container height:',
        tabElement.parentElement?.offsetHeight
      );

      // If tab is not fully visible, scroll to make it visible
      if (tabLeft < scrollLeft || tabRight > scrollRight) {
        // Center the tab if possible
        const scrollPosition =
          tabLeft - scrollArea.clientWidth / 2 + tabElement.offsetWidth / 2;
        scrollArea.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }
    }
  }, [activeTab]);

  return (
    <Box data-testid="category-tabs" className={styles.stickyContainer}>
      <Text
        fw={500}
        size="md"
        className={styles.categoryTitle}
        data-testid="category-tabs-title"
      >
        {CATEGORY_TEXTS.TITLE}
      </Text>
      <ScrollArea
        className={styles.categoriesContainer}
        type="auto"
        offsetScrollbars={false}
        styles={{
          scrollbar: { display: 'none' },
          viewport: {
            paddingLeft: 0,
            overflowX: 'visible',
            overflowY: 'visible',
          },
          root: { width: '100%', height: 'auto', minHeight: '75px' },
        }}
        data-testid="category-tabs-scroll-area"
        viewportRef={scrollAreaRef}
      >
        <div
          className={styles.tabsContainer}
          data-testid="category-tabs-container"
        >
          <Tabs
            value={activeTab}
            onChange={onTabChange}
            classNames={{
              root: styles.tabsList,
              tab: styles.tab,
            }}
            variant="pills"
            radius="xl"
            data-testid="category-tabs-tabs"
          >
            <Tabs.List
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                minHeight: '32px',
              }}
              data-testid="category-tabs-list"
            >
              {categories.map((category) => {
                const isActive = category.toLowerCase() === activeTab;
                return (
                  <Tabs.Tab
                    key={category.toLowerCase()}
                    value={category.toLowerCase()}
                    style={{ marginRight: '16px' }}
                    data-testid={`category-tab-${category.toLowerCase()}`}
                    ref={isActive ? activeTabRef : undefined}
                  >
                    {category}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </Tabs>
        </div>
      </ScrollArea>
    </Box>
  );
}
