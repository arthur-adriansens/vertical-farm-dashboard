import * as React from "react";
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
            url: "#",
            icon: IconDashboard,
        },
        {
            title: "Overige Data",
            url: "#",
            icon: IconDroplets,
        },
        {
            title: "Foto's",
            url: "#",
            icon: IconPhoto,
        },
        {
            title: "Problemen",
            url: "#",
            icon: IconMessageExclamation,
        },
        {
            title: "Analytics",
            url: "#",
            icon: IconChartBar,
        },
    ],
    navSecondary: [
        {
            title: "Kleur",
            url: "#",
            icon: IconPalette,
        },
        {
            title: "Donkere Modus",
            url: "#",
            icon: IconMoon,
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                            <a href="#">
                                <IconPlant className="size-5!" />
                                <span className="text-base font-semibold">Team 70</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            {/* <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter> */}
        </Sidebar>
    );
}
