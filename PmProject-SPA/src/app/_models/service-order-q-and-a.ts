import { ServiceOrder } from './service-order';

export class ServiceOrderQAndA {
    id: string;
    serviceOrderId: string;
    serviceOrder: ServiceOrder;
    answerTypeId: number;
    answer: string;
    questionId: string;
}