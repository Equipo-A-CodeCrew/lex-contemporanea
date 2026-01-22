export interface BoeResponse {
    status: {
        code: string;
        text: string;
    };
    data: {
        summary: Summary;
    };
}

export interface Summary {
    metadata: {
        publication: string;
        publicationDate: string;
    };
    daily: Daily[];
}

export interface Daily {
    number: string;
    dailySummary: {
        identifier: string;
        pdfUrl: { text: string; szBytes: string; szKBytes: string };
    };
    sections: Section[];
}

export interface Section {
    code: string;
    name: string;
    department?: Department | Department[];
}

export interface Department {
    code: string;
    name: string;
    headings: Heading[];
}

export interface Heading {
    name: string;
    item: LawItem | LawItem[];
}

export interface LawItem {
    identifier: string;
    control: string;
    title: string;
    pdfUrl: {
        text: string;
        szBytes?: string;
        szKBytes?: string;
        startPage?: string;
        endPage?: string;
    };
    htmlUrl: string;
    xmlUrl: string;
}
