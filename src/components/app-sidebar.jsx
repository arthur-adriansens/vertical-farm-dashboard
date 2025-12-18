import { IconChartBar, IconDashboard, IconMoon, IconPlant, IconDroplets, IconPhoto, IconMessageExclamation, IconPalette } from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const data = {
    navMain: [
        {
            title: "Power Data",
            url: "/",
            icon: IconDashboard,
        },
        {
            title: "Galerij",
            url: "/gallery",
            icon: IconPhoto,
        },
        {
            title: "Problemen",
            url: "/problems",
            icon: IconMessageExclamation,
        },
        {
            title: "Overige Data",
            url: "#",
            icon: IconDroplets,
            disabled: true,
        },
        {
            title: "Analytics",
            url: "#",
            icon: IconChartBar,
            disabled: true,
        },
    ],
    navSecondary: [
        {
            title: "Kleur",
            url: "#",
            icon: IconPalette,
            disabled: true,
        },
    ],
};

export function AppSidebar({ selected_url, ...props }) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                            <a href="/">
                                <IconPlant className="size-5!" />
                                <span className="text-base font-semibold">Team 70</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} selected_url={selected_url} />
                {/* <NavDocuments items={data.documents} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            {/* <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter> */}
        </Sidebar>
    );
}
