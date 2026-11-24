import { whatsappLink } from "@/data/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Blumark Industries, I'd like to know more about your equipment.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid size-13 place-items-center rounded-full bg-[#25d366] text-white shadow-lg hover:bg-[#1ebe5a] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
