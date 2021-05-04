//
// Copyright (c) 2020-2021 w-gao
//

import {Compound, Reaction, sub, deg, reagent} from "../lib/utils";


// master list of CHEM 8B reagents!
const REAGENTS = {
    // EAS
    "Br2/FeBr3": reagent(`Br${sub(2)}`, `FeBr${sub(3)}`),
    "CH3Cl/AlCl3": reagent(`CH${sub(3)}Cl`, `AlCl${sub(3)}`),  // FC-ALK
    "R-COCl/AlCl3": reagent("R-COCl", `AlCl${sub(3)}`),  // FC-ACYL

    // alkenes -> R-OH
    "OM/DM": reagent("OM/DM"),
    "HB=": reagent("HB: / [o]"),  // hydroboration oxidation

    "PBr3": reagent(`PBr${sub(3)}`),
    "Mg": reagent("Mg", "ether"),
    "grignard": reagent("1. grignard", `2. H${sub(3)}O+`),

    // alcohol -> alkenes
    "POCl3": reagent(`1. POCl${sub(3)}`, "2. pyr."),
    "E1": reagent("E1"),  // tertiary -OH; E1 reaction

    // oxidizing reagents
    "PCC": reagent("PCC", "[o]"),
    "CrO3": reagent(`CrO${sub(3)}/H${sub(3)}O+`, "[o]"),

    // reducing reagents
    "NaBH4": reagent(`1. NaBH${sub(4)}`, `2. H${sub(3)}O+`),
    "LiAlH4": reagent(`1. LiAlH${sub(4)}`, `2. H${sub(3)}O+`),
    // ketone -> alkane
    "H2/Pd": reagent(`H${sub(2)}`, "Pd"),

    // acids
    "HA": reagent("HA"),
    "TsOH": reagent("TsOH"),

    // carboxylic acid / acid chloride reactions
    "CO2": reagent(`1) CO${sub(2)}`, `2) H${sub(3)}O+`),
    "NaCN": reagent("1) NaCN", `2) 2H${sub(3)}O+`, `- NH${4}OH`),

    // thionyl chloride - turns carboxylic acid into acid chloride
    "SOCl2": reagent(`SOCl${sub(2)}`, `- SO${sub(2)}`, "- HCl"),

    "alcohol/pyr": reagent("R-OH", "pyr.", "- HCl"),  // to esters
    "NH3": reagent(`xs NH${sub(3)}`, '- HCl'),  // to pri-amides
    "H3CNH2": reagent(`xs CH${sub(3)}NH${sub(2)}`, '- HCl'),  // to sec-amides
    "(CH3)2NH": reagent(`xs (CH${sub(3)})${sub(2)}NH`, '- HCl'),  // to tert-amides

    // strong base - esters/amides -> carboxylic acids
    "NaOH": reagent("NaOH"),

};


