import { FiStar } from "react-icons/fi";

const stories = [
  {
    name: "David S.",
    text: "Joining MokaNik was the best decision for my small shop. I no longer have to spend hours on Facebook groups looking for clients. The jobs come to me.",
    year: "Provider since 2022",
    image: "/images/test1.png",
  },
  {
    name: "Mark T.",
    text: "The payment system is flawless. I used to chase customers for weeks, now I get paid directly into my bank account the day after I finish a job.",
    year: "Provider since 2021",
    image: "/images/test2.png",
  },
  {
    name: "Steven J.",
    text: "The job management tools are a life saver. I can track my schedule and send professional invoices right from my phone. It’s truly streamlined my business.",
    year: "Provider since 2023",
    image: "/images/test3.png",
  },
];

export default function SuccessStories() {
  return (
    <section className="px-6 lg:px-24 py-16 bg-gray-50">

      <h2 className="text-center text-lg font-semibold text-gray-800 mb-10">
        Success stories
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {stories.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border shadow-sm">

            {/* STARS */}
            <div className="flex gap-1 text-blue-600 mb-3">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} />
              ))}
            </div>

            {/* TEXT */}
            <p className="text-sm text-gray-600 leading-relaxed">
              "{item.text}"
            </p>

            {/* USER */}
            <div className="flex items-center gap-3 mt-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">
                  {item.year}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}