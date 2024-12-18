import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const BodyRowSkeletons = ({ numOfRows }: { numOfRows: number }) => {
  return Array(numOfRows)
    .fill(null)
    .map((_, i) => {
      return (
        <TableRow key={i}>
          {bodyRowSkelton.map((data, j) => {
            return (
              <TableCell key={j}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {data}
                </Box>
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
};

export default BodyRowSkeletons;

const width = 60;
const height = 15;

const bodyRowSkelton = [
  <Skeleton key="rank" width={15} height={height} />,
  <Box
    key="coin"
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    }}
  >
    <Skeleton variant="circular" width={30} height={30} />
    <Box
      sx={{
        ml: "0.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "0.25rem",
      }}
    >
      <Skeleton width={60} height={height} />
      <Skeleton width={60} height={height} />
    </Box>
  </Box>,
  <Skeleton key="price" width={width} height={height} />,
  <Box
    key="highLow24h"
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Skeleton width={width} height={height} />
    <Skeleton width={width} height={height} />
  </Box>,
  <Skeleton key="change24h" width={width} height={height} />,
  <Skeleton key="marketCap" width={width} height={height} />,
  <Skeleton key="totalVolume" width={width} height={height} />,
  <Skeleton key="last7days" width={width * 1.5} height={height * 2} />,
];
