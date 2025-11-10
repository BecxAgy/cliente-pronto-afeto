'use client';

import * as React from 'react';
import {
  GalleryVerticalEnd,
  LogOut,
  PieChart,
  SquareTerminal,
  Users2,
  UserSquare2,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/src/shared/modules/components/ui/sidebar';
import { TeamSwitcher } from './team-switcher';
import { NavMain } from './nav-main';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Pronto Afeto',
      logo: GalleryVerticalEnd,
      plan: 'Cliente',
    },
  ],
  navMain: [
    {
      title: 'Propostas',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Ver Todas',
          url: '/proposal/all',
        },
        {
          title: 'Solicitar',
          url: '/proposal/request',
        },
      ],
    },

    {
      title: 'Cuidados',
      url: '#',
      icon: Users2,
      items: [
        {
          title: 'Adicionar',
          url: '/care/add',
        },
        {
          title: 'Ver todos',
          url: '/care/all',
        },
      ],
    },
  ],
  navLinks: [
    {
      name: 'Home',
      url: '/',
      icon: PieChart,
    },
    {
      name: 'Meu Perfil',
      url: '/profile',
      icon: UserSquare2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} links={data.navLinks} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem key={'logout'}>
          <SidebarMenuButton className="hover:text-destructive">
            <LogOut />
            <span>Sair</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
