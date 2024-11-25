"use server";

import axios from "axios";
import { TrendingCoins } from "../../../config/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const currency = searchParams.get("currency") as string;
    const { data } = await axios.get(TrendingCoins(currency));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
