import { memo } from "react";
import Button from "@mui/material/Button";

type SelectButtonPros = {
  name: string;
  days: number;
  selected: boolean;
  onClick: (days: number) => void;
};

const SelectButton = memo(
  ({ name, days, selected, onClick }: SelectButtonPros) => {
    return (
      <Button
        sx={{
          border: "1px solid gold",
          borderRadius: 3,
          p: 1,
          pl: 2,
          pr: 3,
          cursor: "pointer",
          backgroundColor: selected ? "gold" : "",
          color: selected ? "black" : "white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "darkgoldenrod",
            color: "black",
          },
        }}
        onClick={() => onClick(days)}
      >
        {name}
      </Button>
    );
  }
);

export default SelectButton;
