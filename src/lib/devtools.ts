//
// Copyright (c) 2020-2021 w-gao
//

// This file contains a bunch of developer tools. They are probably not that important for users.

import getReactions from "../data/reactions";


/**
 * Given an env object from env.json, return a new cytoscape node displaying
 * this environment info.
 */
const getInfoNode = (env: any): any => {
    const version = env["VERSION"] || "v0.1";
    let gitInfo = "local";
    if (env["BRANCH"] && env["COMMIT_REF"]) {
        const branch = env["BRANCH"];
        const ref = env["COMMIT_REF"].substr(0, 7);
        gitInfo = `${branch}@${ref}`
    }
    const time = env["BUILD_TIME"] || "live";

    let text = `~~ CHEM 8B Reactions Map ${version} ~~\n\n`;
    text += `Current build: ${gitInfo} (${time}).`;

    return {
        "data": {"id": "preset_information", "label": text},
        "position": {"x": 0, "y": -50},
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbable": false,
        "pannable": true,
        "classes": "preset_information"
    }
};


/**
 * Given a list of objects, return a key-value pair object where
 * the obj.id is the key.
 */
const list2obj = (list: []) => {
    if (!list) {
        return {};
    }
    return list.reduce((obj, val: any) => ({...obj, [val.data.id]: val}), {})
};


/**
 * Create a default node with the given id.
 */
const defaultNode = (id: string): any => {
    return {data: {id: id}, position: {x: 0, y: 0}};
};


/**
 * Create a default edge with the given id.
 */
const defaultEdge = (id: string): any => {
    return {data: {id: id}};
};


const regenerate = (data: any, lock: boolean = false) => {
    let results: any = {
        nodes: [],
        edges: [],
    }

    // data from cytoscape
    let current_nodes: any = list2obj(data.nodes);
    let current_edges: any = list2obj(data.edges);

    let elements = getReactions();
    let settings_nodes: any[] = elements.nodes;
    let settings_edges: any[] = elements.edges;

    let element;
    settings_nodes.forEach((val) => {
        element = current_nodes[val.id] || defaultNode(val.id);

        if (!val.label.startsWith("_")) {
            element.data.label = val.label;
        }

        if (val.imgUrl) {
            element.data.imgUrl = val.imgUrl;
        }

        element.data.parent = val.parent;
        // element.position.x = parseFloat((element.position.x).toFixed(2));
        // element.position.y = parseFloat((element.position.y).toFixed(2));
        element.position.x = Math.floor(element.position.x / 10) * 10;
        element.position.y = Math.floor(element.position.y / 10) * 10;

        element.data.height = val.height || undefined;

        element.selectable = true;
        element.grabbable = !lock;
        element.pannable = lock;  // allow pan if locked

        results.nodes.push(element);
    });

    settings_edges.forEach((val) => {
        element = current_edges[val.id] || defaultEdge(val.id);

        element.data.source = val.source;
        element.data.target = val.target;
        element.data.label = val.label;

        // control point distances & weights
        element.data.cpd = val.cpd || undefined;
        element.data.cpw = val.cpw || undefined;

        // endpoints
        element.data.sep = val.sep || undefined;
        element.data.tep = val.tep || undefined;

        // taxi turn
        element.data.tt = val.tt || undefined;
        element.data.td = val.td || undefined;

        element.selectable = true;
        element.grabbable = !lock;
        element.pannable = true;  // allow pan for all

        results.edges.push(element);
    });

    // console.log(JSON.stringify(results, null, 4));
    return results;
};


/**
 * Load cytoscape data.
 */
export const load = async (lock: boolean = false, regen: boolean = false) => {
    let data = await fetch("generated_reactions.json").then(res => res.json());
    let env = await fetch("env.json").then(res => res.json());

    if (regen) {
        data = regenerate(data, lock);
    }

    data.nodes.push(getInfoNode(env));
    return data;
};


/**
 * Reload canvas with the up-to-date data from reactions.ts while keeping
 * metadata information such as positions.
 */
export const reload = (cy: any, lock: boolean = false) => {
    const current = cy.json()["elements"];

    cy.elements().remove();
    cy.add(regenerate(current, lock));
};

/**
 * Save canvas positions to localStorage, so it can be re-imported
 * back to our app.
 */
export const save = (cy: any, lock: boolean = false) => {
    reload(cy, lock);
    window.localStorage.setItem("elements", JSON.stringify(cy.json()["elements"]));
};


/**
 * Given a cytoscape instance, export the current map as a PNG file.  Note that
 * DOM-specific elements are not included (e.g.: the background set via CSS
 * will not be included in the final output).
 */
export const exportImg = (cy: any, scale: number = 0.7) => {
    const base64 = cy.png({bg: "#FEFEFE", full: true, scale: scale})

    const image = new Image();
    image.src = base64;
    window.open("")?.document.write(image.outerHTML);
}
