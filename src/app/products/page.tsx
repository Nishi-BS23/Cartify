import ProductCard from "@/components/ProductCard";
import SearchSort from "@/components/SearchSort";

export default function ProductPage() {
    return (
        <div className="p-20">
            <SearchSort />
            <h1 className="text-3xl font-bold">All Products</h1>
            <ProductCard />
        </div>
    )
}
