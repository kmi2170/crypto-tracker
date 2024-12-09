"use server";

import axios from "axios";
import { Search } from "../../../config/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") as string;

    const { data } = await axios.get(Search(query));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
