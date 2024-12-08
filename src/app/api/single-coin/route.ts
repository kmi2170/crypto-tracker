"use server";

import axios from "axios";
import { SingleCoin } from "../../../config/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") as string;

    const { data } = await axios.get(SingleCoin(id));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
