import { Box } from "@mui/material";
import backgroundImage from "../assets/bg-fintest.svg";
import SplashComponent from "../components/UI/SplashComponent";
import { useState } from "react";

function DecisionComponent() {

  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 50px)",
        backgroundColor: "common.white",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
      }}
      onClick={handleFlip}
    >
      <SplashComponent></SplashComponent>
    </Box>
  );
}

export default DecisionComponent;
