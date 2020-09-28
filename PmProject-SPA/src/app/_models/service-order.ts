import { Project } from './project';
import { ServiceOrderQAndA } from './service-order-q-and-a';
import { ServiceOrderImage } from './service-order-image';

export class ServiceOrder {
    id: string;
    serviceOrderNo: string;
    description: string;
    status: number;
    customerSignature: string;
    projectId: string;
    project: Project;
    userId: string;
    // technician: Technician;
    serviceOrderQAndA: ServiceOrderQAndA[];
    serviceOrderImage: ServiceOrderImage[];
}
