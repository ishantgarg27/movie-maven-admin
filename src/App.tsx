import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import Theaters from "./pages/Theaters";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard/*"
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="movies" element={<Movies />} />
                            <Route path="theaters" element={<Theaters />} />
                          </Routes>
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </div>
            </SidebarProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;