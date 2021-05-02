//
// Copyright (c) 2020-2021 w-gao
//

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
const defaultNode = (id: number): any => {
    return {data: {id: id}, position: {x: 0, y: 0}};
};

/**
 * Create a default edge with the given id.
 */
const defaultEdge = (id: number): any => {
    return {data: {id: id}};
};

/**
 * Reload canvas with the up-to-date data from reactions.ts.
 */
export const reload = (cy: any) => {
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

        element.data.parent = val.parent;
        element.data.label = val.label;

        element.position.x = parseFloat((element.position.x).toFixed(2));
        element.position.y = parseFloat((element.position.y).toFixed(2));

        // element.selectable = false;
        // element.grabbable = false;

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

        // element.selectable = false;
        // element.grabbable = false;

        results.edges.push(element);
    });

    // console.log(JSON.stringify(results, null, 4));
    cy.elements().remove();
    cy.add(results);
};

/**
 * Save canvas positions to localStorage, so it can be re-imported back to our app.
 */
export const save = (cy: any) => {
    reload(cy);
    window.localStorage.setItem("elements", JSON.stringify(cy.json()["elements"]));
};
