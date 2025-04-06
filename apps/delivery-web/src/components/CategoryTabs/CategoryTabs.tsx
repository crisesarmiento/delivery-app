import { Text, Box, Tabs, ScrollArea } from '@mantine/core';
import styles from './CategoryTabs.module.css';
import { CATEGORY_TEXTS } from '../../config/constants';

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
  return (
    <Box data-testid="category-tabs">
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
        offsetScrollbars
        styles={{ scrollbar: { display: 'none' } }}
        data-testid="category-tabs-scroll-area"
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
              style={{ display: 'flex', flexDirection: 'row' }}
              data-testid="category-tabs-list"
            >
              {categories.map((category) => (
                <Tabs.Tab
                  key={category.toLowerCase()}
                  value={category.toLowerCase()}
                  style={{ marginRight: '16px' }}
                  data-testid={`category-tab-${category.toLowerCase()}`}
                >
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>
      </ScrollArea>
    </Box>
  );
}
