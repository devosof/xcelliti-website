import { Link, useLocation } from "wouter";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/careers", label: "Careers" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

function Navigation() {
  const isMobile = useIsMobile();
  const [location] = useLocation();

  const NavLinks = () => (
    <>
      {navItems.map(({ path, label }) => (
        isMobile ? (
          <Button
            key={path}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              location === path && "text-primary font-semibold"
            )}
            asChild
          >
            <Link href={path}>{label}</Link>
          </Button>
        ) : (
          <NavigationMenuItem key={path}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                location === path && "text-primary font-semibold"
              )}
              onClick={() => window.location.href = path}
            >
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Xcelliti</span>
          </Link>

          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavLinks />
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <nav className="flex flex-col gap-2 mt-6">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;