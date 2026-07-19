"use client";

export default function TestPage() {

  async function testBackend() {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello"
        }),
      }
    );

    const data = await res.json();

    console.log(data);
  }

  return (
    <button
      onClick={testBackend}
      className="p-4 bg-orange-500 rounded"
    >
      Test Backend
    </button>
  );
}