//
// Copyright (c) 2020-2021 w-gao
//


/**
 * Get a somewhat random string with a fixed length.
 *
 * @param length length of the string.
 */
const randomId = (length: number = 8) => {
    return Array(length)
        .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        .map(x => x[Math.floor(Math.random() * x.length)])
        .join('');
}


/**
 * Return the subscript of the given number as an HTML unicode string.
 *
 * @param num Subscript number. Must be between 0 and 10.
 */
const sub = (num: number): string => {

    if (num < 0 || num > 11) {
        throw Error(`Expected num to be between 0 and 10, but got ${num}.`);
    }

    // unfortunately the renderer is extremely limited so we can"t use HTML 
    // formatting for node and edges. We can only rely on unicode chars.
    return String.fromCharCode(8320 + num);
}

const deg = (): string => {
    /**
     * Return the degree symbol as an HTML unicode string.
     */
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


interface Compound {
    id: string;
    label: string;
    parent?: string;
}


interface Reaction {
    id: string;
    source: string;
    target: string;
    label: string;

    cpd?: string;
    cpw?: string;
}


const new_compound = (id: string, label: string, parent?: string): Compound => {
    return {
        id: id,
        label: label,
        parent: parent
    }
};


const add_alcohol_compounds = (list: Compound[]) => {
    list.push(
        new_compound("alcohol", "Alcohols"),
        new_compound("alcohol_nonaryl", "", "alcohol"),

        new_compound("pri-OH", `1${deg()}-OH`, "alcohol_nonaryl"),
        new_compound("sec-OH", `2${deg()}-OH`, "alcohol_nonaryl"),
        new_compound("tert-OH", `3${deg()}-OH`, "alcohol_nonaryl"),
        new_compound("aryl-OH", "R-OH (Aryl)", "alcohol"),
    );
};

const add_carbonyl_no_LG_compounds = (list: Compound[]) => {
    list.push(
        new_compound("carbonyl_noLG", "Carbonyls (no LG)"),
        new_compound("formaldehyde", "Formaldehyde", "carbonyl_noLG"),
        new_compound("aldehyde", "Aldehyde", "carbonyl_noLG"),
        new_compound("ketone", "Ketone", "carbonyl_noLG"),
    );
}


const add_reactions = (edges: Reaction[]) => {
    edges.push(
        {id: randomId(), source: "pri-OH", target: "aldehyde", label: REAGENTS["NaBH4"]},
        {id: randomId(), source: "aldehyde", target: "pri-OH", label: REAGENTS["PCC"],
            cpd: "5em",
        },
        {id: randomId(), source: "formaldehyde", target: "pri-OH", label: REAGENTS["grignard"]},
        {id: randomId(), source: "aldehyde", target: "sec-OH", label: REAGENTS["grignard"],
            cpd: "-4em"
        },
        {id: randomId(), source: "ketone", target: "tert-OH", label: REAGENTS["grignard"]},
    );
};


const getReactions = () => {

    let nodes: Compound[] = [];
    let edges: Reaction[] = [];

    add_alcohol_compounds(nodes);
    add_carbonyl_no_LG_compounds(nodes);

    add_reactions(edges);

    return {
        "nodes": nodes,
        "edges": edges,
    };
}

export default getReactions;
