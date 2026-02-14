import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

async function handler(req: NextRequest) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Auth not configured. Set AUTH_SECRET env var." },
      { status: 503 }
    );
  }
  const { handlers } = auth;
  if (req.method === "GET") {
    return handlers.GET(req);
  }
  return handlers.POST(req);
}

export { handler as GET, handler as POST };
