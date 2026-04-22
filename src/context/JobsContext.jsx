import { createContext, useContext, useState } from "react";

const initialJobs = [
  // ─── INCOMING ───
  {
    id: 1, image: "/images/jr1.png", distance: "1.2 miles away",
    name: "John Doe", service: "Brake Pad Replacement", serviceColor: "text-blue-600",
    scheduledDate: "Oct 25, 10:00 AM", car: "2018 Honda Civic • Silver",
    status: "incoming", progress: 0, avatars: ["/images/av1.png"],
    carImage: "/images/ca1.png", plateNumber: "ABC-1234", carModel: "Honda Civic",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 350.00",
    initials: "JD", initialsColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 2, image: "/images/jr2.png", distance: "2.8 miles away",
    name: "Sarah Williams", service: "Oil & Filter Change", serviceColor: "text-blue-600",
    scheduledDate: "Oct 25, 01:30 PM", car: "2021 Toyota RAV4 • Blue",
    status: "incoming", progress: 0, avatars: ["/images/av2.png"],
    carImage: "/images/ca2.png", plateNumber: "RAV-2021", carModel: "Toyota RAV4",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 820.00",
    initials: "SW", initialsColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 3, image: "/images/jr3.png", distance: "0.5 miles away",
    name: "Michael Chen", service: "Engine Diagnostics", serviceColor: "text-orange-500",
    scheduledDate: "Oct 26, 08:00 AM", car: "2015 BMW 3 Series • Black",
    status: "incoming", progress: 0, avatars: ["/images/av3.png"],
    carImage: "/images/ca3.png", plateNumber: "K-FAST-99", carModel: "BMW 3 Series",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 200.00",
    initials: "MC", initialsColor: "bg-green-100 text-green-600",
  },
  {
    id: 4, image: "/images/jr4.png", distance: "4.1 miles away",
    name: "Emma Garcia", service: "Tire Rotation & Balance", serviceColor: "text-blue-600",
    scheduledDate: "Oct 26, 03:00 PM", car: "2019 Ford F-150 • White",
    status: "incoming", progress: 0, avatars: ["/images/av4.png"],
    carImage: "/images/ca4.png", plateNumber: "TRK-2200", carModel: "Ford F-150",
    pickupAddress: "452 Oak Street, West Avenue", type: "enroute", completedDate: null,
    rating: null, review: null, amount: "SAR 450.00",
    initials: "EG", initialsColor: "bg-purple-100 text-purple-600",
  },
  {
    id: 5, image: "/images/jr1.png", distance: "3.3 miles away",
    name: "Lena Marsh", service: "AC System Recharge", serviceColor: "text-blue-600",
    scheduledDate: "Oct 27, 09:00 AM", car: "2021 Kia Sportage • White",
    status: "incoming", progress: 0, avatars: ["/images/av1.png"],
    carImage: "/images/ca1.png", plateNumber: "KS-1123", carModel: "Kia Sportage",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 180.00",
    initials: "LM", initialsColor: "bg-teal-100 text-teal-600",
  },
  {
    id: 6, image: "/images/jr2.png", distance: "1.9 miles away",
    name: "James Carter", service: "Battery Replacement", serviceColor: "text-orange-500",
    scheduledDate: "Oct 27, 11:00 AM", car: "2020 Ford F-150 • Oxford White",
    status: "incoming", progress: 0, avatars: ["/images/av2.png"],
    carImage: "/images/ca2.png", plateNumber: "FD-8812", carModel: "Ford F-150",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 560.00",
    initials: "JC", initialsColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 7, image: "/images/jr3.png", distance: "2.6 miles away",
    name: "Nora Rahman", service: "Full Synthetic Oil Change", serviceColor: "text-blue-600",
    scheduledDate: "Oct 27, 02:00 PM", car: "2022 Mercedes C200 • Silver",
    status: "incoming", progress: 0, avatars: ["/images/av3.png"],
    carImage: "/images/ca3.png", plateNumber: "MB-2022", carModel: "Mercedes C200",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 350.00",
    initials: "NR", initialsColor: "bg-teal-100 text-teal-600",
  },
  {
    id: 8, image: "/images/jr4.png", distance: "5.0 miles away",
    name: "Basel Hamad", service: "Suspension Check", serviceColor: "text-orange-500",
    scheduledDate: "Oct 28, 08:30 AM", car: "2017 Nissan Patrol • Black",
    status: "incoming", progress: 0, avatars: ["/images/av4.png"],
    carImage: "/images/ca4.png", plateNumber: "NP-7788", carModel: "Nissan Patrol",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 750.00",
    initials: "BH", initialsColor: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 9, image: "/images/jr1.png", distance: "0.9 miles away",
    name: "Fatima Al-Zahra", service: "Windshield Replacement", serviceColor: "text-blue-600",
    scheduledDate: "Oct 28, 10:00 AM", car: "2020 Hyundai Tucson • Red",
    status: "incoming", progress: 0, avatars: ["/images/av1.png"],
    carImage: "/images/ca1.png", plateNumber: "HT-2020", carModel: "Hyundai Tucson",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 1,200.00",
    initials: "FA", initialsColor: "bg-red-100 text-red-600",
  },
  {
    id: 10, image: "/images/jr2.png", distance: "3.7 miles away",
    name: "Khalid Amin", service: "Wheel Alignment", serviceColor: "text-blue-600",
    scheduledDate: "Oct 28, 12:00 PM", car: "2019 Land Cruiser • White",
    status: "incoming", progress: 0, avatars: ["/images/av2.png"],
    carImage: "/images/ca2.png", plateNumber: "LC-4WD", carModel: "Land Cruiser",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 280.00",
    initials: "KA", initialsColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 11, image: "/images/jr3.png", distance: "2.2 miles away",
    name: "Tariq Hassan", service: "Radiator Flush", serviceColor: "text-orange-500",
    scheduledDate: "Oct 29, 09:00 AM", car: "2016 Chevrolet Tahoe • Gray",
    status: "incoming", progress: 0, avatars: ["/images/av3.png"],
    carImage: "/images/ca3.png", plateNumber: "TH-9900", carModel: "Chevrolet Tahoe",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 320.00",
    initials: "TH", initialsColor: "bg-gray-100 text-gray-600",
  },
  {
    id: 12, image: "/images/jr4.png", distance: "1.4 miles away",
    name: "Hana Al-Mutairi", service: "Spark Plug Replacement", serviceColor: "text-blue-600",
    scheduledDate: "Oct 29, 11:30 AM", car: "2018 Lexus ES350 • Pearl",
    status: "incoming", progress: 0, avatars: ["/images/av4.png"],
    carImage: "/images/ca4.png", plateNumber: "LE-3550", carModel: "Lexus ES350",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 420.00",
    initials: "HA", initialsColor: "bg-pink-100 text-pink-600",
  },

  // ─── ACTIVE ───
  {
    id: 13, image: "/images/jr1.png", distance: "1.8 miles away",
    name: "Ahmed Al-Sayed", service: "Full Synthetic Oil Change", serviceColor: "text-blue-600",
    scheduledDate: "Oct 28, 10:00 AM", car: "2020 Audi A4 • White",
    status: "active", progress: 65, avatars: ["/images/av1.png", "/images/av2.png"],
    carImage: "/images/ca1.png", plateNumber: "SJ-9921", carModel: "Audi A4",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 350.00",
    initials: "AA", initialsColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 14, image: "/images/jr2.png", distance: "3.2 miles away",
    name: "Sarah Johnson", service: "Brake Pad Replacement", serviceColor: "text-orange-500",
    scheduledDate: "Oct 27, 02:00 PM", car: "2022 Honda CR-V • Gray",
    status: "active", progress: 20, avatars: ["/images/av3.png"],
    carImage: "/images/ca2.png", plateNumber: "HN-4421", carModel: "Honda CR-V",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 820.00",
    initials: "SJ", initialsColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 15, image: "/images/jr3.png", distance: "2.5 miles away",
    name: "Robert Miller", service: "Towing Service", serviceColor: "text-orange-500",
    scheduledDate: "Oct 27, 04:00 PM", car: "2019 Ford F-150 • TRK-2200",
    status: "active", progress: 0, avatars: ["/images/av5.png"],
    carImage: "/images/ca3.png", plateNumber: "TRK-2200", carModel: "Ford F-150",
    pickupAddress: "Highway 101, Exit 24", type: "enroute", completedDate: null,
    rating: null, review: null, amount: "SAR 500.00",
    initials: "RM", initialsColor: "bg-red-100 text-red-600",
  },
  {
    id: 16, image: "/images/jr4.png", distance: "1.1 miles away",
    name: "Yusuf Al-Farsi", service: "Transmission Fluid Change", serviceColor: "text-blue-600",
    scheduledDate: "Oct 28, 08:00 AM", car: "2021 Toyota Camry • Silver",
    status: "active", progress: 45, avatars: ["/images/av2.png"],
    carImage: "/images/ca4.png", plateNumber: "YF-2021", carModel: "Toyota Camry",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 650.00",
    initials: "YF", initialsColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 17, image: "/images/jr1.png", distance: "4.4 miles away",
    name: "Rania Aziz", service: "AC System Recharge", serviceColor: "text-blue-600",
    scheduledDate: "Oct 28, 11:00 AM", car: "2023 Hyundai Sonata • Blue",
    status: "active", progress: 80, avatars: ["/images/av3.png", "/images/av4.png"],
    carImage: "/images/ca1.png", plateNumber: "RA-2023", carModel: "Hyundai Sonata",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 180.00",
    initials: "RA", initialsColor: "bg-purple-100 text-purple-600",
  },
  {
    id: 18, image: "/images/jr2.png", distance: "2.9 miles away",
    name: "Mohammed Salim", service: "Full Engine Diagnostic", serviceColor: "text-orange-500",
    scheduledDate: "Oct 28, 01:00 PM", car: "2015 BMW M4 • Black",
    status: "active", progress: 30, avatars: ["/images/av1.png"],
    carImage: "/images/ca2.png", plateNumber: "K-FAST-99", carModel: "BMW M4",
    pickupAddress: null, type: "inprogress", completedDate: null,
    rating: null, review: null, amount: "SAR 950.00",
    initials: "MS", initialsColor: "bg-gray-100 text-gray-600",
  },

  // ─── COMPLETED ───
  {
    id: 19, image: "/images/jr3.png", distance: "2.1 miles away",
    name: "Omar Al-Hashimi", service: "Annual Inspection", serviceColor: "text-blue-600",
    scheduledDate: "Oct 26, 11:00 AM", car: "2019 Toyota Camry • Black",
    status: "completed", progress: 100, avatars: ["/images/av4.png"],
    carImage: "/images/ca3.png", plateNumber: "TX-3127", carModel: "Toyota Camry",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 26, 2023",
    rating: 3, review: "Fast and efficient work.", amount: "SAR 200.00",
    initials: "OA", initialsColor: "bg-green-100 text-green-600",
  },
  {
    id: 20, image: "/images/jr4.png", distance: "1.5 miles away",
    name: "Ryan T.", service: "Transmission Repair", serviceColor: "text-orange-500",
    scheduledDate: "Oct 24, 09:00 AM", car: "2018 Ford Mustang • Red",
    status: "completed", progress: 100, avatars: ["/images/av1.png"],
    carImage: "/images/ca4.png", plateNumber: "RT-4567", carModel: "Ford Mustang",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 24, 2023",
    rating: 4, review: "Big job but handled well.", amount: "SAR 2,450.00",
    initials: "RT", initialsColor: "bg-purple-100 text-purple-600",
  },
  {
    id: 21, image: "/images/jr1.png", distance: "0.8 miles away",
    name: "Muna Khalid", service: "AC Recharge", serviceColor: "text-blue-600",
    scheduledDate: "Oct 22, 03:00 PM", car: "2021 Kia Sportage • White",
    status: "completed", progress: 100, avatars: ["/images/av2.png"],
    carImage: "/images/ca1.png", plateNumber: "KS-1123", carModel: "Kia Sportage",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 22, 2023",
    rating: 5, review: "Quick turnaround, very professional.", amount: "SAR 450.00",
    initials: "MK", initialsColor: "bg-pink-100 text-pink-600",
  },
  {
    id: 22, image: "/images/jr2.png", distance: "3.4 miles away",
    name: "Fahad Saleh", service: "Engine Diagnostics", serviceColor: "text-blue-600",
    scheduledDate: "Oct 20, 10:00 AM", car: "2019 GMC Yukon • White",
    status: "completed", progress: 100, avatars: ["/images/av3.png"],
    carImage: "/images/ca2.png", plateNumber: "FS-2019", carModel: "GMC Yukon",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 20, 2023",
    rating: 5, review: "Very thorough diagnostic.", amount: "SAR 180.00",
    initials: "FS", initialsColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 23, image: "/images/jr3.png", distance: "1.7 miles away",
    name: "Layla Mohammed", service: "Tire Rotation & Balance", serviceColor: "text-orange-500",
    scheduledDate: "Oct 18, 02:00 PM", car: "2020 Mazda CX-5 • Blue",
    status: "completed", progress: 100, avatars: ["/images/av4.png"],
    carImage: "/images/ca3.png", plateNumber: "LM-5050", carModel: "Mazda CX-5",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 18, 2023",
    rating: 4, review: "Good service, on time.", amount: "SAR 120.00",
    initials: "LM", initialsColor: "bg-red-100 text-red-600",
  },
  {
    id: 24, image: "/images/jr4.png", distance: "2.8 miles away",
    name: "Khalid Amin", service: "Battery Replacement", serviceColor: "text-blue-600",
    scheduledDate: "Oct 16, 09:30 AM", car: "2018 Jeep Wrangler • Orange",
    status: "completed", progress: 100, avatars: ["/images/av1.png"],
    carImage: "/images/ca4.png", plateNumber: "KA-4WD", carModel: "Jeep Wrangler",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 16, 2023",
    rating: 3, review: "Decent work, took longer than expected.", amount: "SAR 560.00",
    initials: "KA", initialsColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 25, image: "/images/jr1.png", distance: "0.6 miles away",
    name: "Nora Rahman", service: "Full Synthetic Oil Change", serviceColor: "text-blue-600",
    scheduledDate: "Oct 14, 11:00 AM", car: "2022 Volvo XC60 • Gray",
    status: "completed", progress: 100, avatars: ["/images/av2.png"],
    carImage: "/images/ca1.png", plateNumber: "NR-XC60", carModel: "Volvo XC60",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 14, 2023",
    rating: 5, review: "Excellent job, highly recommend.", amount: "SAR 350.00",
    initials: "NR", initialsColor: "bg-teal-100 text-teal-600",
  },
  {
    id: 26, image: "/images/jr2.png", distance: "3.1 miles away",
    name: "Basel Hamad", service: "Brake Pad Replacement", serviceColor: "text-orange-500",
    scheduledDate: "Oct 12, 08:00 AM", car: "2021 BMW X5 • Black",
    status: "completed", progress: 100, avatars: ["/images/av3.png"],
    carImage: "/images/ca2.png", plateNumber: "BH-X500", carModel: "BMW X5",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 12, 2023",
    rating: 4, review: "Solid work on the brakes.", amount: "SAR 820.00",
    initials: "BH", initialsColor: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 27, image: "/images/jr3.png", distance: "4.2 miles away",
    name: "Aisha Al-Qahtani", service: "Wheel Alignment", serviceColor: "text-blue-600",
    scheduledDate: "Oct 10, 01:00 PM", car: "2020 Toyota Prado • Silver",
    status: "completed", progress: 100, avatars: ["/images/av4.png"],
    carImage: "/images/ca3.png", plateNumber: "AQ-PRADO", carModel: "Toyota Prado",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 10, 2023",
    rating: 5, review: "Car drives perfectly now.", amount: "SAR 280.00",
    initials: "AQ", initialsColor: "bg-pink-100 text-pink-600",
  },
  {
    id: 28, image: "/images/jr4.png", distance: "1.3 miles away",
    name: "Tariq Hassan", service: "Radiator Flush", serviceColor: "text-orange-500",
    scheduledDate: "Oct 08, 10:00 AM", car: "2017 Dodge Charger • Black",
    status: "completed", progress: 100, avatars: ["/images/av1.png"],
    carImage: "/images/ca4.png", plateNumber: "TH-CHRG", carModel: "Dodge Charger",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 08, 2023",
    rating: 4, review: "Thorough job done.", amount: "SAR 320.00",
    initials: "TH", initialsColor: "bg-gray-100 text-gray-600",
  },
  {
    id: 29, image: "/images/jr1.png", distance: "2.0 miles away",
    name: "Hana Al-Mutairi", service: "Spark Plug Replacement", serviceColor: "text-blue-600",
    scheduledDate: "Oct 06, 09:00 AM", car: "2019 Lexus RX350 • White",
    status: "completed", progress: 100, avatars: ["/images/av2.png"],
    carImage: "/images/ca1.png", plateNumber: "HM-RX35", carModel: "Lexus RX350",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 06, 2023",
    rating: 5, review: "Engine running smooth now.", amount: "SAR 420.00",
    initials: "HM", initialsColor: "bg-pink-100 text-pink-600",
  },
  {
    id: 30, image: "/images/jr2.png", distance: "3.8 miles away",
    name: "Faisal Al-Rashid", service: "Full Engine Diagnostic", serviceColor: "text-orange-500",
    scheduledDate: "Oct 04, 11:00 AM", car: "2016 Range Rover Sport • Black",
    status: "completed", progress: 100, avatars: ["/images/av3.png"],
    carImage: "/images/ca2.png", plateNumber: "FR-RRS", carModel: "Range Rover Sport",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 04, 2023",
    rating: 4, review: "Found the issue quickly.", amount: "SAR 950.00",
    initials: "FR", initialsColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 31, image: "/images/jr3.png", distance: "1.6 miles away",
    name: "Noura Bin Laden", service: "AC System Recharge", serviceColor: "text-blue-600",
    scheduledDate: "Oct 02, 03:00 PM", car: "2022 Nissan Altima • Blue",
    status: "completed", progress: 100, avatars: ["/images/av4.png"],
    carImage: "/images/ca3.png", plateNumber: "NB-ALT", carModel: "Nissan Altima",
    pickupAddress: null, type: "inprogress", completedDate: "Oct 02, 2023",
    rating: 5, review: "Cold air again, thank you!", amount: "SAR 180.00",
    initials: "NB", initialsColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 32, image: "/images/jr4.png", distance: "0.7 miles away",
    name: "Ali Al-Ghamdi", service: "Suspension Check", serviceColor: "text-orange-500",
    scheduledDate: "Sep 30, 10:00 AM", car: "2018 Jeep Cherokee • Gray",
    status: "completed", progress: 100, avatars: ["/images/av1.png"],
    carImage: "/images/ca4.png", plateNumber: "AG-JCK", carModel: "Jeep Cherokee",
    pickupAddress: null, type: "inprogress", completedDate: "Sep 30, 2023",
    rating: 3, review: "Job done, a bit slow.", amount: "SAR 750.00",
    initials: "AG", initialsColor: "bg-green-100 text-green-600",
  },
];

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(initialJobs);

  const acceptJob = (id) => {
    setJobs((prev) =>
      prev.map((j) => j.id === id ? { ...j, status: "active", progress: 0 } : j)
    );
  };

  const declineJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const completeJob = (id) => {
    const now = new Date();
    const completedDate = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? { ...j, status: "completed", progress: 100, completedDate, rating: 5, review: "Job completed successfully." }
          : j
      )
    );
  };

  const updateProgress = (id, progress) => {
    setJobs((prev) =>
      prev.map((j) => j.id === id ? { ...j, progress } : j)
    );
  };

  const incomingJobs  = jobs.filter((j) => j.status === "incoming");
  const activeJobs    = jobs.filter((j) => j.status === "active");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  return (
    <JobsContext.Provider value={{
      jobs,
      incomingJobs,
      activeJobs,
      completedJobs,
      acceptJob,
      declineJob,
      completeJob,
      updateProgress,
    }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}