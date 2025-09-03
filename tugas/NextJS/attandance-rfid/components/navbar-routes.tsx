"use client";
import { usePathname } from "next/navigation";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/");
  return (
    <div className="flex gap-x-2 ml-auto">
      {isAdmin ? (
        <Button size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          LogOut
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavbarRoutes;
