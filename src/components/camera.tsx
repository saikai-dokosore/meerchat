import { Flex } from "@chakra-ui/react";
import { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

const Camera = () => {
  // const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);

  return (
    <Flex w="full" h="full" direction="column">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </Flex>
  );
};

export default Camera;
