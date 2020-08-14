import { TemplateServiceOrderQuestion } from './template-service-order-question';

export class TemplateServiceOrderAnswer {
    id: string;
    answer: string;
    templateServiceOrderQuestionId: string;
    templateServiceOrderQuestion: TemplateServiceOrderQuestion;
}