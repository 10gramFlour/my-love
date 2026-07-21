"use client";
import { useEffect, useState } from "react"; import { relationshipDuration, type Duration } from "@/lib/dates";
export function useRelationshipDuration(start: string) { const [duration, setDuration] = useState<Duration | null>(null); useEffect(() => { const update = () => setDuration(relationshipDuration(start, new Date())); update(); const id = window.setInterval(update, 50); return () => window.clearInterval(id); }, [start]); return duration; }
