import { Box, Container } from "@mui/material";

function SplashComponent({ children }: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 560,
          maxHeight: "90vh",
          minHeight: 400,
          p: 8,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default SplashComponent;
