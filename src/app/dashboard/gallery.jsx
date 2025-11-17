import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Calendar10 } from "@/components/calendar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
    return (
        <SidebarProvider
            style={{
                "--header-height": "calc(var(--spacing) * 12)",
            }}
        >
            <AppSidebar variant="inset" selected_url={"/gallery"} />
            <SidebarInset className="max-h-[calc(100vh-1rem)] overflow-hidden">
                <SiteHeader header_title={"Galerij"} />
                <div className="@container/main flex flex-1 flex-col gap-2 h-[calc(100%-3rem)]">
                    <div
                        className="px-4 lg:px-6 flex flex-col-reverse md:grid gap-4 lg:gap-6 py-4 md:gap-6 md:py-6 overflow-y-auto md:overflow-hidden max-h-full"
                        style={{ gridTemplateColumns: "minmax(250px, 1fr) auto" }}
                    >
                        <div
                            id="fixScrollbar"
                            className="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:shadow-xs md:overflow-y-auto pr-4 lg:pr-6"
                        >
                            {new Array(20).fill(0).map((image_url, i) => (
                                <Card className="@container/card pt-0 overflow-clip h-fit" key={i}>
                                    <img src="/plant.webp" />
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="text-muted-foreground">12/11/2025 - 21:34</div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <Calendar10 />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
