import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const whatsappNumber = "447355612987";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center gap-3 font-medium"
      title="Chat with us on WhatsApp"
      aria-label="Contact us on WhatsApp"
    >
      <span>Chat with us</span>
      <MessageCircle size={24} />
    </a>
  );
};
