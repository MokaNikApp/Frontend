export default function ServiceCard({
  title,
  price,
  image,
  category,
  tag,
  tagColor,
  rating,
  reviews,
}) {
  // fallback logic (VERY IMPORTANT)
  const label = tag || category;

  const color =
    tagColor ||
    (category === "Available Today"
      ? "bg-green-100 text-green-600"
      : category === "Best Seller"
      ? "bg-blue-100 text-blue-600"
      : "bg-gray-100 text-gray-600");

  return (
    <div className="bg-white rounded-xl overflow-hidden border shadow-sm">

      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">

        {/* BADGE + RATING */}
        <div className="flex items-center justify-between text-xs mb-2">

          {/* BADGE */}
          <span className={`px-2 py-1 rounded-full font-medium ${color}`}>
            {label}
          </span>

          {/* RATING */}
          <span className="text-black">
            <b>⭐ {rating}</b> ({reviews})
          </span>
        </div>

        {/* TITLE */}
        <h3 className="font-semibold text-gray-900 text-sm">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-500 mt-1">
          Front or rear ceramic brake pad installation with rotor resurfacing.
        </p>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between mt-4">

          <p className="font-bold text-gray-900 text-sm">
            ${price}
          </p>

          <button className="bg-blue-800 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 text-xs">
            View Details
          </button>

        </div>

      </div>
    </div>
  );
}