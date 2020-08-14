import { TemplateServiceOrder } from './templateServiceOrder';
import { TemplateServiceOrderAnswer } from './templateServiceOrderAnswer';

export class TemplateServiceOrderQuestion {
    id: string;
    name: string;
    templateServiceOrderId: string;
    templateServiceOrder: TemplateServiceOrder;
    templateServiceOrderAnswer: TemplateServiceOrderAnswer[];
}