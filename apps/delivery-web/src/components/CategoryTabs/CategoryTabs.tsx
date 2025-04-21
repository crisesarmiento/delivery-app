import { Text, Box, Tabs, ScrollArea } from '@mantine/core';
import styles from './CategoryTabs.module.css';
import { CATEGORY_TEXTS } from '../../config/constants';
import { useRef, useEffect } from 'react';
import { useScrollIntoView } from '@mantine/hooks';

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
  const { scrollIntoView, targetRef } = useScrollIntoView({
    axis: 'x',
    duration: 300,
    easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  });

  useEffect(() => {
    if (activeTab) scrollIntoView({ alignment: 'center' });
  }, [activeTab, scrollIntoView]);

  return (
    <Box data-testid="category-tabs" className={styles.stickyContainer}>
      <Box className={styles.categoryTitleContainer}>
        <Text
          fw={500}
          size="md"
          className={styles.categoryTitle}
          data-testid="category-tabs-title"
        >
          {CATEGORY_TEXTS.TITLE}
        </Text>
      </Box>
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
        <Box
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
                flexWrap: 'nowrap',
                width: 'max-content',
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
                    ref={isActive ? targetRef : undefined}
                  >
                    {category}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </Tabs>
        </Box>
      </ScrollArea>
    </Box>
  );
}
