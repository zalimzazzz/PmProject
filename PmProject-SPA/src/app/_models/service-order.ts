import { Project } from './project';
import { ServiceOrderQAndA } from './service-order-q-and-a';

export class ServiceOrder {
}

export interface ServiceOrder {
    id: string;
    serviceOrderNo: string;
    description: string;
    status: string;
    customerSignature: number;
    projectId: string;
    project: Project;
    technicianId: string;
    // technician: Technician;
    serviceOrderQAndA: ServiceOrderQAndA[];
}
