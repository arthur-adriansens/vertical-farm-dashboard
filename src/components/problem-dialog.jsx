import * as React from "react";
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

    async function handleSubmit(e) {
        e.preventDefault();
        e.target.querySelector("button[type=submit]").disabled = true;
        const formData = new FormData(e.target);

        try {
            const response = await fetch("/api/postProblem", {
                method: "POST",
                body: formData,
            });

            if (response.body) {
                const body = await response.text();
                document.querySelector("#dialogDescription").innerHTML = body;
                document.getElementById("formFields").classList.add("hidden");

                setTimeout(
                    () => {
                        setOpen(false);
                        e.target.querySelector("button[type=submit]").disabled = false;
                        window.location.reload();
                    },
                    response.status == 201 ? "1000" : "2000"
                );
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setOpen(false);
            e.target.querySelector("button[type=submit]").disabled = false;
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                <form onSubmit={handleSubmit} style={{ display: "contents" }}>
                    <DialogHeader>
                        <DialogTitle>Rapporteer een probleem</DialogTitle>
                        <DialogDescription>
                            <span id="dialogDescription">
                                Hebt u iets vreemd opgemerkt in de data van de plant? Of een vreemde bug in de software? Rapporteer het dan hier aan
                                ons team.
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4" id="formFields">
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
                                    <SelectItem value="Ander">Ander</SelectItem>
                                </SelectContent>
                            </Select>

                            <input type="hidden" name="category" id="problemCategory" />
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
                </form>
            </DialogContent>
        </Dialog>
    );
}
