//
// Copyright (c) 2020-2021 w-gao
//

// This file contains a bunch of developer tools. They are probably not that important for users.

import getReactions from "../data/reactions";


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


/**
 * Reload canvas with the up-to-date data from reactions.ts while keeping
 * metadata information such as positions.
 */
export const reload = (cy: any, lock: boolean = false) => {
    let results: any = {
        nodes: [],
        edges: [],
    }

    let current = cy.json()["elements"];

    // live data
    let current_nodes: any = list2obj(current.nodes);
    let current_edges: any = list2obj(current.edges);

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
        // element.position.x = parseFloat((element.position.x).toFixed(0));
        // element.position.y = parseFloat((element.position.y).toFixed(0));
        element.position.x = Math.floor(element.position.x);
        element.position.y = Math.floor(element.position.y);

        element.selectable = !lock;
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

        element.selectable = !lock;
        element.grabbable = !lock;
        element.pannable = true;  // allow pan for all

        results.edges.push(element);
    });

    // console.log(JSON.stringify(results, null, 4));
    cy.elements().remove();
    cy.add(results);
};

/**
 * Save canvas positions to localStorage, so it can be re-imported
 * back to our app.
 */
export const save = (cy: any, lock: boolean = false) => {
    reload(cy, lock);
    window.localStorage.setItem("elements", JSON.stringify(cy.json()["elements"]));
};
