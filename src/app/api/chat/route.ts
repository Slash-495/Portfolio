import { NextRequest, NextResponse } from "next/server";
import { queryRagCopilot } from "@/lib/rag-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const result = queryRagCopilot(query);

    return NextResponse.json(result);
  } catch (error) {
    console.error("RAG Copilot API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
