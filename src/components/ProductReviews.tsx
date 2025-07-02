import { Product } from "@/types/product";
import { useState } from "react";

interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleLoadMore = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, product.reviews?.length ?? 0));
  };

  return (
    <>
      {product.reviews && product.reviews.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Customer Reviews</h2>
          <div className="space-y-3">
            {product.reviews.slice(0, visibleReviews).map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm font-medium">{review.user}</p>
                  <p className="text-yellow-400 text-xs">★ {review.rating}/5</p>
                </div>
                <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
            {visibleReviews < product.reviews.length && (
              <button
                onClick={handleLoadMore}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 mt-4"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        </div>
      )}
    </>
  );
}