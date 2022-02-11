import axios from "axios"
import { useEffect, useState } from "react"
import { HistoricalChart } from "../config/api"
import { CryptoState } from "../context/CryptoContext"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ChartOptions,
} from "chart.js";

import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinInfo = ({ coin }: { coin: any }) => {
  const [histricalData, setHistricalDate] = useState<[]>([])
  const [days, setDays] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { currency } = CryptoState()

  const fetchHistricalData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

      setIsLoading(false)
      setHistricalDate(data.prices)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHistricalData()
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      point: {
        radius: 1,
      }
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{
        width: { sm: "100%", md: "75%", lg: "75%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 3, p: 5,
      }}>
        {!histricalData || isLoading ? (
          <CircularProgress
            sx={{ color: "gold" }}
            size={250}
            thickness={3}
          />
        ) :
          (
            <>
              <Line
                data={{
                  labels: histricalData.map((coin: any) => {
                    const date = new Date(coin[0])
                    const time = date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`
                    return days === 1 ? time : date.toLocaleString()
                  }),
                  datasets: [
                    {
                      data: histricalData.map((coin: any) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D"
                    },
                  ]
                }}
                options={options}
              />
              <Box sx={{
                display: "flex", mt: 3,
                justifyContent: "space-around",
                width: "100%"
              }}>
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value)
                      setIsLoading(true)
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </Box>
            </>
          )}
      </Container>
    </ThemeProvider>
  )
}

export default CoinInfo
