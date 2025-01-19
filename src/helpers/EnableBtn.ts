export function EnableBtn(btn, activeClass) {
    if (!btn.classList.contains('number')) {
        btn.closest('li').classList.remove('disabled');
    }
    btn.removeAttribute('disabled');
    btn.classList.remove(activeClass);
}