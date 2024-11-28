import { memo } from "react";
import Box from "@mui/material/Box";

type SelectButtonPros = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const SelectButton = memo(
  ({ children, selected, onClick }: SelectButtonPros) => {
    return (
      <Box
        sx={{
          border: "1px solid gold",
          borderRadius: 3,
          p: 1,
          pl: 2,
          pr: 3,
          cursor: "pointer",
          backgroundColor: selected ? "gold" : "",
          color: selected ? "black" : "",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "darkgoldenrod",
            color: "black",
          },
        }}
        onClick={onClick}
      >
        {children}
      </Box>
    );
  }
);

export default SelectButton;
