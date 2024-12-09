import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

// import { LocationType } from "../../../api/types/weather";
import { memo } from "react";

type LocationListItemProps = {
  index: number;
  candidate: any;
  isSelected: boolean;
  handleClickCandidate(selectedIdx: number): void;
  handleHoverCandidate(selectedIdx: number): void;
};

export const CandidateListItem = memo((props: LocationListItemProps) => {
  const {
    index,
    candidate,
    isSelected,
    handleClickCandidate,
    handleHoverCandidate,
  } = props;

  const { name, admin1, admin2, country } = candidate;
  let candidateName = `${name}, `;
  if (admin1) candidateName += `${admin1}, `;
  if (admin2) candidateName += `${admin2}, `;
  candidateName += `${country}`;

  const bgColor = (theme: Theme) =>
    isSelected
      ? theme.palette.primary.main
      : index % 2 === 1
      ? theme.palette.primary.light
      : grey[100];
  const textColor = isSelected ? "white" : "black";
  const fontWeight = isSelected ? "bold" : "normal";

  return (
    <Typography
      variant="h6"
      sx={(theme) => ({
        color: textColor,
        backgroundColor: bgColor(theme),
        fontWeight: fontWeight,
        padding: "0.35rem 0.75rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.85rem",
        },
      })}
      onClick={() => handleClickCandidate(index)}
      onMouseEnter={() => handleHoverCandidate(index)}
    >
      {candidateName}
    </Typography>
  );
});
