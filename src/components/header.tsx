import { Box, Button, Flex, Spacer, Text, Tooltip, useClipboard } from '@chakra-ui/react';

// 上部のヘッダー
const Header = ({ meetingId }: { meetingId: string }) => {
  const audienceUrl: string = `http://localhost:3000/audience?id=${meetingId}`;
  const { hasCopied, onCopy } = useClipboard(audienceUrl);

  const onClickUrl = () => {
    onCopy();
    alert('URLをコピーしました');
  };

  const openSpeakerDisplay = (meetingId: string) => {
    if (screen !== undefined) {
      const width = 360;
      const height = 160;
      const screenX = 0;
      const screenY = 0;
      const _smallWindow = window.open(
        `http://localhost:3000/speaker-display?id=${meetingId}`,
        'speaker',
        `width=${width},height=${height},screenY=${screenY},screenX=${screenX},toolbar=no,menubar=no,scrollbars=no`,
      );
      _smallWindow!.blur();
      _smallWindow!.focus();
    }
  };

  return (
    <Flex direction="column" justifyContent="end" w="full" h="360px" bg="gray.200" px="12" pb="16">
      <Flex alignItems="center">
        <Box w="24" h="24" bg="teal.400" borderRadius="48" mr="6"></Box>
        <Flex direction="column">
          <Text fontSize="4xl" fontWeight="700">
            ルーム {meetingId}
          </Text>
          <Tooltip label="クリックしてコピー" aria-label="A tooltip">
            <Text onClick={onClickUrl} fontSize="sm" bg="transparent" color="gray.500" cursor="pointer">
              {audienceUrl}
            </Text>
          </Tooltip>
        </Flex>
        <Spacer />
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            openSpeakerDisplay(meetingId);
          }}
        >
          スーパーチャット欄を開く
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
