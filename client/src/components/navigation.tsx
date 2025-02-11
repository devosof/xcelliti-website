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
        <NavigationMenuItem key={path}>
          <Link href={path}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={location === path}
            >
              {label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Xcelliti</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <NavigationMenu className="ml-auto">
            <NavigationMenuList>
              <NavLinks />
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </header>
  );
}

export default Navigation;