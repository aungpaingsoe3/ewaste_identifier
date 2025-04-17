import { NextRequest, NextResponse } from "next/server";
import getTroubleshootingGenAIResponse from "@/app/troubleshooting/getTroubleshooting";

export async function POST(req: NextRequest) {
  const { device, issue } = await req.json();
  const result = await getTroubleshootingGenAIResponse(device, issue);
  console.log(NextResponse.json({ result }));
  return NextResponse.json({ result });
}
