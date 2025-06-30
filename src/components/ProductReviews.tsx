import { Product } from "@/types/product";

interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Customer Reviews
      </h2>
      {product.reviews && product.reviews.length > 0 ? (
        <div className="space-y-3">
          {product.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-900 text-sm font-medium">
                  {review.user}
                </p>
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
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No reviews yet.</p>
      )}
    </div>
  );
}
