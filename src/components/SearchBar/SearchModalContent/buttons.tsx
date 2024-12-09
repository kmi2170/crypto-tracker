import { memo } from "react";

import Box from "@mui/material/Box";
import { ClearIcon, CloseIcon, MGlassIcon } from "../../../assets/icons";

const defaultColor = "rgba(0,65,106,0.8)";

export const MagnifyGlass = memo(({ color }: { color?: string }) => {
  return (
    <Box
      sx={() => ({
        position: "absolute",
        top: 15,
        left: 10,
        color: color || defaultColor,
      })}
    >
      <MGlassIcon />
    </Box>
  );
});

export const ClearButton = memo(
  ({ color, onClick }: { color?: string; onClick: () => void }) => {
    return (
      <Box
        sx={() => ({
          position: "absolute",
          top: 15,
          right: 10,
          color: color || defaultColor,
        })}
        onClick={onClick}
      >
        <ClearIcon />
      </Box>
    );
  }
);

export const CloseButton = memo(
  ({ color, onClick }: { color?: string; onClick: () => void }) => {
    return (
      <Box
        sx={() => ({
          position: "absolute",
          top: 20,
          right: 20,
          color: color || defaultColor,
        })}
        onClick={onClick}
      >
        <CloseIcon />
      </Box>
    );
  }
);
