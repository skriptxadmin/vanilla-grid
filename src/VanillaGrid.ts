import { Config } from "./interfaces/Config";
import { CreateElement } from "./helpers/CreateElement";
import { CreateListElement } from "./helpers/CreateListElement";
import { EnableBtn } from './helpers/EnableBtn';
import { DisableBtn } from './helpers/DisableBtn';
export class VanillaGrid {

    table: HTMLElement;

    config: Config;

    tbody: HTMLElement;

    trs: any[] = [];

    currentPage: any = 1;

    wrapper: HTMLElement;

    get itemsPerPage(): any {

        return this.config?.itemsPerPage || 10;
    }

    get totalPages(): any {

        return Math.ceil(this.trs.length / this.itemsPerPage)
    }

    get start(): any {

        return (this.currentPage - 1) * (this.itemsPerPage)
    }

    get end(): any {

        let end = this.start + this.itemsPerPage;

        if (end > this.trs.length) {

            end = this.trs.length;
        }
        return end;
    }

    get activeClass() {

        return this.config?.classNames?.active || 'active';
    }

    get infoText() {
        const info = this.config.info?.trim();
        if (!info) {
            return '';
        }
        const replaced = info.replace(':start', this.start + 1)
            .replace(':end', this.end)
            .replace(':total', this.trs?.length.toString());
        return replaced;
    }

    constructor(table, config) {

        this.table = table;

        this.config = config;

        const tbody = this.table.querySelector("tbody");
        if (!tbody) {
            console.error("Cannot render vanilla grid. Make sure your table is wrapped with thead and tbody");
            return;
        }

        this.tbody = tbody;

        const trs: any = this.tbody.querySelectorAll("tr");

        if (!trs || !trs.length) {

            console.error("Cannot render vanilla grid. No table rows found");


            return;
        }

        if (trs.length <= this.itemsPerPage) {

            return;

        }

        this.trs = trs;



        this.render();

    }

    render() {

        this.trs.forEach(tr => tr.style.display = 'none');

        for (let i = this.start; i < this.end; i++) {

            this.trs[i].style.display = '';

        }
        if (!this.wrapper) {

            this.drawWrapper();

        }

        this.renderBtns();

    }

    drawWrapper() {

        let li;

        const ul = CreateElement('ul', '', this.config?.classNames?.ul);

        li = CreateListElement('&laquo;', 'first', this.config.classNames);
        ul.append(li);
        li = CreateListElement('&lsaquo;', 'prev', this.config.classNames);
        ul.append(li);

        if (this.totalPages > 5) {

            const select = CreateElement('select', '', this.config?.classNames?.select);
            for (let i = 1; i <= this.totalPages; i++) {
                const option = CreateElement('option', i, '', { value: i })

                select.append(option)

            }
            const li = CreateElement('li');
            const div = CreateElement('div', '', this.config?.classNames?.selectDiv);
            div.append(select);
            li.append(div);
            ul.append(li);

        } else {

            for (let i = 1; i <= this.totalPages; i++) {

                li = CreateListElement(i, 'number', this.config.classNames);

                ul.append(li);

            }
        }



        li = CreateListElement('&rsaquo;', 'next', this.config.classNames);
        ul.append(li);
        li = CreateListElement('&raquo;', 'last', this.config.classNames);
        ul.append(li);

        const nav = CreateElement('nav', '', this.config?.classNames?.nav);
        nav.append(ul);

        const wrapper = CreateElement('div', '', `vg-wrapper ${this.config?.classNames?.wrapper || ''}`);

        if (this.infoText) {
            const info = CreateElement('div', '', 'info');
            wrapper.append(info);
        }

        wrapper.append(nav);

        const wrapperBtns = wrapper.querySelectorAll('button');
        const wrapperSelect = wrapper.querySelector("select");

        wrapperBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (btn.classList.contains('page')) {
                    if (btn.classList.contains('number')) {
                        const pageNumber: any = parseInt(btn.innerText);
                        this.currentPage = pageNumber;
                    } else if (btn.classList.contains('first')) {
                        this.currentPage = 1;
                    } else if (btn.classList.contains('prev')) {
                        this.currentPage = this.currentPage - 1;
                    } else if (btn.classList.contains('next')) {
                        this.currentPage = this.currentPage + 1;
                    } else if (btn.classList.contains('last')) {
                        this.currentPage = this.totalPages;
                    }

                    if (wrapperSelect) {
                        wrapperSelect.value = this.currentPage;
                    }

                    this.render();
                }
            })
        })

        if (wrapperSelect) {
            wrapperSelect.addEventListener('change', () => {
                this.currentPage = parseInt(wrapperSelect.value);
                this.render();
            })
        }

        const vgWrapper = this.table.parentNode?.querySelector('.vg-wrapper');
        if(vgWrapper){
            vgWrapper.remove();
        }
        this.table.parentNode?.insertBefore(wrapper, this.table.nextSibling);
        this.wrapper = wrapper;
    }

    renderBtns() {

        if (this.infoText) {
            const info = this.wrapper.querySelector(".info");
            if (info) {
                info.innerHTML = this.infoText;
            }

        }
        const btns = this.wrapper.querySelectorAll("button.page");
        btns.forEach((btn: any) => {
            EnableBtn(btn, this.activeClass);
            if (btn.classList.contains('number') && parseInt(btn.innerText) == parseInt(this.currentPage)) {
                DisableBtn(btn, this.activeClass);
            }
        });

        if (this.currentPage == 1) {
            const firstBtn = this.wrapper.querySelector("button.page.first");
            const prevBtn = this.wrapper.querySelector("button.page.prev");
            DisableBtn(firstBtn, this.activeClass);
            DisableBtn(prevBtn, this.activeClass);
        }

        if (this.currentPage == this.totalPages) {
            const lastBtn = this.wrapper.querySelector("button.page.last");
            const nextBtn = this.wrapper.querySelector("button.page.next");
            DisableBtn(lastBtn, this.activeClass);
            DisableBtn(nextBtn, this.activeClass);
        }

    }
}