"use client";

import { useState, useEffect } from "react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { IconSunMoon, IconSun, IconMoon } from "@tabler/icons-react";

const stages = ["Automatisch", "Donkere Modus", "Lichte Modus"];
const icons = [IconSunMoon, IconSun, IconMoon];

export function DarkModeButton({ ...props }) {
    const [isMounted, setIsMounted] = useState(false);
    const [stage_index, setStage] = useState(0);
    const [Icon, setIcon] = useState(icons[0]);

    // Initialize state only on client to prevent hydration mismatch
    useEffect(() => {
        // setStage(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 2);
        setStage(localStorage.getItem("theme") === "dark" ? 1 : localStorage.getItem("theme") === "light" ? 2 : 0);
        setIsMounted(true);
    }, []);

    function changeButton() {
        const newIndex = stage_index < stages.length - 1 ? stage_index + 1 : 0;
        setIcon(icons[newIndex]);
        setStage(newIndex);

        const newTheme = newIndex == 0 ? "" : newIndex == 1 ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        if (newTheme !== "") {
            document.documentElement.classList.toggle("dark", newTheme == "dark");
        } else {
            document.documentElement.classList.add(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        }
    }

    // Don't render until client is mounted
    if (!isMounted) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <Icon />
                    <span>{stages[stage_index]}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={changeButton}>
                <Icon />
                <span>{stages[stage_index]}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
