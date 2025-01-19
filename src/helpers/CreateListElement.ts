import { CreateElement } from "./CreateElement";
import { ClassNames } from "../interfaces/Classnames";

export function CreateListElement(content, btnClassname, classNames:ClassNames = {}) {
    let li, btn, span;
    li = CreateElement('li', '', classNames?.li);
    btn = CreateElement('button', '', `page ${btnClassname} ${classNames?.button?classNames.button:''}`);
    span = CreateElement('span', content, classNames?.span);
    btn.append(span);
    li.append(btn);
    return li;
}