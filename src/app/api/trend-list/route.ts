"use server";

import axios from "axios";
import { TrendingCoins } from "../../../api/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const currency = searchParams.get("currency") as string;
    const { data } = await axios.get(TrendingCoins());

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
