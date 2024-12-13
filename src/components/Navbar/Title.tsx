"use client";

import { memo } from "react";
import Link from "next/link";

import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useCurrency } from "../../context/hook";

const TitleWrapper = styled(Typography)<TypographyProps>(({ theme }) => ({
  "& a": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Title = memo(function Title() {
  const { currency } = useCurrency();

  return (
    <TitleWrapper
      variant="h4"
      component="h1"
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.25rem",
        },
      })}
    >
      <Link href={`/?${currency}`}>Crypto Tracker</Link>
    </TitleWrapper>
  );
});

export default Title;
