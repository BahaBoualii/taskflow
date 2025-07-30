import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { ListTodo } from "lucide-react";
import { config } from "../config/env";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">{config.appName}</span>
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
