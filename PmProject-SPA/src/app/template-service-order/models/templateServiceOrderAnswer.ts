import { TemplateServiceOrderQuestion } from './templateServiceOrderQuestion';

export class TemplateServiceOrderAnswer {
    id: string;
    answer: string;
    templateServiceOrderQuestionId: string;
    templateServiceOrderQuestion: TemplateServiceOrderQuestion;
}