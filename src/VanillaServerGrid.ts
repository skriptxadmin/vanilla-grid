import { ServerConfig } from "./interfaces/ServerConfig";
import { CreateElement } from "./helpers/CreateElement";
import { CreateListElement } from "./helpers/CreateListElement";
import { EnableBtn } from "./helpers/EnableBtn";
import { DisableBtn } from "./helpers/DisableBtn";
export class VanillaServerGrid extends EventTarget{

    wrapper: HTMLElement;

    config: ServerConfig;

    currentPage: any = 1;

    pageSelected:any = -1;

    get itemsPerPage(): any {

        return this.config?.itemsPerPage || 10;
    }

    get totalPages(): any {

        return Math.ceil(this.config?.totalItems / this.config?.itemsPerPage) || 0
    }

    get start(): any {

        return (this.currentPage - 1) * (this.itemsPerPage)
    }

    get end(): any {

        let end = this.start + this.itemsPerPage;

        if (end > this.config?.totalItems) {

            end = this.config.totalItems;
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
            .replace(':total', this.config?.totalItems.toString());
        return replaced;
    }

    constructor(wrapper, config) {
        super();
        this.config = config;
        this.wrapper = wrapper;
        this.currentPage = config?.currentPage || 1;
        this.render();
    }



    render() {
        this.wrapper.innerHTML = '';
        if (this.infoText) {
            const info = CreateElement('div', '', 'info');
            info.innerHTML = this.infoText;
            this.wrapper.append(info);
        }

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


        this.wrapper.append(nav);

        const btns = this.wrapper.querySelectorAll("button.page");
        btns.forEach((btn: any) => {
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

        const wrapperBtns = this.wrapper.querySelectorAll('button');
        const wrapperSelect = this.wrapper.querySelector("select");

        wrapperBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.pageSelected = -1;
                if (btn.classList.contains('page')) {
                    if (btn.classList.contains('number')) {
                        this.pageSelected = parseInt(btn.innerText);

                    } else if (btn.classList.contains('first')) {
                       this.pageSelected = 1;

                    } else if (btn.classList.contains('prev')) {
                       this.pageSelected = this.currentPage - 1;

                    } else if (btn.classList.contains('next')) {
                        this.pageSelected = this.currentPage +1;

                    } else if (btn.classList.contains('last')) {
                        this.pageSelected = this.totalPages;
                        
                    }
                }
                this.onPageChange();
               
            })
        })

        if (wrapperSelect) {
            wrapperSelect.value = this.currentPage;
            wrapperSelect.addEventListener('change', () => {
                this.pageSelected = parseInt(wrapperSelect.value);
                this.onPageChange();
            })
        }


    }
    onPageChange(){
        const detail = {currentPage:this.currentPage, pageSelected:this.pageSelected};
        const cev = new CustomEvent('onPageChange',{detail});
        this.dispatchEvent(cev);
    }

   

}