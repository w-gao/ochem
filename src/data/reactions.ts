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


const COMPOUNDS = {

    // alcohols
    "pri-OH": `1${deg()}-OH`,
    "sec-OH": `2${deg()}-OH`,
    "tert-OH": `3${deg()}-OH`,
    "aryl-OH": "R-OH (Aryl)",

    // carbonyls w/out LG
    'formaldehyde': 'Formaldehyde',
    'aldehyde': 'Aldehyde',
    'ketone': 'Ketone',

};


const add_alcohol_compounds = (list: any[]) => {
    list.push(
        {
            data: {id: "alcohol", label: "Alcohols"},
            position: {x:389.45,y:-96.41},
        },
        {
            data: {id: "alcohol_nonaryl", parent: "alcohol", label: ""},
            position: {x:304.5,y:-96.41},
        },
        {
            data: {id: "pri-OH", parent: "alcohol_nonaryl", label: COMPOUNDS["pri-OH"]},
            position: {x:312.55,y:-130.69},
        },
        {
            data: {id: "sec-OH", parent: "alcohol_nonaryl", label: COMPOUNDS["sec-OH"]},
            position: {x:144.27,y:-62.22},
        },
        {
            data: {id: "tert-OH", parent: "alcohol_nonaryl", label: COMPOUNDS["tert-OH"]},
            position: {x:464.72,y:-62.13},
        },
        {
            data: {id: "aryl-OH", parent: "alcohol", label: COMPOUNDS["aryl-OH"]},
            position: {x:646.14,y:-95.69},
        });
};

const add_carbonyl_no_LG_compounds = (list: any[]) => {
    list.push(
        {
            data: {id: "carbonyl_noLG", label: "Carbonyls (no LG)"},
            position: {x: 367.85, y: 278.79},
        },
        {
            data: {id: "formaldehyde", parent: "carbonyl_noLG", label: COMPOUNDS["formaldehyde"]},
            position: {x: 363.85, y: 278.73},
        },
        {
            data: {id: "aldehyde", parent: "carbonyl_noLG", label: COMPOUNDS["aldehyde"]},
            position: {x: 214.18, y: 278.02},
        },
        {
            data: {id: "ketone", parent: "carbonyl_noLG", label: COMPOUNDS["ketone"]},
            position: {x: 521.53, y: 279.56},
        },
    );
}

// const add_carbonyl_no_LG_compounds = (list: any[]) => {
//     list.push(
//         {
//             data: {id: "carbonyl_noLG", label: "Carbonyls (no LG)"},
//             position: {},
//         },
//     );
// }


const add_reactions = (edges: any[]) => {
    edges.push(
        {
            data: {
                id: randomId(), source: "pri-OH", target: "aldehyde", label: REAGENTS["NaBH4"],
                cpd: "4em",
            }
        },
        {
            data: {
                id: randomId(), source: "aldehyde", target: "pri-OH", label: REAGENTS["PCC"],
                cpw: "0.2",
            }
        },
        {
            data: {
                id: randomId(), source: "formaldehyde", target: "pri-OH", label: REAGENTS["grignard"],
            }
        },
        {
            data: {
                id: randomId(), source: "aldehyde", target: "sec-OH", label: REAGENTS["grignard"],
                cpd: "-4em",
            }
        },
        {
            data: {
                id: randomId(), source: "ketone", target: "tert-OH", label: REAGENTS["grignard"],
            }
        },
    );
};

const getReactions = () => {

    let nodes: any[] = [];
    let edges: any[] = [];

    add_alcohol_compounds(nodes);
    add_carbonyl_no_LG_compounds(nodes);

    add_reactions(edges);

    // test data
    nodes.push({
            data: {id: "d", label: "d"},
            position: {x: -189.01, y: 0},
        },
        {
            data: {id: "e", label: "e"},
            position: {x: -150.4, y: 99.62},
        })

    edges.push({
        data: {
            id: "test", source: "e", target: "d", label: REAGENTS["Br2/FeBr3"],
            position: {x: 0, y: 0},
        }
    })
    // end test data

    return {
        "nodes": nodes,
        "edges": edges,
    };
}

export default getReactions;
