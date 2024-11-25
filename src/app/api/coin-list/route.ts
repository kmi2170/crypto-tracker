"use server";

import axios from "axios";
import { CoinList } from "../../../config/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const currency = searchParams.get("currency");

    const { data } = await axios.get(CoinList(currency as string));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
