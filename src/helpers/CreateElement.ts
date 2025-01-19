export function  CreateElement(ele, html: any = '', classNames: string = '', attributes = {}) {
    const ele$ = document.createElement(ele);
    for (let key in attributes) {
        ele$.setAttribute(key, attributes[key]);
    }
    const classNamesTrimmed = classNames.trim();
    if (classNamesTrimmed) {
        const classNamesSplitted = classNamesTrimmed.split(' ');
        const classNamesMapped = classNamesSplitted.map(v => v.trim()).filter(v => v);
        classNamesMapped.forEach(className => {
            ele$.classList.add(className);
        })
    }

    ele$.innerHTML = html;

    return ele$;
}
