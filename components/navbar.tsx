import Link from "next/link";
import Profile from "./profile";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className=" font-bold inline-block">frontpage</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
            >
              Documentation
            </Link>
          </nav>
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
