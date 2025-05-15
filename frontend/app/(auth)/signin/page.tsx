"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false, // 먼저 리디렉션을 막고
      });

      if (result?.error) {
        alert(result.error);
        return;
      }

      // 성공 시 수동으로 리디렉션
      window.location.href = result?.url || "/";
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-gray-700">인프런 계정으로 로그인할 수 있어요. </p>
      <form
        className="flex flex-col gap-2 min-w-[300px]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">이메일</label>
        <input
          className="border-2 border-gray-400 rounded-sm p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="example@inflearn.com"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          className="border-2 border-gray-400 rounded-sm p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-bold cursor-pointer rounded-sm p-2"
        >
          로그인
        </button>
        <Link href="signup" className="text-center">
          회원가입
        </Link>
      </form>
    </div>
  );
}
