import { TemplateServiceOrder } from './template-service-order';
import { TemplateServiceOrderAnswer } from './template-service-order-answer';

export class TemplateServiceOrderQuestion {
    id: string;
    name: string;
    no: number
    _answerTypeId: number;
    // templateServiceOrderAnswerId: number;
    templateServiceOrder: TemplateServiceOrder;
    templateServiceOrderAnswer: TemplateServiceOrderAnswer[];

    get answerTypeId(): string {
        return '' + this._answerTypeId;
    }
    set answerTypeId(val) {
        this._answerTypeId = +val;
    }
}