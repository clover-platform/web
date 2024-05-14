export type Language = {
    id: number;
    code: string;
    name: string;
}

export type LanguageWithCount = {
    totalEntry: number;
    translatedEntry: number;
    verifiedEntry: number;
} & Language;
