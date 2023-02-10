const navbar = document.getElementById('navbar');
const title = document.getElementById('title');
setupNavbar();
window.addEventListener('scroll', fixateNavbar);

function setupNavbar() {
    //manually set events instead of using css hover etc since rendering is too lazy for my taste using both hover + click breaks tap events
    const navElements = navbar.children;
    for (var i = 0; i < navElements.length; i++) {
        const c = navElements[i];
        const target = document.getElementById(c.href.slice(c.href.lastIndexOf('#') + 1, c.href.length));
        c.onclick = (ev) => navbarElementClicked(ev, c, target);
        c.onmouseenter = () => setElementActive(c);
        c.onmouseleave = () => removeElementActive(c);
    }
}

function navbarElementClicked(ev, self, target) {
    ev.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    setElementActive(self);
    setTimeout(() => {
        removeElementActive(self);
    }, 200);
}

function fixateNavbar() {
    var titleTop = title.getBoundingClientRect().top;
    var titleHeight = title.getBoundingClientRect().height;
    var navbarHeight = navbar.getBoundingClientRect().height;

    if (titleHeight + titleTop <= 0) {
        navbar.classList.add('fixated');
        document.getElementById('content').style.paddingTop = navbarHeight + 'px';
    } else {
        navbar.classList.remove('fixated');
        document.getElementById('content').style.paddingTop = '0px';
    }
}

function setElementActive(target) {
    target.classList.add('active');
}

function removeElementActive(target) {
    target.classList.remove('active');
}
