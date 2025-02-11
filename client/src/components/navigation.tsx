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
import { motion } from "framer-motion";

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/careers", label: "Careers" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const MotionLink = motion(Link);

function Navigation() {
  const isMobile = useIsMobile();
  const [location] = useLocation();

  const NavLinks = () => (
    <>
      {navItems.map(({ path, label }) => (
        isMobile ? (
          <MotionLink
            key={path}
            href={path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                location === path && "bg-primary/10 text-primary font-semibold"
              )}
            >
              {label}
            </Button>
          </MotionLink>
        ) : (
          <NavigationMenuItem key={path}>
            <Link href={path}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "transition-colors duration-300",
                  location === path 
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-primary/5"
                )}
              >
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )
      ))}
    </>
  );

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Xcelliti
            </span>
          </Link>

          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavLinks />
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </motion.div>

        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <nav className="flex flex-col gap-2 mt-6">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}

export default Navigation;