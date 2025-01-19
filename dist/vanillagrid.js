
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $4681ebe36e8f11ba$exports = {};

$parcel$export($4681ebe36e8f11ba$exports, "VanillaGrid", () => $4681ebe36e8f11ba$export$a0fa6baaee363926);
function $278c2cae7ab6cf7a$export$b11b83b4c0e60f43(ele, html = '', classNames = '', attributes = {}) {
    const ele$ = document.createElement(ele);
    for(let key in attributes)ele$.setAttribute(key, attributes[key]);
    const classNamesTrimmed = classNames.trim();
    if (classNamesTrimmed) {
        const classNamesSplitted = classNamesTrimmed.split(' ');
        const classNamesMapped = classNamesSplitted.map((v)=>v.trim()).filter((v)=>v);
        classNamesMapped.forEach((className)=>{
            ele$.classList.add(className);
        });
    }
    ele$.innerHTML = html;
    return ele$;
}



function $1da62e09050f970d$export$8fa3b0623dc5004a(content, btnClassname, classNames = {}) {
    let li, btn, span;
    li = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('li', '', classNames?.li);
    btn = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('button', '', `page ${btnClassname} ${classNames?.button ? classNames.button : ''}`);
    span = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('span', content, classNames?.span);
    btn.append(span);
    li.append(btn);
    return li;
}


function $5a4cb9745ee5e9a2$export$6ae0c356a95a937b(btn, activeClass) {
    if (!btn.classList.contains('number')) btn.closest('li').classList.remove('disabled');
    btn.removeAttribute('disabled');
    btn.classList.remove(activeClass);
}


function $b85e21fc4c5f8a01$export$989e9142cd3eb435(btn, activeClass) {
    if (!btn.classList.contains('number')) btn.closest('li').classList.add('disabled');
    btn.setAttribute('disabled', true);
    btn.classList.add(activeClass);
}


