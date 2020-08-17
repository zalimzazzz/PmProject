import { Project } from './project';
import { ServiceOrderQAndA } from './service-order-q-and-a';

export class ServiceOrder {
    id: string;
    serviceOrderNo: string;
    description: string;
    status: string;
    customerSignature: string;
    projectId: string;
    project: Project;
    technicianId: string;
    // technician: Technician;
    serviceOrderQAndA: ServiceOrderQAndA[];
}
