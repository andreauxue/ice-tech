import { User, Bell } from "lucide-react";

export function Navbar() {
  return (
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2.5">
        <img src="/icetech.png" alt="IceTech" className="h-8 w-auto" />
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2 ml-1 pl-3 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-foreground hidden sm:block">Admin</span>
        </div>
      </div>
    </div>
  );
}