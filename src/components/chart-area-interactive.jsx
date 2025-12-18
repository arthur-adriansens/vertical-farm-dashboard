"use client";

import { useState, useEffect, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "Interactieve grafiek.";

const chartConfig = {
    // vermogen: {
    //     label: "Vermogen",
    //     color: "var(--primary)",
    // },
    energie: {
        label: "Energie",
        color: "var(--primary)",
    },
};

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export function ChartAreaInteractive({ powerdata, energyData }) {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState("30d");

    useEffect(() => {
        if (isMobile) {
            setTimeRange("1d");
        }
    }, [isMobile]);

    if (!timeRange) {
        setTimeRange("30d"); // prevents from selecting nothing
    }

    // Bepaal startdag grafiek
    const referenceDate = new Date(); // vandaag
    let startDate = referenceDate;

    if (timeRange == "30d") {
        startDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1); // eerste dag van de maand
    } else if (timeRange == "7d") {
        startDate = getMonday(new Date()); // eerste dag van de week
    }

    startDate.setHours(0, 1);

    const totalWattPerDay = {}; // voor kWh te berkenen

    const filteredData = powerdata.filter((item) => {
        const date = new Date(item.date);

        if (!totalWattPerDay[date.getDate()]) totalWattPerDay[date.getDate()] = [0, 0];
        totalWattPerDay[date.getDate()][0] += Number(item.power);
        totalWattPerDay[date.getDate()][1] += 1;

        return date >= startDate;
    });

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Gemeten Verbruik (Watt)</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Alle waarden voor deze {timeRange == "30d" ? "maand" : timeRange == "7d" ? "week" : "dag"}
                    </span>
                    <span className="@[540px]/card:hidden">Last 3 months</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="30d">Deze maand</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Deze week</ToggleGroupItem>
                        <ToggleGroupItem value="1d">Vandaag</ToggleGroupItem>
                    </ToggleGroup>

                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Selecteer een optie"
                        >
                            <SelectValue placeholder="Deze maand" />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                            <SelectItem value="30d" className="rounded-lg">
                                Deze maand
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Deze week
                            </SelectItem>
                            <SelectItem value="1d" className="rounded-lg">
                                Vandaag
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillVermogen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-vermogen)" stopOpacity={1.0} />
                                <stop offset="95%" stopColor="var(--color-vermogen)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillEnergie" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-energie)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-energie)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />

                        <YAxis dataKey="power" width={32} tickLine={false} axisLine={false} tickMargin={8} type="number" />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("nl-BE", {
                                    month: "short",
                                    day: "numeric",
                                    hour: timeRange == "1d" ? "numeric" : undefined,
                                    minute: timeRange == "1d" ? "numeric" : undefined,
                                });
                            }}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(_, payload) => {
                                        const date = new Date(payload?.[0]?.payload?.date);

                                        return date.toLocaleDateString("nl-BE", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        });
                                    }}
                                    formatter={(value) => `${value} W`}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area dataKey="power" type="natural" fill="url(#fillEnergie)" stroke="var(--color-energie)" stackId="a" />
                        {/* <Area dataKey="current" type="natural" fill="url(#fillVermogen)" stroke="var(--color-vermogen)" stackId="a" /> */}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
