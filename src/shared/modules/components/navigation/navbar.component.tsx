import { Search, Calendar, Mail, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeToggler } from '../theme/theme-toggler';
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';

async function NavbarComponent() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-2 ">
          <SidebarTrigger />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              
              className="w-full pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2">
       

          {/* Theme Toggler */}
          <ThemeToggler />

       

          {/* User Menu */}
          <Link href="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/profile.png" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavbarComponent;
