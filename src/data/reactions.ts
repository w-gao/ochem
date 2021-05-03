//
// Copyright (c) 2020-2021 w-gao
//

import {Compound, Reaction, sub, deg, reagent} from "../lib/utils";


// master list of CHEM 8B reagents!
const REAGENTS = {
    // alkenes -> R-OH
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
    "PCC": reagent("PCC", "[o]"),
    "CrO3": reagent(`CrO${sub(3)}/H${sub(3)}O+`, "[o]"),

    // reducing agents
    "NaBH4": reagent(`1. NaBH${sub(4)}`, `2. H${sub(3)}O+`),
    "LiAlH4": reagent(`1. LiAlH${sub(4)}`, `2. H${sub(3)}O+`),

    // acids
    "HA": reagent("HA"),
    "TsOH": reagent("TsOH"),

    // carboxylic acid / acid chloride reactions
    // thionyl chloride - turns carboxylic acid into acid chloride
    "SOCl2": reagent(`SOCl${sub(2)}`, `- SO${sub(2)}`, "- HCl"),

    "alcohol/pyr": reagent("R-OH", "pyr.", "- HCl"),  // to esters
    "NH3": reagent(`xs NH${sub(3)}`, '- HCl'),  // to pri-amides

    // grignard -> acid (w/ 1 extra c-atom)
    "CO2": reagent(`1) CO${sub(2)}`, `2) H${sub(3)}O+`),
    // bromide -> acid (w/ 1 extra c-atom)
    "NaCN": reagent("NaCN", `2) 2H${sub(3)}O+`, `- NH${4}OH`),

};


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

const add_benzylic_compounds = (list: Compound[]) => {
    list.push(
        // {id: "benzylic", label: "Benzylic compounds"},

        {id: "benzene", label: "Benzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Benzene-Kekule-2D-skeletal.png/422px-Benzene-Kekule-2D-skeletal.png"},
        {id: "toluene", label: "Toluene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Toluol.svg/800px-Toluol.svg.png"},
        {id: "propiophenone", label: "_Propiophenone", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Propiophenone.png"},
        {id: "benezolic_acid", label: "Benezolic acid", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Benzoic_acid.svg"},
        {id: "bromobenzene", label: "Bromobenzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brombenzol_-_Bromobenzene.svg/800px-Brombenzol_-_Bromobenzene.svg.png"},
        {id: "nitrobenzene", label: "Nitrobenzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Nitrobenzol.svg/800px-Nitrobenzol.svg.png"},
        {id: "aminobenzene", label: "Aminobenzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Structural_formula_of_aniline.svg/800px-Structural_formula_of_aniline.svg.png"},
        {id: "benzyl_alcohol", label: "Benzyl alcohol", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Alkohol_benzylowy.svg/2560px-Alkohol_benzylowy.svg.png"},
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

const add_carboxylic_acid_compounds = (list: Compound[]) => {
    list.push(
        {id: "carboxylic_acid", label: "Carboxylic acid\nR-(COOH)"},
        {id: "acid_chloride", label: "Acid chloride\n[metro station]", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/General_structural_formula_of_carboxylic_acid_chlorides.svg/1920px-General_structural_formula_of_carboxylic_acid_chlorides.svg.png"},
    );
};

const add_ester_compounds = (list: Compound[]) => {
    list.push(
        {id: "ester", label: "Esters"},
    );
};

const add_amide_compounds = (list: Compound[]) => {
    list.push(
        {id: "amide", label: "Amides"},
        {id: "priAmide", label: `1${deg()}-amide`, parent: "amide"},
        {id: "secAmide", label: `2${deg()}-amide`, parent: "amide"},
        {id: "tertAmide", label: `3${deg()}-amide`, parent: "amide"},
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


        // carboxylic acids
        {id: "priOH__carboxylic_acid", source: "priOH", target: "carboxylic_acid", label: REAGENTS["CrO3"]},
        {id: "carboxylic_acid__acid_chloride", source: "carboxylic_acid", target: "acid_chloride", label: REAGENTS["SOCl2"]},
        {id: "acid_chloride__ester", source: "acid_chloride", target: "ester", label: REAGENTS["alcohol/pyr"]},
        {id: "acid_chloride__priAmide", source: "acid_chloride", target: "priAmide", label: REAGENTS["NH3"]},


    );
};


const getReactions = () => {
    let nodes: Compound[] = [];
    let edges: Reaction[] = [];

    add_bromide_compounds(nodes);
    add_alkene_compounds(nodes);
    add_benzylic_compounds(nodes);
    add_alcohol_compounds(nodes);
    // add_ether_compounds(nodes);
    add_carbonyl_no_LG_compounds(nodes);
    add_carboxylic_acid_compounds(nodes);

    add_ester_compounds(nodes);
    add_amide_compounds(nodes);
    // add_amine_compounds(nodes);

    add_reactions(edges);

    return {
        "nodes": nodes,
        "edges": edges,
    };
};

export default getReactions;
