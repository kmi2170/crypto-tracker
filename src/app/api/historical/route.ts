"use server";

import axios from "axios";
import { HistoricalChart } from "../../../api/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") as string;
    const currency = searchParams.get("currency") as string;
    const days = searchParams.get("days") as string;

    const { data } = await axios.get(HistoricalChart(id, currency, days));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
