import { getSession } from "./lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request:NextRequest){
    const session= await getSession();

    const isChooseRolePage = request.nextUrl.pathname.startsWith("/choose-role");
    if (isChooseRolePage && !session?.user){
        return NextResponse.redirect(new URL("/sign-up", request.url))
    }

    return NextResponse.next();
}