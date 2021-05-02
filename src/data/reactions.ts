//
// Copyright (c) 2020-2021 w-gao
//


// /**
//  * Get a somewhat random string with a fixed length.
//  *
//  * @param length length of the string.
//  */
// const randomId = (length: number = 8) => {
//     return Array(length)
//         .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
//         .map(x => x[Math.floor(Math.random() * x.length)])
//         .join("");
// }


/**
 * Return the subscript of the given number as an HTML unicode string.
 *
 * @param num Subscript number. Must be between 0 and 10.
 */
const sub = (num: number): string => {

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
const deg = (): string => {
    return String.fromCharCode(176);
}


/**
 * Given any number of reagents, return a formatted string with line breaks.
 *
 * @param args Reagents.
 */
const reagent = (...args: string[]): string => {
    return args.join("\n");
}


// master list of CHEM 8B reagents!
const REAGENTS = {
    "OM/DM": reagent("OM/DM"),
    "HB=": reagent("HB: / [o]"),  // hydroboration oxidation

    "Br2/FeBr3": reagent(`Br${sub(2)}`, `FeBr${sub(3)}`),
    "PBr3": reagent(`PBr${sub(3)}`),
    "Mg": reagent("Mg", "ether"),
    "grignard": reagent("1. grignard", `2. H${sub(3)}O+`),

    // 1/2-OH -> alkenes
    "POCl3": reagent(`1. POCl${sub(3)}`, "2. pyr."),
    "E1": reagent("E1"),  // E1 reaction

    // oxidation
    "PCC": reagent("PCC", "  [o]"),
    "CrO3": reagent(`CrO${sub(3)}/H${sub(3)}O+`, "[o]"),

    // reducing agents
    "NaBH4": reagent(`1. NaBH${sub(4)}`, `2. H${sub(3)}O+`),
    "LiAlH4": reagent(`1. LiAlH${sub(4)}`, `2. H${sub(3)}O+`),

    // acids
    "HA": reagent("HA"),
    "TsOH": reagent("TsOH"),

};


export interface Compound {
    id: string;
    label: string;
    parent?: string;
}


export interface Reaction {
    id: string;
    source: string;
    target: string;
    label: string;

    cpd?: string;
    cpw?: string;

    description?: string;
}


const add_bromide_compounds = (list: Compound[]) => {
    list.push(
        {id: "bromide", label: "Bromides"},

        {id: "priBr", label: `1${deg()}-Br`, parent: "bromide"},
        {id: "secBr", label: `2${deg()}-Br`, parent: "bromide"},
        {id: "tertBr", label: `3${deg()}-Br`, parent: "bromide"},
        {id: "arylBr", label: `R-Br (Aryl)`, parent: "bromide"},
    );
};

const add_alkene_compounds = (list: Compound[]) => {
    list.push(
        {id: "alkene", label: "Alkenes"},
        {id: "monoAlkene", label: "Mono-sub'd \nalkene", parent: "alkene"},
        {id: "diAlkene", label: "Di-sub'd \nalkene", parent: "alkene"},
        {id: "triAlkene", label: "Tri-sub'd \nalkene", parent: "alkene"},
    );
};

const add_alcohol_compounds = (list: Compound[]) => {
    list.push(
        {id: "alcohol", label: "Alcohols"},
        {id: "alcohol_nonaryl", label: "", parent: "alcohol"},

        {id: "priOH", label: `1${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "secOH", label: `2${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "tertOH", label: `3${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "arylOH", label: `R-OH (Aryl)`, parent: "alcohol"},
    );
};

const add_carbonyl_no_LG_compounds = (list: Compound[]) => {
    list.push(
        {id: "carbonyl_noLG", label: "Carbonyls (no LG)"},
        {id: "formaldehyde", label: "Formaldehyde", parent: "carbonyl_noLG"},
        {id: "aldehyde", label: "Aldehyde", parent: "carbonyl_noLG"},
        {id: "ketone", label: "Ketone", parent: "carbonyl_noLG"},
    );
};


export const add_reactions = (edges: Reaction[]) => {
    edges.push(
        // carbonyls --[ reduction ]--> alcohols
        {id: "priOH__aldehyde", source: "priOH", target: "aldehyde", label: REAGENTS["NaBH4"], cpd: "5em"},
        {id: "aldehyde__priOH", source: "aldehyde", target: "priOH", label: REAGENTS["PCC"]},

        // carbonyls + grignard => alcohols
        {id: "formaldehyde__priOH", source: "formaldehyde", target: "priOH", label: REAGENTS["grignard"], cpw: "0.2"},
        {id: "aldehyde__secOH", source: "aldehyde", target: "secOH", label: REAGENTS["grignard"], cpd: "-8em"},
        {id: "ketone__tertOH", source: "ketone", target: "tertOH", label: REAGENTS["grignard"]},
    );
};


const getReactions = () => {
    let nodes: Compound[] = [];
    let edges: Reaction[] = [];

    add_bromide_compounds(nodes);
    add_alkene_compounds(nodes);
    add_alcohol_compounds(nodes);
    add_carbonyl_no_LG_compounds(nodes);

    add_reactions(edges);

    return {
        "nodes": nodes,
        "edges": edges,
    };
}

export default getReactions;
