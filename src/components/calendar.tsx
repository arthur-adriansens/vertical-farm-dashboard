"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Calendar10() {
    const [isMounted, setIsMounted] = React.useState(false);
    const [date, setDate] = React.useState(undefined);
    const [month, setMonth] = React.useState(undefined);

    const scrappedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 11 - 1, 13 + i));

    // Initialize state only on client to prevent hydration mismatch
    React.useEffect(() => {
        setDate(new Date(2025, 5, 12));
        setMonth(new Date());
        setIsMounted(true);
    }, []);

    // Don't render until client is mounted
    if (!isMounted) {
        return (
            <Card className="w-[273px]">
                <CardHeader>
                    <CardTitle>Foto's</CardTitle>
                    <CardDescription>Selecteer een datum</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Temporary calendar skeleton */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {/* Weekday headers */}
                            {[...Array(7)].map((_, i) => (
                                <div key={`header-${i}`} className="h-8 bg-muted rounded animate-pulse" />
                            ))}

                            {/* Calendar days */}
                            {[...Array(35)].map((_, i) => (
                                <div key={`day-${i}`} className="h-8 bg-muted rounded animate-pulse" />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Foto's</CardTitle>
                <CardDescription>Selecteer een datum</CardDescription>
                <CardAction>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setMonth(new Date());
                            setDate(new Date());
                        }}
                    >
                        Vandaag
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent>
                <Calendar
                    mode="single"
                    month={month}
                    disabled={scrappedDates}
                    modifiers={{
                        scrapped: scrappedDates,
                    }}
                    modifiersClassNames={{
                        scrapped: "[&>button]:line-through opacity-100",
                    }}
                    onMonthChange={setMonth}
                    selected={date}
                    onSelect={setDate}
                    className="bg-transparent p-0 mx-auto md:mx-0"
                />
            </CardContent>
        </Card>
    );
}
