import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";

import { IconCloud, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

import { dialogEvents } from "@/components/problem-dialog";

export default function Page({ problems }) {
    async function removeProblem(event, problemIndex) {
        const problem = problems[problemIndex];
        if (!problem?.id) return;

        event.target.disabled = true;

        try {
            const response = await fetch("/api/removeProblem", {
                method: "DELETE",
                body: JSON.stringify({ id: problem.id }),
            });

            if (response.body) {
                const body = await response.text();
                console.log(body);
                event.target.remove();
                window.location.reload();
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

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
                                    <Card className="@container/card" key={i}>
                                        <CardHeader>
                                            <CardTitle>{card.category} Probleem</CardTitle>
                                            <CardDescription>{card.name}</CardDescription>
                                            <CardAction>
                                                <Button variant="outline" size="sm" onClick={(event) => removeProblem(event, i)}>
                                                    <IconCheck />
                                                    Verwijder probleem
                                                </Button>
                                            </CardAction>
                                        </CardHeader>

                                        <CardContent>{card.discription}</CardContent>

                                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                            <div className="text-muted-foreground capitalize">
                                                {new Date(card.added).toLocaleString("nl-NL", {
                                                    weekday: "short",
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                    timeZoneName: "shortOffset",
                                                })}
                                            </div>
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
                                <EmptyDescription>Momenteel ondervindt ons team geen problemen. Alles loopt zoals verwacht.</EmptyDescription>
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
