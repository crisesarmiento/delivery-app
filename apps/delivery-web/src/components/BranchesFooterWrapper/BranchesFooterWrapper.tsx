import { Flex } from '@mantine/core';
import styles from './BranchesFooterWrapper.module.css';
import { BranchesFooterWrapperProps } from './types';
import MobileCartButton from '../MobileCartButton';
import { useCart } from '@/context/CartContext';
import useIsMobile from '@/hooks/useIsMobile';

const BranchesFooterWrapper = ({ onClick }: BranchesFooterWrapperProps) => {
  const { cartTotal } = useCart();
  const isMobile = useIsMobile();

  return (
    <Flex className={styles.cartButtonContainer}>
      {isMobile ? (
        <MobileCartButton cartTotal={cartTotal} onClick={onClick} />
      ) : null}
    </Flex>
  );
};

export default BranchesFooterWrapper;
