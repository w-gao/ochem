//
// Copyright (c) 2020-2021 w-gao
//


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


const COMPOUNDS = {

    // alcohols
    "alcohol": "Alcohol",
    "pri-OH": `1${deg()}-OH`,
    "sec-OH": `2${deg()}-OH`,
    "tert-OH": `3${deg()}-OH`,
    "aryl-OH": "Aryl alcohol",


};


export const reactions = {
    nodes: [
        {
            data: {id: "alcohol", label: COMPOUNDS["alcohol"]},
            position: {x: -0.33545750141651, y: 49.98316771105976},
        },
        {
            data: {id: "pri-OH", parent: "alcohol", label: COMPOUNDS["pri-OH"]},
            position: {x: 0, y: 0},
        },
        {
            data: {id: "sec-OH", parent: "alcohol", label: COMPOUNDS["sec-OH"]},
            position: {x: 0, y: 49.64771020964325},
        },
        {
            data: {id: "tert-OH", parent: "alcohol", label: COMPOUNDS["tert-OH"]},
            position: {x: -0.6709150028330173, y: 99.96633542211951},
        },
        {
            data: {id: "d", label: "d"},
            position: {x: -206.8221991273843, y: -135.68590133834763},
        },
        {
            data: {id: "e", label: "e"},
            position: {x: -133.31242962993738, y: 204.5665811999631},
        },

    ],
    edges: [
        {
            data: {
                id: "test", source: "e", target: "d", label: REAGENTS["Br2/FeBr3"],
                position: {x: 0, y: 0},
            }
        },

    ]
};
