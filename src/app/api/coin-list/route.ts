"use server";

import axios from "axios";
import { CoinList } from "../../../api/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const currency = searchParams.get("currency") as string;
    const page = searchParams.get("page") as string;
    const per_page = searchParams.get("per_page") as string;

    const { data } = await axios.get(CoinList(currency, page, per_page));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
