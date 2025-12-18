import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards({ averagePower, averageEnergy }) {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Gemiddeld Vermogen</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{averagePower} W</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Stijgt deze maand <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Gemmiddeld vermogen deze maand</div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Gemiddelde Energie</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{averageEnergy.toFixed(4)} kWh</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        20% gedaald deze periode <IconTrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Gemiddeld verbruik deze maand</div>
                </CardFooter>
            </Card>
        </div>
    );
}
