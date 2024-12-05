"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";

import { useQuery } from "@tanstack/react-query";

import { Coin, Currencies } from "../context/types";
import {
  configForUseQuery,
  fetchCoinList,
  fetchCoinListDummy,
} from "../lib/fetchFunctions";
import { getCurrencySymbol } from "../lib/getCurrencySymbol";
import { formatNumber } from "../lib/formatNumber";
import { styled } from "@mui/material/styles";

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Low = styled("span")({
  color: "slateblue",
  fontWeight: "bold",
});

const High = styled("span")({
  color: "indianred",
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

  if (!currency) return;

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

  const headRows = [
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

      {/* {isLoading ? (
        <LinearProgress sx={{ backgroundColor: "gold" }} />
      ) : ( */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "500px",
          position: "relative",
          overflowX: "auto",
          overflowY: "auto",
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
              {headRows.map((head, index) => (
                <TableCell
                  key={head}
                  align={index === 0 ? "center" : "right"}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {coins &&
              handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row: Coin) => {
                  const isProfit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow key={row.name}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{
                          maxWidth: "5rem",
                          position: "sticky",
                          left: 0,
                          zIndex: "10",
                          backgroundColor: "white",
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
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={row?.image}
                            alt={row.name}
                            width="30"
                            height="30"
                          />
                          <Box
                            sx={{
                              ml: "0.75rem",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "black", fontWeight: "bold" }}
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "dodgerblue" }}
                            >
                              {row.symbol.toUpperCase()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        {getCurrencySymbol(currency)}
                        {formatNumber(row.current_price, 3)}
                      </TableCell>
                      <TableCell align="right">
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
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: isProfit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {isProfit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        {getCurrencySymbol(currency)}
                        {formatNumber(row.market_cap, 2)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        {getCurrencySymbol(currency)}
                        {formatNumber(row.total_volume, 2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* )} */}
      {isLoading && (
        <Pagination
          count={handleSearch() ? +(handleSearch()?.length / 10).toFixed(0) : 1}
          sx={{
            p: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": { color: "gold" },
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
