interface StarRatingProps {
  rating: number;
  maxStars?: number;
  reviewCount?: number;
  className?: string;
  showReviewCount?: boolean;
}

/** Displays star rating (1–5) with optional review count. */
export default function StarRating({
  rating,
  maxStars = 5,
  reviewCount,
  className = "",
  showReviewCount = true,
}: StarRatingProps) {
  const clamped = Math.min(maxStars, Math.max(0, Math.floor(rating)));
  return (
    <div className={`flex items-center ${className}`.trim()}>
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={i < clamped ? "text-yellow-400" : "text-gray-300"}
          aria-hidden
        >
          ★
        </span>
      ))}
      {showReviewCount && reviewCount != null && (
        <span className="text-xs text-gray-600 ml-1">
          ({reviewCount.toLocaleString()} Reviews)
        </span>
      )}
    </div>
  );
}
