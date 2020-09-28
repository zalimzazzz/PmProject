import { ServiceOrder } from './service-order';
import { TemplateServiceOrder } from './template-service-order';

export class Project {
    id: string;
    name: string;
    status: number;
    templateServiceOrderId: string;
    templateServiceOrde: TemplateServiceOrder;
    serviceOrder: Array<ServiceOrder>;
}