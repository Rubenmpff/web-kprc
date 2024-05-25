export interface Budget {

    id: number;
    description: string;
    totalValue: number;
    validUntil: Date;
    status: BudgetStatus;
    projectId: number;

  }

  export enum BudgetStatus {

    Pending = 'Pending', // Pendente
    Sent = 'Sent',       // Enviado
    Approved = 'Approved', // Aprovado
    Rejected = 'Rejected'  // Rejeitado
    
  }