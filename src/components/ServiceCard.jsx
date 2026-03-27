import { Link } from "react-router-dom";

export default function ServiceCard({
  id,
  title,
  price,
  image,
  category,
  tag,
  tagColor,
  rating,
  reviews,
  desc,
}) {
  // fallback logic
  const label = tag || category;

  const color =
    tagColor ||
    (category === "Available Today"
      ? "bg-green-100 text-green-600"
      : category === "Best Seller"
      ? "bg-blue-100 text-blue-600"
      : "bg-gray-100 text-gray-600");

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">

      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 sm:h-44 object-cover"
      />

      <div className="p-4 sm:p-5">

        {/* BADGE + RATING */}
        <div className="flex items-center justify-between text-xs mb-2">

          <span className={`px-2 py-1 rounded-full font-medium ${color}`}>
            {label}
          </span>

          <span className="text-black">
            <b>⭐ {rating}</b> ({reviews})
          </span>
        </div>

        {/* TITLE */}
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
          {desc}
        </p>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between mt-4">

          <p className="font-bold text-gray-900 text-sm">
            {price}
          </p>

          <Link
            to={`/services/${id}`}
            className="bg-blue-800 hover:text-base transition-all text-white px-3 py-1.5 rounded-md hover:bg-blue-600 text-xs"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}