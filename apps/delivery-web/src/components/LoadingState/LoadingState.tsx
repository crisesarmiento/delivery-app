import { Center, Loader, Text, Box } from '@mantine/core';
import { LOADING_TEXTS } from '../../config/constants';

interface LoadingStateProps {
  text?: string;
}

const LoadingState = ({ text = LOADING_TEXTS.LOADING }: LoadingStateProps) => {
  return (
    <Center p="xl">
      <Box>
        <Loader
          color="dark"
          size="md"
          style={{ margin: '0 auto', display: 'block' }}
        />
        {text && (
          <Text ta="center" mt="md">
            {text}
          </Text>
        )}
      </Box>
    </Center>
  );
};

export default LoadingState;
