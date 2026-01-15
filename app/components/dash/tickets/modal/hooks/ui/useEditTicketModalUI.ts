"use client";

import { useState, useCallback } from "react";
import { type Ticket } from "@/app/components/dash/tickets/table/types";

export function useEditTicketModalUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const openModal = useCallback((ticket: Ticket, viewMode: boolean = false) => {
    setSelectedTicket(ticket);
    setIsViewMode(viewMode);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setIsViewMode(false);
    setSelectedTicket(null);
  }, []);

  const toggleViewMode = useCallback(() => {
    setIsViewMode((prev) => !prev);
  }, []);

  return {
    isOpen,
    isViewMode,
    selectedTicket,
    openModal,
    closeModal,
    toggleViewMode,
  };
}
