"use client";

import { memo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const TitleWrapper = styled(Typography)<TypographyProps>(({ theme }) => ({
  "& a": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Title = memo(function Title() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

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
      <Link href={`/?${params.toString()}`}>Crypto Tracker</Link>
    </TitleWrapper>
  );
});

export default Title;
