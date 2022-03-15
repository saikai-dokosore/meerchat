import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

const Header = ({ title }: { title: string }) => {
  return (
    <Flex as="header" width="full" h="20" alignItems="center">
      <Box>
        <Heading as="h1" size="md">
          {title}
        </Heading>
      </Box>
      <Spacer />
      <Box></Box>
    </Flex>
  );
};

export default Header;
