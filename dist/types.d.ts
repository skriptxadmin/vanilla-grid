interface ClassNames {
    active?: string;
    wrapper?: string;
    nav?: string;
    ul?: string;
    li?: string;
    button?: string;
    summary?: string;
    span?: string;
    selectDiv?: string;
    select?: string;
}
interface Config {
    info: string;
    itemsPerPage: number;
    classNames?: ClassNames;
}
export class VanillaGrid {
    table: HTMLElement;
    config: Config;
    tbody: HTMLElement;
    trs: any[];
    currentPage: any;
    wrapper: HTMLElement;
    get itemsPerPage(): any;
    get totalPages(): any;
    get start(): any;
    get end(): any;
    get activeClass(): string;
    get infoText(): string;
    constructor(table: any, config: any);
    render(): void;
    drawWrapper(): void;
    renderBtns(): void;
}
interface ServerConfig {
    info: string;
    itemsPerPage: number;
    totalItems: number;
    classNames?: ClassNames;
    totalPages: number;
}
export class VanillaServerGrid extends EventTarget {
    wrapper: HTMLElement;
    config: ServerConfig;
    currentPage: any;
    pageSelected: any;
    get itemsPerPage(): any;
    get totalPages(): any;
    get start(): any;
    get end(): any;
    get activeClass(): string;
    get infoText(): string;
    constructor(wrapper: any, config: any);
    render(): void;
    onPageChange(): void;
}

//# sourceMappingURL=types.d.ts.map
