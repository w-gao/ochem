//
// Copyright (c) 2020-2021 w-gao
//

import {Compound, Reaction, sub, deg, bull, reagent} from "../lib/utils";


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
    "H2/Pd": reagent(`H${sub(2)}`, "Pd"),  // ketone -> alkane
    "NaBH4": reagent(`1. NaBH${sub(4)}`, `2. H${sub(3)}O+`),
    "LiAlH4": reagent(`1. LiAlH${sub(4)}`, `2. H${sub(3)}O+`),
    "LiAlH4;H2O": reagent(`1. LiAlH${sub(4)}`, `2. H${sub(2)}O`),  // LiAlH4 with H2O (for amide or nitrile reduction)
    "BH3 THF": reagent(`1. BH${sub(3)} ${bull()} THF`, `2. H${sub(3)}O+`),  // from textbook

    // carboxylic acid / acid chloride reactions
    "Mg;CO2": reagent("1. Mg (grignard)", `2. CO${sub(2)}`, `3. H${sub(3)}O+`),
    // nitrile hydrolysis (pri-Br --[ NaCN/H3O+ (2 equiv.) ]--> carboxylic acid)
    "NaCN;H3O+": reagent("1. NaCN", `2. H${sub(3)}O+ (2 equiv.)`, "", `- NH${4}OH`),  // SN2
    // for turning pri-Br -> nitrile
    "NaCN": reagent("NaCN"),  // SN2

    // thionyl chloride - turns carboxylic acid into acid chloride
    "SOCl2": reagent(`SOCl${sub(2)}`, "", `- SO${sub(2)}`, "- HCl"),

    "alcohol/pyr": reagent("R-OH", "pyr.", "- HCl"),  // to esters
    "NH3": reagent(`xs NH${sub(3)}`, "- HCl"),  // to pri-amides
    "H3CNH2": reagent(`xs CH${sub(3)}NH${sub(2)}`, "- HCl"),  // to sec-amides
    "(CH3)2NH": reagent(`xs (CH${sub(3)})${sub(2)}NH`, "- HCl"),  // to tert-amides

    // acids
    "HA": reagent("HA"),
    "TsOH": reagent("TsOH"),
    // "HCl;H2O": reagent("HCl", `H${sub(2)}O`),
    "xs H3O+": reagent(`xs H${sub(3)}O+`),  // turns nitrile into carboxylic acid

    // bases
    "NaOH": reagent("NaOH"),  // esters/amides -> carboxylic acids

    // strong Nuc
    "R-MgBr": reagent("R-MgBr", "(grignard)"),  // same as grignard; written this way for better representation

    // weak Nuc
    "cuprate": reagent(`R${sub(2)}CuLi`, "(cuprate)"),  // lithium dialkyl cuprate
    "H2O": reagent(`H${sub(2)}O`),

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
        {id: "benzylic", label: "Benzylic compounds"},
        {id: "benzylic_carbon_chain", label: "", parent: "benzylic"},

        {id: "benzene", label: "Benzene", parent: "benzylic", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Benzene-Kekule-2D-skeletal.png/422px-Benzene-Kekule-2D-skeletal.png"},
        {id: "toluene", label: "Toluene", parent: "benzylic_carbon_chain", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Toluol.svg/800px-Toluol.svg.png"},
        {id: "propylbenzene", label: "_Propylbenzene", parent: "benzylic_carbon_chain", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Structural_formula_of_n-propylbenzene.svg"},
        {id: "propiophenone", label: "_Propiophenone", parent: "benzylic", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Propiophenone.png"},
        // {id: "nitrobenzene", label: "Nitrobenzene", parent: "benzylic", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Nitrobenzol.svg/800px-Nitrobenzol.svg.png"},
        // {id: "aminobenzene", label: "_Aminobenzene", parent: "benzylic", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Structural_formula_of_aniline.svg/800px-Structural_formula_of_aniline.svg.png"},
        // {id: "benzyl_alcohol", label: "Benzyl alcohol", parent: "benzylic", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Alkohol_benzylowy.svg/2560px-Alkohol_benzylowy.svg.png"},
    );
};

const add_alcohol_compounds = (list: Compound[]) => {
    list.push(
        // {id: "alcohol", label: "Alcohols"},
        {id: "alcohol_nonaryl", label: "Alcohols"}, // parent: "alcohol"},

        {id: "priOH", label: `1${deg()}-OH`, parent: "alcohol_nonaryl", height: "150px"},
        {id: "secOH", label: `2${deg()}-OH`, parent: "alcohol_nonaryl"},
        {id: "tertOH", label: `3${deg()}-OH`, parent: "alcohol_nonaryl"},
        // {id: "arylOH", label: `Phenol`, parent: "alcohol"},
    );
};

const add_ether_compounds = (list: Compound[]) => {
    list.push(
        // {id: "ether", label: "Ethers"},
    );
};

const add_carbonyl_no_LG_compounds = (list: Compound[]) => {
    list.push(
        {id: "carbonyl_noLG", label: "Carbonyls (w/ no LG)"},
        {id: "formaldehyde", label: "Formaldehyde", parent: "carbonyl_noLG"},
        {id: "aldehyde", label: "Aldehyde", parent: "carbonyl_noLG"},
        {id: "ketone", label: "Ketone", parent: "carbonyl_noLG", height: "150px"},
    );
};

const add_carboxylic_acid_compounds = (list: Compound[]) => {
    list.push(
        {id: "carboxylic_acid", label: "Carboxylic acids"},
        // formic acid / acetic acid    <- might be worth separating out, but not needed now.
        {id: "carboxylic_acid_nonaryl", label: `R-COOH`, parent: "carboxylic_acid"},
        {id: "benzoic_acid", label: "Benzoic acid", parent: "carboxylic_acid", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Benzoic_acid.svg"},

        // {id: "carbonyl_wLG", label: "Carbonyls (w/ LG)"},
        {id: "acid_chloride", label: "Acid chloride", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/General_structural_formula_of_carboxylic_acid_chlorides.svg/1920px-General_structural_formula_of_carboxylic_acid_chlorides.svg.png"},
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

const add_amine_compounds = (list: Compound[]) => {
    list.push(
        {id: "amine", label: "Amines"},
        {id: "priAmines", label: `1${deg()}-amine`, parent: "amine"},
        {id: "secAmines", label: `2${deg()}-amine`, parent: "amine"},
        {id: "tertAmines", label: `3${deg()}-amine`, parent: "amine"},
    );
};

const add_nitrile_compounds = (list: Compound[]) => {
    list.push(
        {id: "nitrile", label: "Nitrile"},
    );
};


export const add_reactions = (edges: Reaction[]) => {
    edges.push(
        // -- EAS --
        {id: "benzene__bromobenzene", source: "benzene", target: "bromobenzene", label: REAGENTS["Br2/FeBr3"]},
        {id: "benzene__toluene", source: "benzene", target: "toluene", label: REAGENTS["CH3Cl/AlCl3"]},  // FC-ALK
        {id: "benzene__propiophenone", source: "benzene", target: "propiophenone", label: REAGENTS["R-COCl/AlCl3"]},  // FC-ACYL
        {id: "propiophenone__propylbenzene", source: "propiophenone", target: "propylbenzene", label: REAGENTS["H2/Pd"], },

        // -- ALCOHOLS --
        // ~ alcohol synthesis
        // carbonyls --[ reduction ]--> alcohols
        {id: "aldehyde__priOH", source: "aldehyde", target: "priOH", label: REAGENTS["NaBH4"], cpw: "0.5"},
        {id: "ketone__secOH", source: "ketone", target: "secOH", label: REAGENTS["NaBH4"], cpw: "0.5"},
        {id: "ester__priOH", source: "ester", target: "priOH", label: REAGENTS["LiAlH4"], },  // strong hydride can also reduce esters

        // grignard synthesis - very useful reagent, not just for alcohols
        {id: "alcohol_nonaryl__bromide_nonaryl", source: "alcohol_nonaryl", target: "bromide_nonaryl", label: REAGENTS["PBr3"], cpd: "30em", cpw: "0.2", sep: "-30% -50%", tep: "30% -50%"},
        {id: "bromide__RMgBr", source: "bromide", target: "RMgBr", label: REAGENTS["Mg"]},

        // carbonyls + grignard => alcohols
        // {id: "formaldehyde__priOH", source: "formaldehyde", target: "priOH", label: REAGENTS["grignard"]},
        // {id: "aldehyde__secOH", source: "aldehyde", target: "secOH", label: REAGENTS["grignard"]},
        // {id: "ketone__tertOH", source: "ketone", target: "tertOH", label: REAGENTS["grignard"]},
        {id: "carbonyl_noLG__alcohol_nonaryl", source: "carbonyl_noLG", target: "alcohol_nonaryl", label: REAGENTS["grignard"], cpd: "15em", sep: "-40% -50%", tep: "50% -45%"},

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
        {id: "priOH__aldehyde", source: "priOH", target: "aldehyde", label: REAGENTS["PCC"], cpw: "0.5"},  // mild! CrO3 gives carboxylic acid below
        {id: "secOH__ketone", source: "secOH", target: "ketone", label: REAGENTS["CrO3"], cpw: "0.5"},

        // alkenes => carbonyls (ozonolysis)
        //

        // ~carbonyl reactions
        // carbonyls => alkenes (wittig)

        // -- CARBOXYLIC ACID --
        // ~ carboxylic acid synthesis
        {id: "priOH__carboxylic_acid", source: "priOH", target: "carboxylic_acid", label: REAGENTS["CrO3"], cpd: "4em", sep: "-50% -30%", tep: "50% -30%"},
        {id: "benzylic_carbon_chain__benzoic_acid", source: "benzylic_carbon_chain", target: "benzoic_acid", label: REAGENTS["CrO3"], },
        // grignard --[ CO2 ]--> carboxylic acid (w/ one extra c-atom)
        {id: "bromide__carboxylic_acid", source: "bromide", target: "carboxylic_acid", label: REAGENTS["Mg;CO2"], tep: "-50% 30%"},
        {id: "priBr__carboxylic_acid", source: "priBr", target: "carboxylic_acid", label: REAGENTS["NaCN;H3O+"], tep: "-50% -20%"},  // nitrile hydrolysis (w/ one extra c-atom)

        // ~ carboxylic acid reactions
        // carboxylic acid <--> acid chloride
        {id: "carboxylic_acid__acid_chloride", source: "carboxylic_acid", target: "acid_chloride", label: REAGENTS["SOCl2"], cpd: "-5em", sep: "50% 40%", tep: "0 -50%"},
        {id: "acid_chloride__carboxylic_acid", source: "acid_chloride", target: "carboxylic_acid", label: REAGENTS["H2O"], },  // reverse

        // acid --[ R-OH ]--> esters
        {id: "acid_chloride__ester", source: "acid_chloride", target: "ester", label: REAGENTS["alcohol/pyr"]},
        // acid --[ amines ]--> amides
        {id: "acid_chloride__priAmide", source: "acid_chloride", target: "priAmide", label: REAGENTS["NH3"]},
        {id: "acid_chloride__secAmide", source: "acid_chloride", target: "secAmide", label: REAGENTS["H3CNH2"]},
        {id: "acid_chloride__tertAmide", source: "acid_chloride", target: "tertAmide", label: REAGENTS["(CH3)2NH"]},

        // esters & amides --[ NaOH ]--> carboxylic acids
        {id: "ester__carboxylic_acid", source: "ester", target: "carboxylic_acid", label: REAGENTS["NaOH"]},
        {id: "amide__carboxylic_acid", source: "amide", target: "carboxylic_acid", label: REAGENTS["NaOH"], cpd: "-10em", cpw: "0.8", sep: "-35% -50%", tep: "-10% 50%"},

        // ~~ acyl substitution reactions (Nuc attacks & kicks out LG)
        // strong Nuc adds twice; weak Nuc adds once
        {id: "carboxylic_acid__priOH", source: "carboxylic_acid", target: "priOH", label: REAGENTS["LiAlH4"]},  // LiAlH4 -> strong hydride add twice
        // {id: "carboxylic_acid__priOH_2", source: "carboxylic_acid", target: "priOH", label: REAGENTS["BH3 THF"], cpd: "3em", sep: "50% 12%", tep: "-50% 20%"},

        // (more) acid chloride reactions
        // reduction of acid chloride
        {id: "acid_chloride__priOH", source: "acid_chloride", target: "priOH", label: REAGENTS["NaBH4"]},

        // strong and weak Nuc attack
        {id: "acid_chloride__tertOH", source: "acid_chloride", target: "tertOH", label: REAGENTS["R-MgBr"]},  // strong Nuc adds twice
        {id: "acid_chloride__ketone", source: "acid_chloride", target: "ketone", label: REAGENTS["cuprate"]},  // weak Nuc adds once

        // amides --[ LiAlH4/H3O+/HCl ]--> amines
        {id: "amide__amine", source: "amide", target: "amine", label: REAGENTS["LiAlH4;H2O"]},

        {id: "priBr__nitrile", source: "priBr", target: "nitrile", label: REAGENTS["NaCN"], sep: "50% 50%"},
        {id: "priAmide__nitrile", source: "priAmide", target: "nitrile", label: REAGENTS["SOCl2"], cpw: "0.5"},
        {id: "nitrile__priAmide", source: "nitrile", target: "priAmide", label: REAGENTS["LiAlH4;H2O"], cpw: "0.5"},
        {id: "nitrile__carboxylic_acid", source: "nitrile", target: "carboxylic_acid", label: REAGENTS["xs H3O+"], tep: "-40% 50%"},
        {id: "nitrile__ketone", source: "nitrile", target: "ketone", label: REAGENTS["R-MgBr"], sep: "50% 0", tep: "-50% 25%"},


        // grignard as a starting material - too cluttered to put in main graph; create different nodes instead
        // {id: "RMgBr__carboxylic_acid", source: "RMgBr", target: "carboxylic_acid", label: REAGENTS["CO2"]},
        // {id: "RMgBr__alcohol_nonaryl", source: "RMgBr", target: "alcohol", label: "Carbonyls (w/ no LG)"},

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

    // w/ LG
    add_carboxylic_acid_compounds(nodes);
    add_ester_compounds(nodes);
    add_amide_compounds(nodes);

    add_amine_compounds(nodes);
    add_nitrile_compounds(nodes);

    add_reactions(edges);

    return {
        "nodes": nodes,
        "edges": edges,
    };
};

export default getReactions;
