export type Todo = {
    id: number;
    name: string;
    dueto: Date;
    notes: string;
    priority: Priority;
    done: boolean;
}

export enum Priority {
    NONE = 'NONE',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}
