"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

import { useSuspenseQuery, useQuery } from "@tanstack/react-query";

import { Coin, Currencies } from "../../api/types";
import { configForUseQuery, fetchCoinList } from "../../lib/fetchFunctions";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";
import { formatNumber } from "../../lib/formatNumber";
import BodyRowSkeletons from "./TableRowSkelton";
import LastSevenDays from "./LastSevenDays";

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

const per_page = Number(process.env.NEXT_PUBLIC_PAGINATION_NUM_PER_PAGE) || 50;

const CoinsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchPrams = new URLSearchParams(searchParams).toString();

  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const [page, setPage] = useState<number>(1);

  const { data: coins, isLoading } = useQuery({
    queryKey: ["coins", currency, page],
    queryFn: () => fetchCoinList(currency, page, per_page),
    ...configForUseQuery,
  });

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={(theme) => ({
          mt: "1rem",
          mb: "1rem",
          fontWeight: "bold",
          [theme.breakpoints.down("sm")]: {
            mt: "1.5rem",
            fontSize: "16px",
          },
        })}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TableContainer
        component={Paper}
        sx={(theme) => ({
          height: "600px",
          [theme.breakpoints.down("sm")]: {
            maxHeight: "350px",
          },
          position: "relative",
          overflow: "auto !important",
          "&::-webkit-scrollbar": { width: "0px" },
          MsOverflowStyle: "none" /* Internet Explorer and Edge */,
          scrollbarWidth: "none" /* Firefox */,
        })}
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
                },
              }}
            >
              {headerRow.map((head, index) => (
                <TableCell
                  key={head}
                  align={
                    index === 0 || index === 1 || index === headerRow.length - 1
                      ? "center"
                      : "right"
                  }
                  sx={{
                    width:
                      index === 0 ? "3rem" : index === 1 ? "10rem" : "auto",
                    fontWeight: "bold",
                    zIndex: index === 1 ? "30" : "20",
                    position: index === 1 ? "sticky" : null,
                    left: index === 1 ? 0 : null,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <BodyRowSkeletons numOfRows={15} />
            ) : (
              coins?.map((row: Coin) => {
                return (
                  <TableRow
                    key={row.name}
                    onClick={() => {
                      router.push(`/coins/${row.id}?${currentSearchPrams}`);
                    }}
                    sx={{
                      // transition: "background-color 0.05s ease",
                      "&:hover": {
                        backgroundColor: "rgba(239, 234, 234,1.0)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        "& td:nth-of-type(2)": {
                          // transition: "background-color 0.05s ease",
                          backgroundColor: "inherit",
                        },
                      },
                    }}
                  >
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {row.market_cap_rank}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        position: "sticky",
                        left: 0,
                        backgroundColor: "white",
                      }}
                    >
                      {bodyRowCoinName(row)}
                    </TableCell>

                    {bodyRow(row, currency).map((data, index) => (
                      <TableCell
                        key={index}
                        align="right"
                        sx={{
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
          count={coins ? +(300 / per_page).toFixed(0) : 1}
          // count={coins ? +(coins.length / per_page).toFixed(0) : 1}
          // count={handleSearch() ? +(handleSearch()?.length / 30).toFixed(0) : 1}
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

const headerRow = [
  "Rank",
  "Coin",
  "Price",
  "H/L (24H)",
  "24H (%)",
  "Market Cap",
  "Total Volume",
  "Last 7days",
];

const bodyRowCoinName = (row: Coin) => {
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
      key="highLow24h"
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
    <Change24h
      key="change24h"
      sx={{ color: isProfit ? "rgb(14, 203, 129)" : "red" }}
    >
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
    <LastSevenDays key="last7days" price={row.sparkline_in_7d?.price} />,
  ];
};
