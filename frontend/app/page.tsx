import { auth } from "@/auth";
import { signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log("Session data:", JSON.stringify(session, null, 2));
  return (
    <div>
      <p>현재로그인한 유저 보여주기</p>
      <p>{session?.user?.email}</p>
      {session?.user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">로그아웃</button>
        </form>
      ) : (
        <Link href="/signin">로그인</Link>
      )}
    </div>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
