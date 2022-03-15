import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pages } from 'src/types/page';

const Sidebar = () => {
  const router = useRouter();
  return (
    <Flex bg="white" w="240px" h="full" direction="column" fontSize="md" fontWeight="bold" px="16px">
      <LogoBox />
      {pages.map((page) => {
        return <NavBox selected={page.route == router.pathname} text={page.text} route={page.route} />;
      })}
    </Flex>
  );
};

const LogoBox = () => {
  return (
    <Link href={'/'}>
      <Flex w="full" h="64px" alignItems="center" my="4" cursor="pointer">
        <Image src="images/logo.png" alt="logo" w="104px" />
      </Flex>
    </Link>
  );
};

const NavBox = ({ selected, text, route }: { selected: boolean; text: string; route: string }) => {
  return (
    <Link href={route}>
      <Flex
        h="48px"
        my="2"
        px="4"
        alignItems="center"
        borderRadius="md"
        role="group"
        cursor="pointer"
        bg={selected ? 'teal' : 'white'}
        color={selected ? 'white' : 'gray.500'}
        _hover={{
          bg: selected ? 'teal.400' : 'gray.100',
        }}
      >
        {text}
      </Flex>
    </Link>
  );
};

export default Sidebar;
