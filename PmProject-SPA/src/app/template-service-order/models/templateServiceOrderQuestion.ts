import { TemplateServiceOrder } from './templateServiceOrder';
import { TemplateServiceOrderAnswer } from './templateServiceOrderAnswer';

export class TemplateServiceOrderQuestion {
    id: string;
    name: string;
    templateServiceOrderId: string;
    templateServiceOrderAnswerId: number;
    templateServiceOrder: TemplateServiceOrder;
    templateServiceOrderAnswer: TemplateServiceOrderAnswer[];
}