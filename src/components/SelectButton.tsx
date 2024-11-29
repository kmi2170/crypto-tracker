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
          border: `1px solid ${selected ? "gold" : "black"}`,
          pl: 2,
          pr: 2,
          cursor: "pointer",
          backgroundColor: selected ? "gold" : "",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "goldenrod",
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
