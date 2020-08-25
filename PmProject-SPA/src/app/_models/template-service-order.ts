import { TemplateServiceOrderQuestion } from './template-service-order-question';

export class TemplateServiceOrder {
    id: string;
    name: string;
    companyId: string;
    userId: string;
    templateServiceOrderQuestion: TemplateServiceOrderQuestion[];
}