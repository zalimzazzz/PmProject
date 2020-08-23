import { ServiceOrder } from './service-order';

export class ServiceOrderImage {
    id: string;
    imagePath: string;
    serviceOrderId: string;
    serviceOrder: ServiceOrder;
}