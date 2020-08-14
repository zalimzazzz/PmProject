import { TemplateServiceOrder } from './template-service-order';
import { TemplateServiceOrderAnswer } from './template-service-order-answer';

export class TemplateServiceOrderQuestion {
    id: string;
    name: string;
    templateServiceOrderId: string;
    templateServiceOrderAnswerId: number;
    templateServiceOrder: TemplateServiceOrder;
    templateServiceOrderAnswer: TemplateServiceOrderAnswer[];
}