class $4681ebe36e8f11ba$export$a0fa6baaee363926 {
    table;
    config;
    tbody;
    trs = [];
    currentPage = 1;
    wrapper;
    get itemsPerPage() {
        return this.config?.itemsPerPage || 10;
    }
    get totalPages() {
        return Math.ceil(this.trs.length / this.itemsPerPage);
    }
    get start() {
        return (this.currentPage - 1) * this.itemsPerPage;
    }
    get end() {
        let end = this.start + this.itemsPerPage;
        if (end > this.trs.length) end = this.trs.length;
        return end;
    }
    get activeClass() {
        return this.config?.classNames?.active || 'active';
    }
    get infoText() {
        const info = this.config.info?.trim();
        if (!info) return '';
        const replaced = info.replace(':start', this.start + 1).replace(':end', this.end).replace(':total', this.trs?.length.toString());
        return replaced;
    }
    constructor(table, config){
        this.table = table;
        this.config = config;
        const tbody = this.table.querySelector("tbody");
        if (!tbody) {
            console.error("Cannot render vanilla grid. Make sure your table is wrapped with thead and tbody");
            return;
        }
        this.tbody = tbody;
        const trs = this.tbody.querySelectorAll("tr");
        if (!trs || !trs.length) {
            console.error("Cannot render vanilla grid. No table rows found");
            return;
        }
        if (trs.length <= this.itemsPerPage) return;
        this.trs = trs;
        this.render();
    }
    render() {
        this.trs.forEach((tr)=>tr.style.display = 'none');
        for(let i = this.start; i < this.end; i++)this.trs[i].style.display = '';
        if (!this.wrapper) this.drawWrapper();
        this.renderBtns();
    }
    drawWrapper() {
        let li;
        const ul = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('ul', '', this.config?.classNames?.ul);
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&laquo;', 'first', this.config.classNames);
        ul.append(li);
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&lsaquo;', 'prev', this.config.classNames);
        ul.append(li);
        if (this.totalPages > 5) {
            const select = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('select', '', this.config?.classNames?.select);
            for(let i = 1; i <= this.totalPages; i++){
                const option = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('option', i, '', {
                    value: i
                });
                select.append(option);
            }
            const li = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('li');
            const div = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('div', '', this.config?.classNames?.selectDiv);
            div.append(select);
            li.append(div);
            ul.append(li);
        } else for(let i = 1; i <= this.totalPages; i++){
            li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)(i, 'number', this.config.classNames);
            ul.append(li);
        }
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&rsaquo;', 'next', this.config.classNames);
        ul.append(li);
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&raquo;', 'last', this.config.classNames);
        ul.append(li);
        const nav = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('nav', '', this.config?.classNames?.nav);
        nav.append(ul);
        const wrapper = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('div', '', `vg-wrapper ${this.config?.classNames?.wrapper || ''}`);
        if (this.infoText) {
            const info = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('div', '', 'info');
            wrapper.append(info);
        }
        wrapper.append(nav);
        const wrapperBtns = wrapper.querySelectorAll('button');
        const wrapperSelect = wrapper.querySelector("select");
        wrapperBtns.forEach((btn)=>{
            btn.addEventListener('click', (event)=>{
                event.preventDefault();
                event.stopPropagation();
                if (btn.classList.contains('page')) {
                    if (btn.classList.contains('number')) {
                        const pageNumber = parseInt(btn.innerText);
                        this.currentPage = pageNumber;
                    } else if (btn.classList.contains('first')) this.currentPage = 1;
                    else if (btn.classList.contains('prev')) this.currentPage = this.currentPage - 1;
                    else if (btn.classList.contains('next')) this.currentPage = this.currentPage + 1;
                    else if (btn.classList.contains('last')) this.currentPage = this.totalPages;
                    if (wrapperSelect) wrapperSelect.value = this.currentPage;
                    this.render();
                }
            });
        });
        if (wrapperSelect) wrapperSelect.addEventListener('change', ()=>{
            this.currentPage = parseInt(wrapperSelect.value);
            this.render();
        });
        const vgWrapper = this.table.parentNode?.querySelector('.vg-wrapper');
        if (vgWrapper) vgWrapper.remove();
        this.table.parentNode?.insertBefore(wrapper, this.table.nextSibling);
        this.wrapper = wrapper;
    }
    renderBtns() {
        if (this.infoText) {
            const info = this.wrapper.querySelector(".info");
            if (info) info.innerHTML = this.infoText;
        }
        const btns = this.wrapper.querySelectorAll("button.page");
        btns.forEach((btn)=>{
            (0, $5a4cb9745ee5e9a2$export$6ae0c356a95a937b)(btn, this.activeClass);
            if (btn.classList.contains('number') && parseInt(btn.innerText) == parseInt(this.currentPage)) (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(btn, this.activeClass);
        });
        if (this.currentPage == 1) {
            const firstBtn = this.wrapper.querySelector("button.page.first");
            const prevBtn = this.wrapper.querySelector("button.page.prev");
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(firstBtn, this.activeClass);
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(prevBtn, this.activeClass);
        }
        if (this.currentPage == this.totalPages) {
            const lastBtn = this.wrapper.querySelector("button.page.last");
            const nextBtn = this.wrapper.querySelector("button.page.next");
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(lastBtn, this.activeClass);
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(nextBtn, this.activeClass);
        }
    }
}


var $719754e0c11040c7$exports = {};

$parcel$export($719754e0c11040c7$exports, "VanillaServerGrid", () => $719754e0c11040c7$export$2adb53ea8106b8c1);



