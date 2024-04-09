export type Language = {
    id: number;
    code: string;
    name: string;
}

export type LanguageWithCount = {
    total: number;
    translated: number;
    verified: number;
} & Language;
