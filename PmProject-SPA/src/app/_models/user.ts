import { Guid } from 'guid-typescript';
import { Photo } from './photo';

export interface User {
    id: Guid;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lokkingFor?: string;
    photos?: Photo[];
    companyId: string;
    roleId: number;
}
