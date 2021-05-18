//
// Copyright (c) 2020-2021 w-gao
//

export const descriptions: any = {
    "propiophenone": `<p class="note">This is a ketone!</p>`,
    "aminobenzene": `<p class="note">This is an amine!</p>`,

    "benzene__toluene": `<p class="note">Usually work well with 1 or 2 carbons. Rearrangement may occur with > 2 carbons.</p><p>If you want to attach more than 2 carbons, do a FC-ACYL first, then reduce the ketone with H2/Pd.</p>`,
    // "benzene__propiophenone": `<p class="note">Works well with any carbon chain.</p>`,

    "alcohol_nonaryl__alkene": `Lecture 4, page 3.<p class="note">Both are Elimination reactions. Tertiary alcohols undergo E1 with any base.</p><img src="https://user-images.githubusercontent.com/20177171/118429546-ce6c2980-b686-11eb-8e99-c0c0beeccccb.png" alt="rxn"/>`,
    "alkene__alcohol_nonaryl": `<p class="note">Primary, secondary, and tertiary alcohols can be synthesized depending on the starting alkene and reagent.</p><p>OM/DM gives markovnikov alcohol, and hydroboration oxidation gives anti-mark product.</p>`,

    "alcohol_nonaryl__ether": `<p>Lecture 4, page 6.</p><img src="https://user-images.githubusercontent.com/20177171/118429961-cd87c780-b687-11eb-8d72-8568895c603a.png" alt="rxn"/>`,
    "alkene__ether": `<p>Lecture 4, page 7.</p><img src="https://user-images.githubusercontent.com/20177171/118429793-54887000-b687-11eb-84cb-e723f30da12f.png" alt="rxn"/>`,
    "epoxide__priOH": `<p class="note">Good way to synthesize primary alcohol with two extra c-atoms from primary bromide.</p><img src="https://user-images.githubusercontent.com/20177171/118573250-059a1380-b737-11eb-89df-aa9835b8bf06.png" alt="rxn"/>`,
    // "formaldehyde__priOH": `<h1>Synthesis of 1&deg;-OH from formaldehyde w/ grignard</h1><p class="note">Product has one extra C-atom.</p>`,
    "carbonyl_noLG__alcohol_nonaryl": `<p class="note">Formaldehyde, aldehyde, and ketone react with grignard to give primary, secondary, and tertiary alcohols, respectively.</p><img src="https://user-images.githubusercontent.com/20177171/117243252-b9240f00-adeb-11eb-86a1-af8deff60a70.png" alt="rxn"/>`,
    // "RMgBr__alcohol_nonaryl": `<p class="note">Formaldehyde, aldehyde, and ketone react with grignard to give primary, secondary, and tertiary alcohols, respectively.</p><p>Phenol not included.</p>`,
    "carboxylic_acid__acid_chloride": `<h1>Synthesis of acid chloride from carboxylic acid</h1><img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Formation_of_acyl_chloride.svg" alt="rxn"/><p class="note">Metro station</p>`,

    "benzylic_carbon_chain__benzoic_acid": `<p class="note">Any carbon chain will be turned into benzoic acid upon treatment with CrO3.</p>`,
    "bromide__carboxylic_acid": `Lecture 7, page 5. Can be primary/secondary/tertiary/aromatic. <p class="note">Product has one extra C-atom (from CO<sub>2</sub>).</p>`,
    "bromide_pri_or_sec__carboxylic_acid": `Lecture 7, page 6.<p class="note">Product has one extra C-atom (from NaCN).</p>`,
    "carboxylic_acid__priOH": `<p class="note">Can also use BH<sub>3</sub>&bull;THF. Lecture 8, page 3.</p>`,
    // "carboxylic_acid__priOH_2": `Lecture 8, page 3.`,
    "acid_chloride__carboxylic_acid": `Lecture 8, page 3.<p class="note">H2O is a weak nucleophile.</p>`,
    "acid_chloride__tertOH": `<p class="note">Works with a carbonyl with a LG.</p>`,
    "acid_chloride__ketone": `<p class="note">Works with a carbonyl with a LG.</p>`,
    "acid_chloride__ester": `<p class="note">Works with any alcohol.</p>`,
    "ester__priOH": `<p class="note">The rest of the ester is broken off as -OH.</p><img src="https://user-images.githubusercontent.com/20177171/118417640-eaad9d80-b669-11eb-8dab-ce41792cad78.png" alt="rxn" />`,
    "ester__tertOH": `Lecture 8, page 6.<p class="note">The other part of the ester goes off as an alkoxide.</p><img src="https://user-images.githubusercontent.com/20177171/117520921-d4b02680-af5f-11eb-933e-0a1bfd9039b0.png" alt="rxn" />`,

    "amide__amine": `<p>Lecture 9, page 2.</p><img src="https://user-images.githubusercontent.com/20177171/117494008-94818180-af28-11eb-9993-642476c6f262.png" alt="rxn" /><p class="note">Use LiAlH4 followed by H3O+ to get an amine with a positive charge.</p><img src="https://user-images.githubusercontent.com/20177171/117494368-14a7e700-af29-11eb-9846-08fa73575312.png" alt="rxn"/>`,
    "priAmide__nitrile": `<p>Lecture 9, page 1.</p><p class="note">Same number of c-atoms.</p><img src="https://user-images.githubusercontent.com/20177171/117527300-c4a83f00-af7f-11eb-873a-4d891d620a65.png" alt="rxn"/>`,
    "bromide_pri_or_sec__nitrile": `Lecture 9, page 1.<p class="note">SN2 reaction. Product has one extra C-atom.</p><img src="https://user-images.githubusercontent.com/20177171/117493883-6c921e00-af28-11eb-8b94-60d5a7b8e6e1.png" alt="rxn"/>`,
    "nitrile__carboxylic_acid": `Lecture 9, page 2.<p class="note">Can also use HCl + xs H2O</p><img src="https://user-images.githubusercontent.com/20177171/117494087-b2e77d00-af28-11eb-8c65-71a39ceda8c2.png" alt="rxn" />`,
    "nitrile__ketone": `Lecture 9, page 3.<p class="note">The carbonyl c-atom in the ketone comes from the nitrile.</p><img src="https://user-images.githubusercontent.com/20177171/117521145-23aa8b80-af61-11eb-89ed-f20c4eb1d794.png" alt="rxn"/>`,

    "aldehyde__nitrile": `<p>Lecture 13, page 3.</p><img src="https://user-images.githubusercontent.com/20177171/118412039-a95ac500-b64c-11eb-84ca-ae141ebf77b7.png" alt="rxn"/><p>Use H2/Pd (or dibah) followed by H3O+.</p><p class="note">Opposite reaction:</p><img src="https://user-images.githubusercontent.com/20177171/118412147-3e5dbe00-b64d-11eb-9b94-8b21b61df71a.png" alt="rxn"/>`,
};
