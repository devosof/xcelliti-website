import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { navItems } from "./navigation";

function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Xcelliti</h3>
            <p className="text-sm text-muted-foreground">
              Transforming businesses through innovative technology solutions
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: info@xcelliti.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Location: Silicon Valley, CA</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Xcelliti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;