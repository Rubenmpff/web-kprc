export interface Project {

    id: number;
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: Date;
    estimatedEndDate?: Date;
    clientId: number;
    budgetIds: number[];

  }
  export enum ProjectStatus {

    Planning = "Planning",
    InProgress = "InProgress",
    Completed = "Completed",
    Canceled = "Canceled"
    
  }