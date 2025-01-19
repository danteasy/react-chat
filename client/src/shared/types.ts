export type TChatMessage = {
    id: number;
    name: string;
    message: string;
    date: number;
};

export type TActiveUser = {
    id: number | string;
    name: string;
};

export type typingUser = Pick<TActiveUser, "id" | "name">;
