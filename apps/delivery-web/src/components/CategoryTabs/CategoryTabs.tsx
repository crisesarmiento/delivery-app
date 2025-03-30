import { Text, Box, Tabs, ScrollArea } from '@mantine/core';
import styles from './CategoryTabs.module.css';

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
    <Box>
      <Text fw={500} size="md" className={styles.categoryTitle}>
        Categorías
      </Text>
      <ScrollArea
        className={styles.categoriesContainer}
        type="scroll"
        scrollHideDelay={500}
        offsetScrollbars
      >
        <div className={styles.tabsContainer}>
          <Tabs
            value={activeTab}
            onChange={onTabChange}
            classNames={{
              root: styles.tabsList,
              tab: styles.tab,
            }}
            variant="pills"
            radius="xl"
          >
            <Tabs.List style={{ display: 'flex', flexDirection: 'row' }}>
              {categories.map((category) => (
                <Tabs.Tab
                  key={category.toLowerCase()}
                  value={category.toLowerCase()}
                  style={{ marginRight: '16px' }}
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
