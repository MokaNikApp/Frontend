import { useParams } from "react-router-dom";
import { services } from "../lib/mock/services";

export default function ServiceDetail() {
  const { id } = useParams();

  console.log("URL ID:", id);
  console.log("Services:", services);

  const service = services.find((s) => s.id === id);

  if (!service) return <div>Service not found</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <p>₦{service.price}</p>
    </div>
  );
}