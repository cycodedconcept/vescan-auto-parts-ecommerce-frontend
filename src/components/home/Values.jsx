import { Truck, Banknote, Lock, Phone } from "lucide-react";

const Values = () => {
  const values = [
    {
      id: 1,
      icon: <Truck size={32} strokeWidth={1.5} />,
      title: "Free Shipping",
      subtitle: "Order above $200",
    },
    {
      id: 2,
      icon: <Banknote size={32} strokeWidth={1.5} />,
      title: "Money-back",
      subtitle: "30 days guarantee",
    },
    {
      id: 3,
      icon: <Lock size={32} strokeWidth={1.5} />,
      title: "Secure Payments",
      subtitle: "Secured by Stripe",
    },
    {
      id: 4,
      icon: <Phone size={32} strokeWidth={1.5} />,
      title: "24/7 Support",
      subtitle: "Phone and Email support",
    },
  ];

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {values.map((item) => (
          <div
            key={item.id}
            className="bg-[#F3F5F7] rounded-lg px-4 md:px-8 py-6 md:py-10 flex flex-col gap-4 items-start"
          >
            <div className="text-heading mb-2">{item.icon}</div>
            <div>
              <h3 className="font-heading text-lg font-medium text-heading mb-1">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
