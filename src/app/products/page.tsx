import ProductPage from "@/components/Product";

export default function Product() {
    return (
        <div className="p-20">
            {/* <SearchSort /> */}
            <h1 className="text-3xl font-bold">All Products</h1>
            <ProductPage />
        </div>
    );
}
