"use client";

import { X, Eye, EyeOff } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/app/lib/tailwind_utils";
import { Button } from "@/app/components/ui/button/Button";
import { IconButton } from "@/app/components/ui/button/IconButton";
import { Select } from "@/app/components/ui/select/Select";
import { useEditTicketForm } from "./hooks/useEditTicketForm";
import { useEditTicket } from "./hooks/useEditTicket";
import {
  priorityOptions,
  statusOptions,
  type UpdateTicketFormData,
} from "./updateTicketSchema";
import { type Ticket } from "../table/types";

// =====================
// Modal Overlay
// =====================
type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function ModalOverlay({ isOpen, onClose, children }: ModalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={cn(
        "fixed inset-0 z-50",
        "bg-dark-1000/80 backdrop-blur-sm",
        "flex items-center justify-center p-4",
        "animate-in fade-in duration-200"
      )}
    >
      {children}
    </div>
  );
}

// =====================
// Modal Container
// =====================
type ModalContainerProps = {
  children: ReactNode;
  className?: string;
};

function ModalContainer({ children, className }: ModalContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-lg",
        "bg-dark-900/95 backdrop-blur-xl",
        "border border-white/10",
        "rounded-2xl",
        "shadow-2xl shadow-black/50",
        "animate-in zoom-in-95 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

// =====================
// Modal Header
// =====================
type ModalHeaderProps = {
  title: string;
  onClose: () => void;
  onToggleViewMode?: () => void;
  isViewMode?: boolean;
};

function ModalHeader({
  title,
  onClose,
  onToggleViewMode,
  isViewMode,
}: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/10">
      <h2 className="text-xl font-semibold text-light">{title}</h2>
      <div className="flex items-center gap-2">
        {onToggleViewMode && (
          <IconButton
            icon={isViewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            variant="ghost"
            onClick={onToggleViewMode}
            aria-label={isViewMode ? "Sair do modo visualização" : "Modo visualização"}
          />
        )}
        <IconButton
          icon={<X className="w-5 h-5" />}
          variant="ghost"
          onClick={onClose}
          aria-label="Fechar modal"
        />
      </div>
    </div>
  );
}

// =====================
// Custom Input Field (rounded)
// =====================
type RoundedInputFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
};

function RoundedInputField({
  id,
  label,
  value,
  error,
  type = "text",
  disabled = false,
  ...props
}: RoundedInputFieldProps) {
  const hasValue = value?.length > 0;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "relative flex items-center",
          "bg-transparent border rounded-xl",
          "transition-colors duration-200",
          disabled && "opacity-60 cursor-not-allowed",
          hasError ? "border-error" : "border-light/20 focus-within:border-primary"
        )}
      >
        {hasValue && (
          <label
            htmlFor={id}
            className="absolute left-4 top-1.5 text-xs text-light/60"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          value={value}
          placeholder={hasValue ? "" : label}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent text-light placeholder-light/40",
            "py-3 px-4 outline-none rounded-xl",
            "transition-colors duration-200",
            hasValue && "pt-6 pb-2",
            hasError && "text-error",
            disabled && "cursor-not-allowed"
          )}
          {...props}
        />
      </div>
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
}

// =====================
// Textarea Field
// =====================
type TextareaFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  rows?: number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  disabled?: boolean;
};

function TextareaField({
  id,
  label,
  value,
  error,
  rows = 4,
  placeholder,
  disabled = false,
  ...props
}: TextareaFieldProps) {
  const hasValue = value?.length > 0;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "relative",
          "bg-transparent border rounded-xl",
          "transition-colors duration-200",
          disabled && "opacity-60 cursor-not-allowed",
          hasError ? "border-error" : "border-light/20 focus-within:border-primary"
        )}
      >
        {hasValue && (
          <label
            htmlFor={id}
            className="absolute left-4 top-2 text-xs text-light/60"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          value={value}
          rows={rows}
          placeholder={hasValue ? "" : (placeholder || label)}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent text-light placeholder-light/40",
            "py-3 px-4 outline-none rounded-xl resize-none",
            "transition-colors duration-200",
            hasValue && "pt-6 pb-2",
            hasError && "text-error",
            disabled && "cursor-not-allowed"
          )}
          {...props}
        />
      </div>
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
}

// =====================
// Main Modal Component
// =====================
type EditTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
  ticket: Ticket | null;
  isViewMode?: boolean;
  onToggleViewMode?: () => void;
  responsaveis: string[];
};

export function EditTicketModal({
  isOpen,
  onClose,
  onSuccess,
  ticket,
  isViewMode = false,
  onToggleViewMode,
  responsaveis,
}: EditTicketModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    isPending,
    resetForm,
  } = useEditTicketForm({ ticket });

  const { handleUpdateTicket } = useEditTicket({
    ticketId: ticket?.id || "",
    onSuccess: async () => {
      resetForm();
      await onSuccess?.();
      onClose();
    },
  });

  const onSubmit = (data: UpdateTicketFormData) => {
    handleUpdateTicket(data);
  };

  const clientValue = watch("client");
  const emailValue = watch("email");
  const priorityValue = watch("priority");
  const responsibleValue = watch("responsible");
  const subjectValue = watch("subject");
  const statusValue = watch("status");

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const responsaveisOptions = responsaveis.map((r) => ({ value: r, label: r }));

  if (!ticket) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader
          title={isViewMode ? "Visualizar Ticket" : "Editar Ticket"}
          onClose={handleClose}
          onToggleViewMode={onToggleViewMode}
          isViewMode={isViewMode}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <RoundedInputField
            id="client"
            label="Nome do cliente*"
            value={clientValue}
            error={errors.client?.message}
            disabled={isViewMode}
            {...register("client")}
          />

          <RoundedInputField
            id="email"
            label="Email*"
            type="email"
            value={emailValue}
            error={errors.email?.message}
            disabled={isViewMode}
            {...register("email")}
          />

          <Select
            id="priority"
            label="Prioridade*"
            value={priorityValue}
            onChange={(value) => setValue("priority", value, { shouldValidate: true })}
            options={priorityOptions}
            error={errors.priority?.message}
            placeholder="Selecione a nível de urgência de atendimento"
            disabled={isViewMode}
          />

          <Select
            id="status"
            label="Status*"
            value={statusValue}
            onChange={(value) => setValue("status", value, { shouldValidate: true })}
            options={statusOptions}
            error={errors.status?.message}
            placeholder="Selecione o status do ticket"
            disabled={isViewMode}
          />

          <Select
            id="responsible"
            label="Responsável*"
            value={responsibleValue}
            onChange={(value) => setValue("responsible", value, { shouldValidate: true })}
            options={responsaveisOptions}
            error={errors.responsible?.message}
            placeholder="Quem será o responsável por esse ticket"
            disabled={isViewMode}
          />

          <TextareaField
            id="subject"
            label="Assunto*"
            value={subjectValue}
            error={errors.subject?.message}
            placeholder="Resumo breve do problema ou solicitação"
            rows={3}
            disabled={isViewMode}
            {...register("subject")}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
            >
              {isViewMode ? "Fechar" : "Cancelar"}
            </Button>
            {!isViewMode && (
              <Button
                type="submit"
                variant="primary"
                loading={isPending}
                className="shadow-[0_0_20px_rgba(24,118,210,0.6)] hover:shadow-[0_0_25px_rgba(24,118,210,0.8)] transition-shadow duration-300"
              >
                Salvar
              </Button>
            )}
          </div>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}
