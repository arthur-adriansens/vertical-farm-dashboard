import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards-powerData";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useMemo } from "react";

export default function Page({ powerdata }) {
    function getAverage(powerdata) {
        let amount = 0;
        let sum = 0;

        for (let data of powerdata) {
            if (data?.power) {
                amount++;
                sum += Number(data.power);
            }
        }

        return Math.round((sum / amount) * 10000) / 10000;
    }

    const averagePower = useMemo(() => {
        return getAverage(powerdata);
    }, []);

    console.log(averagePower);

    return (
        <SidebarProvider
            style={{
                "--header-height": "calc(var(--spacing) * 12)",
            }}
        >
            <AppSidebar variant="inset" selected_url={"/"} />
            <SidebarInset>
                <SiteHeader header_title={"Power Data"} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards averagePower={averagePower} />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive powerdata={powerdata} />
                            </div>
                            <DataTable data={powerdata} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
