import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const CarouselItemSkeletons = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  let numOfSkeletons;
  switch (true) {
    case isXs:
    case isSm:
      numOfSkeletons = 3;
      break;
    case isMd:
      numOfSkeletons = 5;
      break;
    case isLg:
    case isXl:
      numOfSkeletons = 8;
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {numOfSkeletons &&
        Array(numOfSkeletons)
          .fill(null)
          .map((_, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <Skeleton variant="rectangular" width={33} height={18} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="rectangular" width={50} height={23} />
                <Skeleton variant="rectangular" width={56} height={18} />
              </Box>
            );
          })}
    </Box>
  );
};

export default CarouselItemSkeletons;
