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
            return <TableCell key={j}>{data}</TableCell>;
          })}
        </TableRow>
      );
    });
};

export default BodyRowSkeletons;

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
      <Skeleton width={50} height={10} />
      <Skeleton width={50} height={10} />
    </Box>
  </Box>,
  <Skeleton width={50} height={10} />,
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Skeleton width={50} height={10} />
    <Skeleton width={50} height={10} />
  </Box>,
  <Skeleton width={50} height={10} />,
  <Skeleton width={50} height={10} />,
  <Skeleton width={50} height={10} />,
];
