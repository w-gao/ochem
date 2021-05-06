//
// Copyright (c) 2020-2021 w-gao
//


/**
 * An interface to represent a chemistry compound on our map.
 */
export interface Compound {
    id: string;
    label: string;
    parent?: string;

    imgUrl?: string;
    height?: string;
}


/**
 * An interface to represent a chemical relationship between two
 * Compounds, source and target.
 */
export interface Reaction {
    id: string;
    source: string;
    target: string;
    label: string;

    // control point distances & weights
    cpd?: string;
    cpw?: string;

    // endpoints
    sep?: string;
    tep?: string;
}


/**
 * Get a somewhat random string with a fixed length.
 *
 * @param length length of the string.
 */
export const randomId = (length: number = 8) => {
    return Array(length)
        .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        .map(x => x[Math.floor(Math.random() * x.length)])
        .join("");
}


/**
 * Return the subscript of the given number as an HTML unicode string.
 *
 * @param num Subscript number. Must be between 0 and 10.
 */
export const sub = (num: number): string => {

    if (num < 0 || num > 11) {
        throw Error(`Expected num to be between 0 and 10, but got ${num}.`);
    }

    // unfortunately the renderer is extremely limited so we can't use HTML
    // formatting for node and edges. We can only rely on unicode chars.
    return String.fromCharCode(8320 + num);
}


/**
 * Return the degree symbol as an HTML unicode string.
 */
export const deg = (): string => {
    return String.fromCharCode(176);
}


/**
 * Return the bullet symbol as an HTML unicode string.
 */
export const bull = (): string => {
    return String.fromCharCode(8226);
}


/**
 * Given any number of reagents, return a formatted string with line breaks.
 *
 * @param args Reagents.
 */
export const reagent = (...args: string[]): string => {
    return args.join("\n");
}


/**
 * Return an object containing the parsed URL of the current page.
 */
export const parseUrl = () => {
    const url: any = {};

    if (typeof (window) === undefined) {
        return url;
    }

    const loc = window.location;
    url.root = loc.origin + loc.pathname;
    const query: any[] = loc.search.substring(1).split("&");
    url.query = {};
    for (let i = 0; i < query.length; i++) {
        const args = query[i].split("=");
        if (args[0]) {
            if (args[1] === undefined) {
                args[1] = true;
            } else if (!isNaN(args[1])) {
                args[1] = parseFloat(args[1]);
            }
            url.query[args[0]] = args[1];
        }
    }
    url.hash = loc.hash ? loc.hash.substring(1) : undefined;
    url.host = loc.host;

    return url;
};


/**
 * Given a cytoscape instance, fetch environment information from env.json and
 * add a node displaying this info.
 */
export const addInfoNode = (cy: any) => {
    fetch("env.json").then(res => res.json()).then(res => {
        let text = "~~ CHEM 8B Reactions Map ~~\n\n";

        if (Object.keys(res).length === 0) {
            text += "Current build: local";
        } else {
            const branch = res["BRANCH"];
            const ref = res["COMMIT_REF"].substr(0, 7);
            const time = res["BUILD_TIME"];

            text += `Current build: ${branch}@${ref} (${time}).`;
        }

        cy.add({
            "data": {"id": "preset_information", "label": text},
            "position": {"x": 0, "y": -50},
            "group": "nodes",
            "removed": false,
            "selected": false,
            "selectable": true,
            "locked": false,
            "grabbable": false,
            "pannable": true,
            "classes": "preset_information"
        });
    });
};
