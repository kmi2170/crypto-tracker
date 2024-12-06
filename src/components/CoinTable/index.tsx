"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

import { useQuery } from "@tanstack/react-query";

import { Coin, Currencies } from "../../context/types";
import {
  configForUseQuery,
  fetchCoinList,
  fetchCoinListDummy,
} from "../../lib/fetchFunctions";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";
import { formatNumber } from "../../lib/formatNumber";
import BodyRowSkeletons from "./TableRowSkelton";

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Low = styled("span")({
  color: "indianred",
  fontWeight: "bold",
});

const High = styled("span")({
  color: "slateblue",
  fontWeight: "bold",
});

const Change24h = styled("span")({
  fontWeight: "bold",
});

const CoinsTable = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentSearchPrams = new URLSearchParams(searchParams).toString();
  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data: coins, isLoading } = useQuery({
    queryKey: ["coins", currency],
    queryFn: () => fetchCoinListDummy(currency),
    ...configForUseQuery,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    return (coins as Coin[])?.filter(
      (coin: Coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const headerRow = [
    "Coin",
    "Price",
    "High/Low (24h)",
    "Change (24h)",
    "Market Cap",
    "Total Volume",
  ];

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ mt: "2rem", mb: "1rem", fontWeight: "bold" }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search for a Cryptocurrency"
          variant="outlined"
          sx={{ mb: "0.75rem", width: "80%" }}
          onChange={handleChange}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          height: "500px",
          // maxHeight: "500px",
          position: "relative",
          overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "0px" },
          MsOverflowStyle: "none" /* Internet Explorer and Edge */,
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": { backgroundColor: "rgba(238,232,170,1.0)" },
                zIndex: "20",
                "& th:first-of-type": {
                  position: "sticky",
                  backgroundColor: "rgba(238,232,170,1.0)",
                  left: 0,
                  zIndex: "20",
                },
              }}
            >
              {headerRow.map((head, index) => (
                <TableCell
                  key={head}
                  align={index === 0 ? "center" : "right"}
                  sx={{
                    width: index === 0 ? "10rem" : "auto",
                    fontWeight: "bold",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <BodyRowSkeletons numOfRows={10} />
            ) : (
              handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row: Coin) => {
                  return (
                    <TableRow key={row.name}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        sx={{
                          width: "10rem",
                          position: "sticky",
                          backgroundColor: "white",
                          left: 0,
                          zIndex: "10",
                          transition: "background-color 0.5s ease",
                          "&:hover": {
                            backgroundColor: "rgba(192,192,192,0.5)",
                            borderRadius: "5px",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          router.push(`/coins/${row.id}?${currentSearchPrams}`);
                        }}
                      >
                        {headRow(row)}
                      </TableCell>

                      {bodyRow(row, currency).map((data, index) => (
                        <TableCell
                          key={index}
                          align="right"
                          sx={{
                            width: index === 0 ? "10rem" : "auto",
                            fontWeight: "bold",
                          }}
                        >
                          {data}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading && (
        <Pagination
          count={handleSearch() ? +(handleSearch()?.length / 10).toFixed(0) : 1}
          sx={{
            p: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value: number) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      )}
    </>
  );
};
export default CoinsTable;

const headRow = (row: Coin) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Image src={row?.image} alt={row.name} width="30" height="30" />
      <Box
        sx={{
          ml: "0.75rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="body2" sx={{ color: "black", fontWeight: "bold" }}>
          {row.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "dodgerblue" }}>
          {row.symbol.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

const bodyRow = (row: Coin, currency: Currencies) => {
  const isProfit = row.price_change_percentage_24h > 0;

  return [
    <>
      {getCurrencySymbol(currency)}
      {formatNumber(row.current_price, 3)}
    </>,
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <High>
        {getCurrencySymbol(currency)}
        {formatNumber(row.high_24h, 3)}
      </High>
      <Low>
        {getCurrencySymbol(currency)}
        {formatNumber(row.low_24h, 3)}
      </Low>
    </Box>,
    <Change24h sx={{ color: isProfit ? "rgb(14, 203, 129)" : "red" }}>
      {isProfit && "+"}
      {row.price_change_percentage_24h.toFixed(2)}%
    </Change24h>,
    <>
      {getCurrencySymbol(currency)}
      {formatNumber(row.market_cap, 2)}
    </>,
    <>
      {getCurrencySymbol(currency)}
      {formatNumber(row.total_volume, 2)}
    </>,
  ];
};
