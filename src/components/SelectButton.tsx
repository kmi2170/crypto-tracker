import { ComponentProps, memo } from "react";
import Button from "@mui/material/Button";

type SelectButtonPros<T> = {
  name: string;
  value: T;
  selected: boolean;
  handleValueSelect: (value: T) => void;
};

const SelectButton = memo((props) => {
  const { name, value, selected, handleValueSelect } = props;
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
      onClick={() => handleValueSelect(value)}
    >
      {name}
    </Button>
  );
}) as <T>(props: SelectButtonPros<T>) => JSX.Element;

export default SelectButton;
