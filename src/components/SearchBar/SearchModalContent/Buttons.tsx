import { memo } from "react";

import Box from "@mui/material/Box";
import { ClearIcon, CloseIcon, MGlassIcon } from "../../../assets/icons";

export const MagnifyGlass = memo(function MagnifyGlass({
  color,
}: {
  color?: string;
}) {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        left: 10,
        color: color || theme.palette.primary.main,
      })}
    >
      <MGlassIcon />
    </Box>
  );
});

export const ClearButton = memo(function ClearButton({
  color,
  onClick,
}: {
  color?: string;
  onClick: () => void;
}) {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        right: 10,
        color: color || theme.palette.primary.main,
      })}
      onClick={onClick}
    >
      <ClearIcon />
    </Box>
  );
});

export const CloseButton = memo(function CloseButton({
  color,
  onClick,
}: {
  color?: string;
  onClick: () => void;
}) {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 20,
        right: 20,
        color: color || theme.palette.primary.main,
      })}
      onClick={onClick}
    >
      <CloseIcon />
    </Box>
  );
});
