import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookCheck, Eye, Gavel, Key, LayoutGrid, ShieldAlert, User, UserCheck, UserX } from 'lucide-react';
import AppLogo from './app-logo';
import { can } from '@/utils/permission';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        can('show-user', auth) && {
            title: 'Users',
            href: '/user',
            icon: User,
        },
        can('show-permission', auth) && {
            title: 'Permission',
            href: '/permission',
            icon: Key,
        },
        can('show-role', auth) && {
            title: 'Role',
            href: '/role',
            icon: ShieldAlert,
        },
        can('show-kasus', auth) && {
            title: 'Kasus',
            href: '/kasus',
            icon: Gavel,
        },
        can('show-pelaku', auth) && {
            title: 'Pelaku',
            href: '/pelaku',
            icon: UserX,
        },
        can('show-pasal', auth) && {
            title: 'Pasal',
            href: '/pasal',
            icon: BookCheck,
        },
        can('show-saksi', auth) && {
            title: 'Saksi',
            href: '/saksi',
            icon: Eye,
        },
        can('show-anggota', auth) && {
            title: 'Anggota',
            href: '/anggota',
            icon: UserCheck,
        },
    ].filter(Boolean) as NavItem[];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
