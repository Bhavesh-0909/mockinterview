import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex flex-col justify-center space-y-4 pr-5">
      <h1 className="text-md scroll-m-20 tracking-tight text-accent-foreground ml-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground ml-1">Welcome, {user.fullname || user.email}!</p>
      <div className="flex items-center w-full gap-2">
        <img src={user.avatarlink} alt="User Avatar" className="h-16 object-cover bg-secondary w-16 rounded-full" />
        <div className="flex flex-col justify-between space-y-1">
          <h3 className="text-lg scroll-m-20 text-center text-balance font-bold tracking-tight uppercase">{user.fullname || user.email}</h3>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard