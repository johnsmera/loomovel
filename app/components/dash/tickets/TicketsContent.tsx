"use client";

import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button/Button";
import { PageHeader } from "@/app/components/ui/page-header/PageHeader";
import { TicketsKpiCards } from "./kpi/TicketsKpiCards";
import { TicketsTable } from "./table/TicketsTable";
import { useTicketsTableUI } from "./table/hooks/ui/useTicketsTableUI";
import { useTicketsData } from "./hooks/useTicketsData";
import { TicketsSkeleton } from "./TicketsSkeleton";
import { type Ticket } from "./table/types";
import { CreateTicketModal } from "./modal/CreateTicketModal";
import { useCreateTicketModalUI } from "./modal/hooks/ui/useCreateTicketModalUI";
import { EditTicketModal } from "./modal/EditTicketModal";
import { useEditTicketModalUI } from "./modal/hooks/ui/useEditTicketModalUI";

function calculateKpiData(tickets: Ticket[]) {
  const ticketsAbertos = tickets.filter((t) => t.status === "aberto").length;
  const emAndamento = tickets.filter((t) => t.status === "em_andamento").length;
  const resolvidosHoje = tickets.filter((t) => t.status === "resolvido").length;
  const fechados = tickets.filter((t) => t.status === "fechado").length;

  return {
    ticketsAbertos,
    emAndamento,
    resolvidosHoje: resolvidosHoje + fechados,
    tempoMedio: "2.5h", // Valor fixo - pode ser calculado quando API fornecer
  };
}

export function TicketsContent() {
  const { tickets, responsaveis, isLoading, error, refetch } = useTicketsData();
  const { isOpen, openModal, closeModal } = useCreateTicketModalUI();
  const {
    isOpen: isEditModalOpen,
    isViewMode,
    selectedTicket,
    openModal: openEditModal,
    closeModal: closeEditModal,
    toggleViewMode,
  } = useEditTicketModalUI();

  const {
    filters,
    setSearch,
    setFilters,
    pagination,
    setPage,
    paginatedTickets,
    columns,
  } = useTicketsTableUI({
    tickets,
    responsaveis,
  });

  const kpiData = calculateKpiData(tickets);

  const handleEdit = (ticket: Ticket) => {
    openEditModal(ticket, false);
  };

  const handleView = (ticket: Ticket) => {
    openEditModal(ticket, true);
  };

  const handleToggleViewMode = () => {
    toggleViewMode();
  };

  const handleTicketUpdated = async () => {
    await refetch();
  };

  const handleTicketCreated = async () => {
    await refetch();
  };

  if (isLoading) {
    return <TicketsSkeleton />;
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Erro ao carregar tickets
          </h2>
          <p className="text-red-300/80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <PageHeader>
        <PageHeader.Title>Gestão de Tickets</PageHeader.Title>
        <PageHeader.Actions>
          <Button
            size="sm"
            onClick={openModal}
            className="flex items-center gap-2 shadow-[0_0_20px_rgba(24,118,210,0.6)] hover:shadow-[0_0_25px_rgba(24,118,210,0.8)] transition-shadow duration-300"
          >
            <Plus className="w-4 h-4" />
            Novo Ticket
          </Button>
        </PageHeader.Actions>
      </PageHeader>

      {/* Modal de Criação de Ticket */}
      <CreateTicketModal
        isOpen={isOpen}
        onClose={closeModal}
        onSuccess={handleTicketCreated}
        responsaveis={responsaveis}
      />

      {/* Modal de Edição/Visualização de Ticket */}
      <EditTicketModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSuccess={handleTicketUpdated}
        ticket={selectedTicket}
        isViewMode={isViewMode}
        onToggleViewMode={handleToggleViewMode}
        responsaveis={responsaveis}
      />

      <div className="py-8 pt-24 space-y-8">
        {/* KPI Cards */}
        <TicketsKpiCards data={kpiData} />

        {/* Tabela de Tickets */}
        <TicketsTable>
          <TicketsTable.Toolbar>
            <div className="flex flex-col gap-4 w-full">
              <TicketsTable.Title>Lista de Tickets</TicketsTable.Title>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="lg:col-span-6">
                  <TicketsTable.Search
                    value={filters.search}
                    onChange={setSearch}
                  />
                </div>
                <div className="lg:col-span-6">
                  <TicketsTable.Filters
                    filters={filters}
                    onFiltersChange={setFilters}
                    responsaveis={responsaveis}
                  />
                </div>
              </div>
            </div>
          </TicketsTable.Toolbar>

          <TicketsTable.Body>
            <TicketsTable.Header columns={columns} />

            {paginatedTickets.length > 0 ? (
              paginatedTickets.map((ticket) => (
                <TicketsTable.Row
                  key={ticket.ticketId}
                  ticket={ticket}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))
            ) : (
              <TicketsTable.Empty />
            )}
          </TicketsTable.Body>

          <TicketsTable.Pagination
            pagination={pagination}
            onPageChange={setPage}
          />
        </TicketsTable>
      </div>
    </>
  );
}
