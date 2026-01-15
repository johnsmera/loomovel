"use client";

import { useState, useCallback } from "react";

type UseCreateTicketModalUIReturn = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export function useCreateTicketModalUI(): UseCreateTicketModalUIReturn {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}
