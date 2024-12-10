import { memo } from "react";
import Image from "next/image";

import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

import { CoinSearch } from "../../../context/types";

type CandidateListItemProps = {
  index: number;
  candidate: CoinSearch;
  isSelected: boolean;
  handleClickCandidate(selectedIdx: number): void;
  handleHoverCandidate(selectedIdx: number): void;
};

export const CandidateListItem = memo((props: CandidateListItemProps) => {
  const {
    index,
    candidate,
    isSelected,
    handleClickCandidate,
    handleHoverCandidate,
  } = props;

  const { id, name, symbol, api_symbol, market_cap_rank, thumb, large } =
    candidate;
  const candidateName = `(${symbol}) ${name}`;

  ("rgba(0,65,106,0.8)");
  const bgColor = (theme: Theme) =>
    isSelected
      ? "rgba(0,65,106,0.8)"
      : index % 2 === 1
      ? "rgba(0,65,106,0.15)"
      : grey[100];
  const textColor = isSelected ? "white" : "black";
  const fontWeight = isSelected ? "bold" : "normal";

  return (
    <>
      <Typography
        variant="h6"
        sx={(theme) => ({
          color: textColor,
          backgroundColor: bgColor(theme),
          fontWeight,
          padding: "0.35rem 0.75rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.85rem",
          },
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1.0rem",
        })}
        onClick={() => handleClickCandidate(index)}
        onMouseEnter={() => handleHoverCandidate(index)}
      >
        <Image src={thumb} width={30} height={30} alt={name}></Image>
        {candidateName}
      </Typography>
    </>
  );
});
