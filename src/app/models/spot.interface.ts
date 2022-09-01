export interface Spot {
    id: number;
    name: string;
    description: string;
    category: Category;
    address: string;
    phones: Phone[];
    latitude: string;
    longitude: string;
    images: string[];
    valoration: Valoration;
    comments: Comment[];
    priority?: {
        value: number
    },
    checked?: boolean;
    disabled?: boolean;
}

interface Phone {
    number: string;
}

interface Valoration {
    users: number;
    rating: number;
}

interface Category {
    id: number;
    name: string;
    description: string;
}