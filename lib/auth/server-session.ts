import { cookies } from "next/headers";
import { verifyAccessToken } from "../auth";

export type SessionUser = {
  userId: string;
  role: string;
  email?: string;
  name?: string;
};


export async function getServerSession(): Promise<SessionUser | null> {

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;


  if (!token) {
    return null;
  }


  try {

    const user = await verifyAccessToken(token);

    return user;

  } catch (error) {

    console.error("Session verification failed:", error);

    return null;

  }
}