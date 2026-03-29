import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => (
  <a
    href="https://wa.me/9647501234567"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 end-6 z-50 bg-success text-success-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
    aria-label="WhatsApp"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
