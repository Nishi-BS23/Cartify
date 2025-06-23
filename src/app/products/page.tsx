import ProductPage from "@/components/Product";
import { auth0 } from "@/lib/autho0";
import { redirect } from "next/navigation";

export default async function Product() {
    const session = await auth0.getSession();
    if (!session || !!session?.user) {
        redirect("/auth/login");
    }
    return (
        <div className="p-20">
            {/* <SearchSort /> */}
            <h1 className="text-3xl font-bold">All Products</h1>
            <ProductPage />
        </div>
    );
}
