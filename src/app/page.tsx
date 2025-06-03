import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Welcome to <span className="text-red-600">Catify</span>
      </h2>
      <Link
        href="/products"
        className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition duration-300"
      >
        Browse Products
      </Link>
    </div>
  );
}
