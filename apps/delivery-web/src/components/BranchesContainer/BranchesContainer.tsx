import { Container, Text } from '@mantine/core';
import BranchCard from '../BranchCard/BranchCard';
import { BRANCH_TEXTS } from '../../config/constants';
import styles from './BranchesContainer.module.css';
import { BranchesContainerProps } from './types';
import useIsMobile from '@/hooks/useIsMobile';

export default function BranchesContainer({
  branches,
  onBranchClick,
}: BranchesContainerProps) {
  const isMobile = useIsMobile();
  if (!branches.length) {
    return (
      <div className={styles.empty}>
        <Text variant="body">{BRANCH_TEXTS.NO_BRANCHES_FOUND}</Text>
      </div>
    );
  }

  return (
    <Container
      size="xl"
      py="xl"
      px={{ base: 0, md: 0, lg: 0 }}
      className={
        isMobile
          ? `${styles.container} ${styles.containerMobile}`
          : styles.container
      }
    >
      {branches.map((branch) => (
        <div key={branch.id} className={styles.cardWrapper}>
          <BranchCard branch={branch} onClick={() => onBranchClick(branch)} />
        </div>
      ))}
    </Container>
  );
}
