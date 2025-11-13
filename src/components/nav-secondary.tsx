"use client";

import * as React from "react";

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DarkModeButton } from "@/components/dark-mode-button";

export function NavSecondary({ items, ...props }) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <a href={item.url} className={item.disabled !== undefined ? "cursor-not-allowed" : ""}>
                                <SidebarMenuButton disabled={item.disabled !== undefined} tooltip={item.title}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </a>
                        </SidebarMenuItem>
                    ))}

                    <DarkModeButton />
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
