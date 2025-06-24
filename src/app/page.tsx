import { auth0 } from "@/lib/autho0";
import Link from "next/link";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className="flex flex-col justify-center items-center p-10 space-y-6">
      {
        !session && (
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome to <span className="text-red-600">Cartify</span>
          </h2>
        )
      }

      {
        session && (
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome <span className="text-red-600">{session?.user?.nickname}</span>
          </h2>
        )
      }
      <Link
        href="/products"
        className="px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition duration-300"
      >
        Browse Products
      </Link>
    </div>
  );
}
