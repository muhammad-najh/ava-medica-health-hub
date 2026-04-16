import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import Lab from "./pages/Lab";
import Appointment from "./pages/Appointment";
import Events from "./pages/Events";
import PatientPortal from "./pages/PatientPortal";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/events" element={<Events />} />
              <Route path="/patient-portal" element={<PatientPortal />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
