class ScrollEventManager {
    /**
     * 
     * @param {string} targetCssClass Css Class of targets to reveal
     * @param {string} removeCssClass Css Class to be removed when revealing target
     * @param {number} revealPercentage Percentage of VH when the target should be revealed (0.0 - 1.0). Default 0.5
     * @param {boolean} checkOnce Manage if EventListener should be removed after all classes would be activated. Default true
     */
    constructor(targetCssClass, removeCssClass, revealPercentage = 0.5, checkOnce = true) {
        window.addEventListener("scroll", () => this.revealTarget(targetCssClass, removeCssClass, revealPercentage, checkOnce));
        this.revealTarget(targetCssClass, removeCssClass, revealPercentage, checkOnce);
    };

    revealTarget(targetCssClass, removeCssClass, revealPercentage, checkOnce) {
        var targets = document.querySelectorAll(targetCssClass);
        //keep height calc here to ensure its revealed at the right point if screen would be flipped 
        var revealPosition = window.innerHeight * revealPercentage;
        for (var i = 0; i < targets.length; i++) {
            var t = targets[i].getBoundingClientRect().top;
            if (t - revealPosition <= 0) {
                targets[i].classList.remove(removeCssClass);
            }
        }
        if (!this.checkOnce && targets.length == 0) {
            window.removeEventListener("scroll", () => this.revealTarget(targetCssClass, removeCssClass, revealPercentage, checkOnce));
        }
    }
}