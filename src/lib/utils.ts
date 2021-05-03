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
 * Given any number of reagents, return a formatted string with line breaks.
 *
 * @param args Reagents.
 */
export const reagent = (...args: string[]): string => {
    return args.join("\n");
}
