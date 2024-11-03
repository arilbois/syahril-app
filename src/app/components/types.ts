export interface AboutMe {
    description: string;
}

export interface Skill {
    id: number;
    name: string;
    skill_type: string;
    level: string;
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
    git_url: string;
    preview_url: string;
    tag: string[];
}


export interface APIResponse<T> {
    data: T;
    message?: string;
    status?: number;
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    start_date: string;
    end_date: string | null;
    description: string;
}
