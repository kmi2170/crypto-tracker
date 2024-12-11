import { memo } from "react";
import Image from "next/image";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

type CandidateListItemProps = {
  index: number;
  itemName: string;
  itemImgUrl: string;
  isSelected: boolean;
  oddLineBgColor: string;
  selectedBgColor: string;
  handleClickCandidate(selectedIdx: number): void;
  handleHoverCandidate(selectedIdx: number): void;
};

export const CandidateListItem = memo((props: CandidateListItemProps) => {
  const {
    index,
    itemName,
    itemImgUrl,
    isSelected,
    oddLineBgColor,
    selectedBgColor,
    handleClickCandidate,
    handleHoverCandidate,
  } = props;

  const bgColor = isSelected
    ? selectedBgColor
    : index % 2 === 1
    ? oddLineBgColor
    : grey[100];
  const textColor = isSelected ? "white" : "black";
  const fontWeight = isSelected ? "bold" : "normal";

  return (
    <Box
      sx={{
        p: "0.25rem 0.75rem",
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1.0rem",
      }}
    >
      <Image src={itemImgUrl} width={30} height={30} alt={itemName} />
      <Typography
        variant="h6"
        sx={(theme) => ({
          color: textColor,
          fontWeight,
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.85rem",
          },
        })}
        onClick={() => handleClickCandidate(index)}
        onMouseEnter={() => handleHoverCandidate(index)}
      >
        {itemName}
      </Typography>
    </Box>
  );
});
