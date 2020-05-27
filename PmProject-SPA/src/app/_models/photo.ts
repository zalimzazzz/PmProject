import { Guid } from 'guid-typescript';

export interface Photo {
    id: Guid;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
}
