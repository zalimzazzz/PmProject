import { TemplateServiceOrderQuestion } from './templateServiceOrderQuestion';

export class TemplateServiceOrder {
    id: string;
    name: string;
    companyId: string;
    templateServiceOrderQuestion: TemplateServiceOrderQuestion[];
}