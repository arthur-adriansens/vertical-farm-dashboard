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
    }, [powerdata]);

    // Bereken kWh en dan gemiddeld kWh
    const { averageEnergy, energyData } = useMemo(() => {
        const totalWattPerDay = {};
        const energyData = {};

        powerdata.forEach((item) => {
            const date = new Date(item.date);
            const day = date.getDate();

            if (!totalWattPerDay[day]) totalWattPerDay[day] = [0, 0];
            totalWattPerDay[day][0] += Number(item.power);
            totalWattPerDay[day][1] += 1;
        });

        for (let day in totalWattPerDay) {
            const [sum, count] = totalWattPerDay[day]; // som van vermogens en aantal waarden (van die dag)
            const averagePower = sum / count;
            // const intervalSeconds = 86400 / count; // interval (om de hoeveel seconden een waarde is): 86400s per dag / count ==> ongeveer elke 45 seconden

            const kWh = (averagePower * 24) / 1000;
            energyData[new Date(`${day} Dec 2025`)] = kWh;
        }

        const totalEnergy = Object.values(energyData).reduce((prev, next) => prev + next, 0);
        return { averageEnergy: totalEnergy / Object.keys(energyData).length, energyData };
    }, [powerdata]);

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
                            <SectionCards averagePower={averagePower} averageEnergy={averageEnergy} />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive powerdata={powerdata} energyData={energyData} />
                            </div>
                            <DataTable data={powerdata} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
