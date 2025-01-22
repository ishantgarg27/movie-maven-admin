import { Card } from "@/components/ui/card";
import { Film, Building2, Calendar, Users } from "lucide-react";

const stats = [
  {
    title: "Total Movies",
    value: "24",
    icon: Film,
    trend: "+12%",
  },
  {
    title: "Active Theaters",
    value: "8",
    icon: Building2,
    trend: "+3%",
  },
  {
    title: "Today's Shows",
    value: "32",
    icon: Calendar,
    trend: "+18%",
  },
  {
    title: "Monthly Bookings",
    value: "1,284",
    icon: Users,
    trend: "+22%",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back to your movie booking dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="stats-card">
            <div className="flex items-center justify-between">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-green-500">{stat.trend}</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="dashboard-card lg:col-span-4">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <p className="text-muted-foreground">Coming soon...</p>
        </Card>
        <Card className="dashboard-card lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Popular Movies</h3>
          <p className="text-muted-foreground">Coming soon...</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;