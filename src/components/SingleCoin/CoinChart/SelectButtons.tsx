import { styled } from "@mui/material/styles";

import SelectButton from "./SelectButton";
import {
  chartDays,
  dataItems,
  DataItemValue,
  DaysValue,
} from "../../../config/chart/chartButtons";

const ButtonsWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    gap: "2.0rem",
  },
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
}));

const ButtonsSubWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  flexWrap: "wrap",
});

type CoinChartProps = {
  itemName: DataItemValue;
  handleSelectItemName: (name: DataItemValue) => void;
  days: DaysValue;
  handleSelectDays: (days: DaysValue) => void;
};

const SelectButtons = (props: CoinChartProps) => {
  const { itemName, days, handleSelectItemName, handleSelectDays } = props;

  return (
    <ButtonsWrapper>
      <ButtonsSubWrapper>
        {dataItems.map((item) => (
          <SelectButton
            key={item.value}
            name={item.label}
            value={item.value}
            selected={item.value === itemName}
            colorRGB={`${item.colorRGB}`}
            handleValueSelect={handleSelectItemName}
          />
        ))}
      </ButtonsSubWrapper>
      <ButtonsSubWrapper sx={{ mt: "1rem", mb: "1rem" }}>
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            name={day.label}
            value={day.value}
            selected={day.value === days}
            colorRGB="155,221,255"
            handleValueSelect={handleSelectDays}
          />
        ))}
      </ButtonsSubWrapper>
    </ButtonsWrapper>
  );
};

export default SelectButtons;