const add_bromide_compounds = (list: Compound[]) => {
    list.push(
        {id: "bromide", label: "Bromides"},
        {id: "bromide_nonaryl", label: "", parent: "bromide"},

        {id: "priBr", label: `1${deg()}-Br`, parent: "bromide_nonaryl"},
        {id: "secBr", label: `2${deg()}-Br`, parent: "bromide_nonaryl"},
        {id: "tertBr", label: `3${deg()}-Br`, parent: "bromide_nonaryl"},
        {id: "bromobenzene", label: "Bromobenzene", parent: "bromide", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brombenzol_-_Bromobenzene.svg/800px-Brombenzol_-_Bromobenzene.svg.png"},

        // grignard
        {id: "RMgBr", label: "RMgBr\n(grignard)"},

    );
};

const add_alkene_compounds = (list: Compound[]) => {
    list.push(
        {id: "alkene", label: "Alkenes"},
        // {id: "monoAlkene", label: "Mono-sub'd \nalkene", parent: "alkene"},
        // {id: "diAlkene", label: "Di-sub'd \nalkene", parent: "alkene"},
        // {id: "triAlkene", label: "Tri-sub'd \nalkene", parent: "alkene"},
    );
};

const add_benzylic_compounds = (list: Compound[]) => {
    list.push(
        // {id: "benzylic", label: "Benzylic compounds"},
        {id: "benzylic_carbon_chain", label: ""},

        {id: "benzene", label: "Benzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Benzene-Kekule-2D-skeletal.png/422px-Benzene-Kekule-2D-skeletal.png"},
        {id: "toluene", label: "Toluene", parent: "benzylic_carbon_chain", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Toluol.svg/800px-Toluol.svg.png"},
        {id: "propylbenzene", label: "_Propylbenzene", parent: "benzylic_carbon_chain", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Structural_formula_of_n-propylbenzene.svg"},
        {id: "propiophenone", label: "_Propiophenone", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Propiophenone.png"},
        {id: "nitrobenzene", label: "Nitrobenzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Nitrobenzol.svg/800px-Nitrobenzol.svg.png"},
        {id: "aminobenzene", label: "_Aminobenzene", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Structural_formula_of_aniline.svg/800px-Structural_formula_of_aniline.svg.png"},
        // {id: "benzyl_alcohol", label: "Benzyl alcohol", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Alkohol_benzylowy.svg/2560px-Alkohol_benzylowy.svg.png"},
    );
};

const add_alcohol_compounds = (list: Compound[]) => {
    list.push(
        {id: "alcohol", label: "Alcohols"},
        {id: "alcohol_nonaryl", label: "", parent: "alcohol"},

        {id: "priOH", label: `1${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "secOH", label: `2${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "tertOH", label: `3${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "arylOH", label: `Phenol`, parent: "alcohol"},
    );
};

const add_ether_compounds = (list: Compound[]) => {
    list.push(
        {id: "ether", label: "Ethers"},
    );
};

const add_carbonyl_no_LG_compounds = (list: Compound[]) => {
    list.push(
        {id: "carbonyl_noLG", label: "Carbonyls (w/ no LG)"},
        {id: "formaldehyde", label: "Formaldehyde", parent: "carbonyl_noLG"},
        {id: "aldehyde", label: "Aldehyde", parent: "carbonyl_noLG"},
        {id: "ketone", label: "Ketone", parent: "carbonyl_noLG"},
    );
};

const add_carboxylic_acid_compounds = (list: Compound[]) => {
    list.push(
        {id: "carboxylic_acid", label: "Carboxylic acids"},
        // formic acid / acetic acid    <- might be worth separating out, but not needed now.
        {id: "carboxylic_acid_nonaryl", label: `R-COOH`, parent: "carboxylic_acid"},
        {id: "benzoic_acid", label: "Benzoic acid", parent: "carboxylic_acid", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Benzoic_acid.svg"},

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
        // -- EAS --
        {id: "benzene__bromobenzene", source: "benzene", target: "bromobenzene", label: REAGENTS["Br2/FeBr3"]},
        {id: "benzene__toluene", source: "benzene", target: "toluene", label: REAGENTS["CH3Cl/AlCl3"]},  // FC-ALK
        {id: "benzene__propiophenone", source: "benzene", target: "propiophenone", label: REAGENTS["R-COCl/AlCl3"]},  // FC-ACYL
        {id: "propiophenone__propylbenzene", source: "propiophenone", target: "propylbenzene", label: REAGENTS["H2/Pd"]},

        // -- ALCOHOLS --
        // ~ alcohol synthesis
        // carbonyls --[ reduction ]--> alcohols
        {id: "aldehyde__priOH", source: "aldehyde", target: "priOH", label: REAGENTS["NaBH4"]},
        {id: "ether__priOH", source: "ether", target: "priOH", label: REAGENTS["LiAlH4"], cpd: "-22em"},
        {id: "ketone__secOH", source: "ketone", target: "secOH", label: REAGENTS["NaBH4"]},

        // grignard synthesis - very useful reagent, not just for alcohols
        {id: "alcohol_nonaryl__bromide_nonaryl", source: "alcohol_nonaryl", target: "bromide_nonaryl", label: REAGENTS["PBr3"]},
        // {id: "bromide_nonaryl__RMgBr", source: "bromide_nonaryl", target: "RMgBr", label: REAGENTS["Mg"]},
        // {id: "bromobenzene__RMgBr", source: "bromobenzene", target: "RMgBr", label: REAGENTS["Mg"], cpd: "15em", cpw: "0.7"},
        {id: "bromide__RMgBr", source: "bromide", target: "RMgBr", label: REAGENTS["Mg"]},

        // carbonyls + grignard => alcohols
        {id: "formaldehyde__priOH", source: "formaldehyde", target: "priOH", label: REAGENTS["grignard"], cpd: "-5em", cpw: "0.2"},
        {id: "aldehyde__secOH", source: "aldehyde", target: "secOH", label: REAGENTS["grignard"], cpd: "-3em", cpw: "0.8"},
        {id: "ketone__tertOH", source: "ketone", target: "tertOH", label: REAGENTS["grignard"]},
        // same info but grignard can be written as the starting material
        {id: "RMgBr__alcohol_nonaryl", source: "RMgBr", target: "alcohol", label: "Carbonyls (w/ no LG)"},

        // ~ alcohol reactions
        // 1/2-OH --[ POCl3 ]--> alkenes
        //
        // 3-OH --[ E2 ]--> alkenes
        //

        // -- ETHERS --
        // ~ ether synthesis
        // alkyl bromide (1/2) w/ R-OH => ether (Williamson)
        // alcohol => ether (AM/DM)

        // ~ ether reactions
        // grignard --[ epoxide ]--> 1-OH w/ 2 c-atom

        // -- ALDEHYDES and KETONES (carbonyls with no leaving group) --
        // ~ carbonyl synthesis
        // alcohols --[ oxidation ]--> carbonyls
        {id: "priOH__aldehyde", source: "priOH", target: "aldehyde", label: REAGENTS["PCC"], cpd: "12em"},  // mild! CrO3 gives carboxylic acid below
        {id: "secOH__ketone", source: "secOH", target: "ketone", label: REAGENTS["CrO3"], cpd: "8em"},

        // alkenes => carbonyls (ozonolysis)
        //

        // ~carbonyl reactions
        // carbonyls => alkenes (wittig)

        // -- CARBOXYLIC ACID --
        // ~ carboxylic acid synthesis
        {id: "priOH__carboxylic_acid", source: "priOH", target: "carboxylic_acid", label: REAGENTS["CrO3"]},
        {id: "toluene__benzoic_acid", source: "toluene", target: "benzoic_acid", label: REAGENTS["CrO3"]},
        // grignard --[ CO2 ]--> carboxylic acid (w/ one extra c-atom)
        {id: "RMgBr__carboxylic_acid", source: "RMgBr", target: "carboxylic_acid", label: REAGENTS["CO2"]},
        {id: "priBr__carboxylic_acid", source: "priBr", target: "carboxylic_acid", label: REAGENTS["NaCN"]},  // nitrile hydrolysis (w/ one extra c-atom)

        // ~ carboxylic acid reactions
        {id: "carboxylic_acid__acid_chloride", source: "carboxylic_acid", target: "acid_chloride", label: REAGENTS["SOCl2"]},
        {id: "acid_chloride__ester", source: "acid_chloride", target: "ester", label: REAGENTS["alcohol/pyr"]},
        // acid --[ amines ]--> amides
        {id: "acid_chloride__priAmide", source: "acid_chloride", target: "priAmide", label: REAGENTS["NH3"]},
        {id: "acid_chloride__secAmide", source: "acid_chloride", target: "secAmide", label: REAGENTS["H3CNH2"]},
        {id: "acid_chloride__tertAmide", source: "acid_chloride", target: "tertAmide", label: REAGENTS["(CH3)2NH"]},

        // esters & amides --[ NaOH ]--> carboxylic acids
        {id: "ester__carboxylic_acid", source: "ester", target: "carboxylic_acid", label: REAGENTS["NaOH"]},
        {id: "amide__carboxylic_acid", source: "amide", target: "carboxylic_acid", label: REAGENTS["NaOH"], cpd: "-30em -5em", cpw: "0.7", sep: "-45% 0", tep: "-50% 0"},

        // acyl substitution reactions (Nuc attacks & kicks out LG)
        // strong Nuc adds twice; weak Nuc adds once

    );
};


const getReactions = () => {
    let nodes: Compound[] = [];
    let edges: Reaction[] = [];

    add_bromide_compounds(nodes);
    add_alkene_compounds(nodes);
    add_benzylic_compounds(nodes);
    add_alcohol_compounds(nodes);
    add_ether_compounds(nodes);
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