class $719754e0c11040c7$export$2adb53ea8106b8c1 extends EventTarget {
    wrapper;
    config;
    currentPage = 1;
    pageSelected = -1;
    get itemsPerPage() {
        return this.config?.itemsPerPage || 10;
    }
    get totalPages() {
        return Math.ceil(this.config?.totalItems / this.config?.itemsPerPage) || 0;
    }
    get start() {
        return (this.currentPage - 1) * this.itemsPerPage;
    }
    get end() {
        let end = this.start + this.itemsPerPage;
        if (end > this.config?.totalItems) end = this.config.totalItems;
        return end;
    }
    get activeClass() {
        return this.config?.classNames?.active || 'active';
    }
    get infoText() {
        const info = this.config.info?.trim();
        if (!info) return '';
        const replaced = info.replace(':start', this.start + 1).replace(':end', this.end).replace(':total', this.config?.totalItems.toString());
        return replaced;
    }
    constructor(wrapper, config){
        super();
        this.config = config;
        this.wrapper = wrapper;
        this.currentPage = config?.currentPage || 1;
        this.render();
    }
    render() {
        this.wrapper.innerHTML = '';
        if (this.infoText) {
            const info = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('div', '', 'info');
            info.innerHTML = this.infoText;
            this.wrapper.append(info);
        }
        let li;
        const ul = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('ul', '', this.config?.classNames?.ul);
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&laquo;', 'first', this.config.classNames);
        ul.append(li);
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&lsaquo;', 'prev', this.config.classNames);
        ul.append(li);
        if (this.totalPages > 5) {
            const select = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('select', '', this.config?.classNames?.select);
            for(let i = 1; i <= this.totalPages; i++){
                const option = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('option', i, '', {
                    value: i
                });
                select.append(option);
            }
            const li = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('li');
            const div = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('div', '', this.config?.classNames?.selectDiv);
            div.append(select);
            li.append(div);
            ul.append(li);
        } else for(let i = 1; i <= this.totalPages; i++){
            li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)(i, 'number', this.config.classNames);
            ul.append(li);
        }
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&rsaquo;', 'next', this.config.classNames);
        ul.append(li);
        li = (0, $1da62e09050f970d$export$8fa3b0623dc5004a)('&raquo;', 'last', this.config.classNames);
        ul.append(li);
        const nav = (0, $278c2cae7ab6cf7a$export$b11b83b4c0e60f43)('nav', '', this.config?.classNames?.nav);
        nav.append(ul);
        this.wrapper.append(nav);
        const btns = this.wrapper.querySelectorAll("button.page");
        btns.forEach((btn)=>{
            if (btn.classList.contains('number') && parseInt(btn.innerText) == parseInt(this.currentPage)) (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(btn, this.activeClass);
        });
        if (this.currentPage == 1) {
            const firstBtn = this.wrapper.querySelector("button.page.first");
            const prevBtn = this.wrapper.querySelector("button.page.prev");
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(firstBtn, this.activeClass);
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(prevBtn, this.activeClass);
        }
        if (this.currentPage == this.totalPages) {
            const lastBtn = this.wrapper.querySelector("button.page.last");
            const nextBtn = this.wrapper.querySelector("button.page.next");
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(lastBtn, this.activeClass);
            (0, $b85e21fc4c5f8a01$export$989e9142cd3eb435)(nextBtn, this.activeClass);
        }
        const wrapperBtns = this.wrapper.querySelectorAll('button');
        const wrapperSelect = this.wrapper.querySelector("select");
        wrapperBtns.forEach((btn)=>{
            btn.addEventListener('click', (event)=>{
                event.preventDefault();
                event.stopPropagation();
                this.pageSelected = -1;
                if (btn.classList.contains('page')) {
                    if (btn.classList.contains('number')) this.pageSelected = parseInt(btn.innerText);
                    else if (btn.classList.contains('first')) this.pageSelected = 1;
                    else if (btn.classList.contains('prev')) this.pageSelected = this.currentPage - 1;
                    else if (btn.classList.contains('next')) this.pageSelected = this.currentPage + 1;
                    else if (btn.classList.contains('last')) this.pageSelected = this.totalPages;
                }
                this.onPageChange();
            });
        });
        if (wrapperSelect) {
            wrapperSelect.value = this.currentPage;
            wrapperSelect.addEventListener('change', ()=>{
                this.pageSelected = parseInt(wrapperSelect.value);
                this.onPageChange();
            });
        }
    }
    onPageChange() {
        const detail = {
            currentPage: this.currentPage,
            pageSelected: this.pageSelected
        };
        const cev = new CustomEvent('onPageChange', {
            detail: detail
        });
        this.dispatchEvent(cev);
    }
}


$parcel$exportWildcard(module.exports, $4681ebe36e8f11ba$exports);
$parcel$exportWildcard(module.exports, $719754e0c11040c7$exports);


//# sourceMappingURL=vanillagrid.js.map
