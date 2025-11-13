import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { IconCloud } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

import { dialogEvents } from "@/components/problem-dialog";

export default function Page() {
    const problems = new Array(0).fill(0); // db call...

    return (
        <SidebarProvider
            style={{
                "--header-height": "calc(var(--spacing) * 12)",
            }}
        >
            <AppSidebar variant="inset" selected_url={"/problems"} />
            <SidebarInset className="max-h-[calc(100vh-1rem)] overflow-hidden">
                <SiteHeader header_title={"Problemen"} />
                {problems?.length > 0 ? (
                    <div className="@container/main flex flex-1 flex-col gap-2 h-[calc(100%-3rem)]">
                        <div
                            className="px-4 lg:px-6 grid gap-4 lg:gap-6 py-4 md:gap-6 md:py-6 overflow-hidden max-h-full"
                            style={{ gridTemplateColumns: "minmax(250px, 1fr) auto" }}
                        >
                            <div
                                id="fixScrollbar"
                                className="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:shadow-xs overflow-y-auto pr-4 lg:pr-6"
                            >
                                {problems.map((card, i) => (
                                    <Card className="@container/card pt-0 overflow-clip h-fit" key={i}>
                                        <img src="/plant.webp" />
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                            <div className="text-muted-foreground">12/11/2025 - 21:34</div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="@container/main flex items-center justify-center gap-2 h-full">
                        <Empty className="border border-dashed flex-none">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <IconCloud />
                                </EmptyMedia>
                                <EmptyTitle>Geen Problemen</EmptyTitle>
                                <EmptyDescription>Momenteel ondervindt ons team geen problemen. Alles loopt volgens verwacht.</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button variant="outline" size="sm" onClick={() => dialogEvents.dispatchEvent(new Event("open"))}>
                                    Rapporteer een probleem
                                </Button>
                            </EmptyContent>
                        </Empty>
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}
