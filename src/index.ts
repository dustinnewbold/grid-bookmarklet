(() => {
    const prefix = 'grid-bookmarklet';
    const getValue = (key: string, defaultValue: any) => {
        const value = window.localStorage.getItem(`${prefix}-${key}`);
        if ( value ) return value;
        if ( ! value ) window.localStorage.setItem(`${prefix}-${key}`, defaultValue);
        return defaultValue;
    };

    const gridStyles = {
        color: getValue('color', '#e74c3c'),
        opacity: getValue('opacity', 0.1),
        breakpoints: {
            mobile: {
                breakpoint: 0,
                columns: getValue('breakpoint-mobile-columns', 4),
                gap: getValue('breakpoint-mobile-gap', 24),
                gutter: getValue('breakpoint-mobile-gutter', 32),
            },
            tablet: {
                breakpoint: getValue('breakpoint-tablet-px', 700),
                columns: getValue('breakpoint-tablet-columns', 8),
                gap: getValue('breakpoint-tablet-gap', 24),
                gutter: getValue('breakpoint-tablet-gutter', 32),
            },
            desktop: {
                breakpoint: getValue('breakpoint-desktop-px', 1200),
                columns: getValue('breakpoint-desktop-columns', 12),
                gap: getValue('breakpoint-desktop-gap', 48),
                gutter: getValue('breakpoint-desktop-gutter', 32),
            },
            desktopLarge: {
                breakpoint: getValue('breakpoint-desktopLarge-px', 1600),
                columns: getValue('breakpoint-desktopLarge-columns', 12),
                gap: getValue('breakpoint-desktopLarge-gap', 48),
                gutter: getValue('breakpoint-desktopLarge-gutter', 32),
            },
        },
    };

    /**
     * Remove any existing grid
     */
    const existingEl = document.querySelector(`.${prefix}-debug`);
    const existingStyleEl = document.getElementById(`${prefix}-styles`);
    if ( existingEl ) {
        document.body.removeChild(existingEl);
        if ( existingStyleEl ) document.body.removeChild(existingStyleEl);
        return;
    }

    /**
     * Add grid elements
     */
    const gridContainerEl = document.createElement('div');
    gridContainerEl.classList.add(`${prefix}-debug`);
    for ( let e=0; e<12; e++) {
        const gridColumnEl = document.createElement('div');
        gridColumnEl.classList.add(`${prefix}-col`);
        gridContainerEl.appendChild(gridColumnEl);
    }
    document.body.appendChild(gridContainerEl);

    /**
     * Add grid styles
     */
    const gridStyleEl = document.createElement('style');
    gridStyleEl.id = `${prefix}-styles`;
    gridStyleEl.innerHTML = `
        .${prefix}-debug {
            --${prefix}-color: ${gridStyles.color};
            --${prefix}-opacity: ${gridStyles.opacity};
            --${prefix}-columns: ${gridStyles.breakpoints.mobile.columns};
            --${prefix}-gutter: ${gridStyles.breakpoints.mobile.gutter}px;
            --${prefix}-gap: ${gridStyles.breakpoints.mobile.gap}px;

            position: fixed;
            top: 0;
            left: var(--${prefix}-gutter);
            width: calc(100vw - var(--${prefix}-gutter) * 2);
            height: 100vh;
            z-index: 9999999999;
            display: grid;
            grid-template-columns: repeat(var(--${prefix}-columns), [col-start] 1fr);
            gap: var(--${prefix}-gap);
        }

        .${prefix}-col {
            background: var(--${prefix}-color);
            opacity: var(--${prefix}-opacity);
            display: none;
        }
    `;

    Object.keys(gridStyles.breakpoints).forEach(breakpoint => {
        // @ts-ignore
        const gridBreakpoint = gridStyles.breakpoints[breakpoint];
        gridStyleEl.innerHTML += `
            @media screen and (min-width: ${gridBreakpoint.breakpoint}px) {
                .${prefix}-debug {
                    --${prefix}-columns: ${gridBreakpoint.columns};
                    --${prefix}-gutter: ${gridBreakpoint.gutter}px;
                    --${prefix}-gap: ${gridBreakpoint.gap}px;
                }

                .${prefix}-col:nth-child(-n+${gridBreakpoint.columns}) {
                    display: block;
                }
            }
        `;
    })
    document.body.appendChild(gridStyleEl);
})();
