import React from 'react';
import { Badge, Text } from '@mantine/core';
import { BRANCH_TEXTS } from '../../config/constants';

interface BranchBadgeProps {
  isOpen: boolean;
}

const BranchBadge: React.FC<BranchBadgeProps> = ({ isOpen }) => {
  return (
    <Badge
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 8px',
        gap: '6px',
        position: 'absolute',
        width: '63px',
        height: '19px',
        right: '16px',
        top: '13px',
        border: isOpen ? '1px solid #B3FF00' : '1px solid #939393',
        borderRadius: '16px',
        background: isOpen ? '#B3FF00' : 'transparent',
        color: isOpen ? '#000000' : '#939393',
      }}
    >
      <Text
        style={{
          width: '35px',
          height: '18px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '10px',
          lineHeight: '18px',
          display: 'flex',
          alignItems: 'center',
          color: isOpen ? '#000000' : '#939393',
        }}
      >
        {isOpen ? BRANCH_TEXTS.OPEN_STATUS : BRANCH_TEXTS.CLOSED_STATUS}
      </Text>
    </Badge>
  );
};

export default BranchBadge;
