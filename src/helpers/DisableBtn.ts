export function   DisableBtn(btn, activeClass) {
    if (!btn.classList.contains('number')) {
        btn.closest('li').classList.add('disabled');
    }
    btn.setAttribute('disabled', true);
    btn.classList.add(activeClass);
}