import { Guid } from 'guid-typescript';
import { Photo } from './photo';

export interface User {
    id: string;
    username: string;
    knownAs: string;
    age: number;
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
    fullName: string;
    phoneNumber: string;
    roleId: number;
}
