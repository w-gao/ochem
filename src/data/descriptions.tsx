//
// Copyright (c) 2020-2021 w-gao
//

export const descriptions: any = {
    "propiophenone": `<p class="note">This is a ketone!</p>`,
    "aminobenzene": `<p class="note">This is an amine!</p>`,

    "benzene__toluene": `<p class="note">Usually work well with 1 or 2 carbons. Rearrangement may occur with > 2 carbons.</p><p>If you want to attach more than 2 carbons, do a FC-ACYL first, then reduce the ketone with H2/Pd.</p>`,
    "benzene__propiophenone": `<p class="note">Works well with any carbon chain.</p>`,

    // "formaldehyde__priOH": `<h1>Synthesis of 1&deg;-OH from formaldehyde w/ grignard</h1><p class="note">Product has one extra C-atom.</p>`,
    "carbonyl_noLG__alcohol_nonaryl": `<p class="note">Formaldehyde, aldehyde, and ketone react with grignard to give primary, secondary, and tertiary alcohols, respectively.</p><img src="https://user-images.githubusercontent.com/20177171/117243252-b9240f00-adeb-11eb-86a1-af8deff60a70.png" alt="rxn"/>`,
    "RMgBr__alcohol_nonaryl": `<p class="note">Formaldehyde, aldehyde, and ketone react with grignard to give primary, secondary, and tertiary alcohols, respectively.</p><p>Phenol not included.</p>`,
    "carboxylic_acid__acid_chloride": `<h1>Synthesis of acid chloride from carboxylic acid</h1><img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Formation_of_acyl_chloride.svg" alt="rxn"/><p class="note">Metro station</p>`,

    "benzylic_carbon_chain__benzoic_acid": `<p class="note">Any carbon chain will be turned into benzoic acid upon treatment with CrO3.</p>`,
    "bromide__carboxylic_acid": `Lecture 7, page 5. Can be primary/secondary/tertiary/aromatic. <p class="note">Product has one extra C-atom (from CO<sub>2</sub>).</p>`,
    "priBr__carboxylic_acid": `Lecture 7, page 6.<p class="note">Product has one extra C-atom (from NaCN).</p>`,
    "carboxylic_acid__priOH": `<p class="note">Can also use BH<sub>3</sub>&bull;THF. Lecture 8, page 3.</p>`,
    // "carboxylic_acid__priOH_2": `Lecture 8, page 3.`,
    "acid_chloride__carboxylic_acid": `Lecture 8, page 3.<p class="note">H2O is a weak nucleophile.</p>`,

    "amide__amine": `<p class="note">Use LiAlH4 followed by H3O+ to get an amine with a positive charge.</p>`,
    "nitrile__carboxylic_acid": `<p class="note">Can also use HCl + xs H2O</p>`
};
