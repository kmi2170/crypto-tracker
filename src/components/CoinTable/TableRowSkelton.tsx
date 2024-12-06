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
              <TableCell
                align={j === 0 ? "center" : "right"}
                key={j}
                sx={{
                  width: j === 0 ? "10rem" : "auto",
                }}
              >
                {data}
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
  <Box
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
      <Skeleton width={width} height={height} />
      <Skeleton width={width} height={height} />
    </Box>
  </Box>,
  <Skeleton width={width} height={height} />,
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Skeleton width={width} height={height} />
    <Skeleton width={width} height={height} />
  </Box>,
  <Skeleton width={width} height={height} />,
  <Skeleton width={width} height={height} />,
  <Skeleton width={width} height={height} />,
];
