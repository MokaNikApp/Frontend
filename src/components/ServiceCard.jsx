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
  const label = tag || category;

  const color =
    tagColor ||
    (category === "Available Today"
      ? "bg-green-100 text-green-600"
      : category === "Best Seller"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-600");

  return (
    <div
      className="
        bg-white rounded-xl overflow-hidden border border-gray-200
        shadow-sm
        transform transition duration-300 ease-in-out
        hover:-translate-y-2
        hover:shadow-[0_10px_30px_rgba(30,64,175,0.25),0_10px_30px_rgba(22,163,74,0.25)]
      "
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-40 sm:h-44 object-cover
            transition duration-300 ease-in-out
            hover:scale-105
          "
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className={`px-2 py-1 rounded-full font-medium ${color}`}>
            {label}
          </span>

          <span className="text-black">
            <b>⭐ {rating}</b> ({reviews})
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm sm:text-base transition hover:text-blue-800">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
          {desc}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-gray-900 text-sm">{price}</p>

          <Link
            to={`/services/${id}`}
            className="
              bg-blue-800 text-white px-3 py-1.5 rounded-md text-xs
              transition-all
              hover:bg-blue-600 hover:text-base
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}