"use strict";

// Inject CSS immediately to hide blockers ASAP
const style = document.createElement('style');
style.textContent = `
    body { overflow: visible !important; position: static !important; }
    div#ContentHardsell,
    div#ContentWallHardsell,
    div#HardsellOverlay,
    div#LapsedContentHardsell,
    div#UserAlert,
    dialogue#SmarterBannerContainer {
        display: none !important;
    }
`;
document.documentElement.appendChild(style);

// Optimized Clear Glass Firefox Extension - removes blockers from job review sites
class RemoveBlockers {
    constructor() {
        this.url = window.location.href;
        this.eyeIcon = '𓁹';
        this.message = 'Full text made visible by ClearGlass';
        
        this.enableFilters = () => {
            const filterDropDown = document.querySelector('div[data-test="filterDropdown"]');
            if (!filterDropDown) return;
            
            const input = filterDropDown.querySelector('div[data-test="ContentFiltersJobTitleACContainer"] input');
            const findBtn = filterDropDown.querySelector('button[data-test="ContentFiltersFindBtn"]');
            
            if (findBtn) {
                const span = document.createElement('span');
                span.innerText = this.eyeIcon;
                span.style.cssText = 'color: green; padding-left: 5px; font-size: 1rem;';
                setTimeout(() => findBtn.children[0]?.appendChild(span));
                
                findBtn.addEventListener('click', () => {
                    if (input?.value) {
                        const interviewsBtn = document.querySelector('#interviews > a');
                        const filter = input.value.replace(' ', '-');
                        window.location.href = `${interviewsBtn.href}?filter.jobTitleExact=${filter}`;
                    }
                });
            }
            
            [input, findBtn].forEach(el => {
                if (el) {
                    el.removeAttribute('disabled');
                    el.removeAttribute('aria-disabled');
                }
            });
        };
        this.fromGlassDoor = () => {
            const style = `
            body {
                overflow: visible !important;
                position: static !important;
            }

            /* div[data-test="authModalContainerV2"], */
            div#ContentHardsell,
            div#ContentWallHardsell,
            div#HardsellOverlay,
            div#LapsedContentHardsell,
            div#UserAlert,
            dialogue#SmarterBannerContainer
            {
                display: none !important;
                --blocker-tag: 1; 
            }

            div#ReviewsFeed span {
                white-space: normal !important;
            }

            div[class^=" FilterLockCTA"] {
                display: none !important
            }

            div#ReviewsFeed p {
                display: block !important;
                max-height: none;
                --limit: 0 !important;
            }

            div#ReviewsFeed [class^="review-details_showMoreButton"] {
                display: none;
            }

            div#ReviewsFeed [class^="review-details_fullWidth"] {
                pointer-events: none;
            }
        `;
            this.attachStyle(style);
            this.preventScrollLock();
            this.enableFilters();
            setTimeout(() => this.replaceShowMoreButtons(), 1000);
        };
        this.fromBlind = () => {
            const style = `
            body { overflow: visible !important; }
            div.backdrop-blur-sm,
            div.z-10, div.z-20, div.z-30, div.z-40 {
                display: none !important;
                --blocker-tag: 1; 
            }`;
            this.attachStyle(style);
        };

        this.fromRepVue = () => {
            const style = `
            div[class^="LimitedAccess_wrapper"] {
                --blur: 0 !important;
                --blocker-tag: 1; 
            }
            div[class^="LimitedAccess_wrapper"]::before,
            div[class^="LimitedAccess_companyWrapper"] {
                display: none !important;
                --blocker-tag: 1; 
            }`;
            this.attachStyle(style);
        };
        this.showBlockedCount = () => {
            const count = this.countHiddenElements();
            if (count > 0) {
                browser.runtime.sendMessage({ 
                    action: 'displayCount', 
                    data: { blockedCount: count } 
                });
            }
        };

        this.mount = () => {
            const domain = this.url.replace(/.+\/\/|www.|\..+/g, '');
            const handlers = {
                glassdoor: this.fromGlassDoor,
                teamblind: this.fromBlind,
                repvue: this.fromRepVue,
            };
            
            if (handlers[domain]) {
                document.addEventListener('DOMContentLoaded', () => {
                    handlers[domain]();
                    this.showBlockedCount();
                });
            }
        };

        this.url = window.location.href;
        this.eyeIcon = '𓁹';
        this.message = 'Full text made visible by ClearGlass';
    }
    countHiddenElements() {
        return document.querySelectorAll('[style*="--blocker-tag"]').length;
    }

    replaceShowMoreButtons() {
        document.querySelectorAll('div#ReviewsFeed [class^="review-details_showMoreButton"]')
            .forEach(button => {
                const div = document.createElement('div');
                div.innerHTML = `<span>${this.message}</span><span style="color:#085; font-weight: bold; font-size: 24px; padding-left: 5px;">${this.eyeIcon}</span>`;
                div.style.cssText = 'color:#085; padding-bottom: 5px;';
                button.replaceWith(div);
            });
    }

    attachStyle(style) {
        const styleElement = document.createElement('style');
        styleElement.textContent = style;
        document.head.prepend(styleElement);
    }

    preventScrollLock() {
        window.addEventListener('scroll', e => e.stopPropagation(), { capture: true });
    }
}
const removeBlockers = new RemoveBlockers();
removeBlockers.mount();
