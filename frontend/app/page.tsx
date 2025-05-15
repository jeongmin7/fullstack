import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("Session data:", JSON.stringify(session, null, 2));
  return (
    <div>
      <p>현재로그인한 유저 보여주기</p>
      <p>{session?.user?.email}</p>
    </div>
  );
}
