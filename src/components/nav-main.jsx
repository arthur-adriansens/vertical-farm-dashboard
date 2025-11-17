import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { ProblemDialog } from "@/components/problem-dialog";

export function NavMain({ items, selected_url }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ProblemDialog />
                        {/* <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
                            <IconMail />
                            <span className="sr-only">Inbox</span>
                        </Button> */}
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <a href={item.url || "#"} className={item.disabled !== undefined ? "cursor-not-allowed" : ""}>
                                <SidebarMenuButton
                                    isActive={selected_url == item.url}
                                    tooltip={item.title}
                                    disabled={item.disabled !== undefined}
                                    className={"cursor-pointer"}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </a>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
