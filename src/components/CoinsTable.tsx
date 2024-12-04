"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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
import { makeStyles } from "@mui/styles";
import { useQuery } from "@tanstack/react-query";

import { Coin, Currencies } from "../context/types";
import {
  configForUseQuery,
  fetchCoinList,
  fetchCoinListDummy,
} from "../lib/fetchFunctions";
import { getCurrencySymbol } from "../lib/getCurrencySymbol";
import { formatNumber } from "../lib/formatNumber";

const useStyles = makeStyles(() => ({
  tableBodyRow: {
    // backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      // backgroundColor: "#131111",
    },
  },
}));

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinsTable = () => {
  const classes = useStyles();

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

  return (
    <>
      {/* <Typography variant="h4" sx={{ m: 3 }}>
        Cryptocurrency Prices by Market Cap
      </Typography> */}
      <TextField
        label="Search for a Cryptocurrency"
        variant="outlined"
        sx={{ mb: 5, width: "80%" }}
        onChange={handleChange}
      />

      {/* {isLoading ? (
        <LinearProgress sx={{ backgroundColor: "gold" }} />
      ) : ( */}
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(255,215,0,0.5)" }}>
            <TableRow>
              {[
                "Coin",
                "Price",
                "High / Low (24h)",
                "Change (24h)",
                "Market Cap",
                "Total Volume",
              ].map((head) => (
                <TableCell key={head}>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {head}
                  </Typography>
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
                      <TableCell component="th" scope="row">
                        <Link href={`/coins/${row.id}?${currentSearchPrams}`}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
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
                                ml: "0.5rem",
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
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {getCurrencySymbol(currency)}
                          {formatNumber(row.current_price, 3)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {getCurrencySymbol(currency)}
                            {formatNumber(row.high_24h, 3)} /
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {getCurrencySymbol(currency)}
                            {formatNumber(row.low_24h, 3)}
                          </Typography>
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
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {getCurrencySymbol(currency)}
                          {formatNumber(row.market_cap, 2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {getCurrencySymbol(currency)}
                          {formatNumber(row.total_volume, 2)}
                        </Typography>
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
