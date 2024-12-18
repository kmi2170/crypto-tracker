import { memo } from "react";
import Button from "@mui/material/Button";

type SelectButtonPros<T> = {
  name: string;
  value: T;
  selected: boolean;
  colorRGB: string;
  handleValueSelect: (value: T) => void;
};

const SelectButton = memo(function SelectButton(props) {
  const { name, value, selected, colorRGB, handleValueSelect } = props;
  const color = `rgba(${colorRGB},1.0)`;
  const colorTransparent = `rgba(${colorRGB},0.5)`;

  return (
    <Button
      size="small"
      sx={{
        border: `1px solid ${selected ? color : "black"}`,
        cursor: "pointer",
        backgroundColor: selected ? color : "",
        color: "black",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: selected ? color : colorTransparent,
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
