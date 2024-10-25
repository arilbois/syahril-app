export interface AboutMe {
    description: string;
}

export interface Skill {
    id: number;
    name: string;
    skill_type: string;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    field: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface Certification {
    id: number;
    name: string;
    issuer: string;
    issue_date: string;
    expiration_date: string | null;
    description: string;
    link?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    gitUrl: string;
    previewUrl: string;
    tag: string[];
}


export interface APIResponse<T> {
    data: T;
    message?: string;
    status?: number;
}
