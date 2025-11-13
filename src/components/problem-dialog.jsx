import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { IconAlertTriangleFilled, IconMail } from "@tabler/icons-react";

import { SidebarMenuButton } from "@/components/ui/sidebar";

export const dialogEvents = new EventTarget();

export function ProblemDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const listener = () => setOpen(true);
        dialogEvents.addEventListener("open", listener);
        return () => dialogEvents.removeEventListener("open", listener);
    }, []);

    function updateSelectInput(value) {
        document.getElementById("problemCategory").value = value;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form action="/api/postProblem" method="post">
                <DialogTrigger asChild>
                    <SidebarMenuButton
                        tooltip="Rapporteer Probleem"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear cursor-pointer"
                    >
                        <IconAlertTriangleFilled />
                        <span>Rapporteer Probleem</span>
                    </SidebarMenuButton>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Rapporteer een probleem</DialogTitle>
                        <DialogDescription>
                            Hebt u iets vreemd opgemerkt in de data van de plant? Of een vreemde bug in de software? Rapporteer het dan hier aan ons
                            team.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Naam</Label>
                            <Input id="name-1" name="name" defaultValue="Anoniem" />
                        </div>

                        <div className="grid gap-3">
                            <Label>Soort probleem *</Label>
                            <Select onValueChange={updateSelectInput}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Kies een categorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Plant">Plant</SelectItem>
                                    <SelectItem value="Data">Data</SelectItem>
                                    <SelectItem value="Software">Software</SelectItem>
                                    <SelectItem value="Andere">Andere</SelectItem>
                                </SelectContent>
                            </Select>

                            <input type="hidden" name="problem-type" id="problemCategory" />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="discription-1">Beschrijving *</Label>
                            <Textarea id="discription-1" name="discription" placeholder="Beschrijf het probleem" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Annuleer</Button>
                        </DialogClose>
                        <Button type="submit">Verzenden</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
