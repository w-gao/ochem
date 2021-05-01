//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef} from "react";
import cytoscape from "cytoscape";
import getReactions from "../data/reactions";
import "./home.scss";


const DEBUG_MODE = true;


/**
 * Given an HTML div element reference, set up cytoscape.
 *
 * @param ref an HTML div element.  Can be null.
 */
const setUp = (ref: HTMLDivElement | null) => {

    const cy: any = cytoscape({
        container: ref,
        boxSelectionEnabled: false,
        style: [
            {
                selector: "node",
                css: {
                    "content": "data(label)",
                    "text-valign": "center",
                    "text-halign": "center",
                    "shape": "round-rectangle",
                    "width": "120px",
                    "height": "40px",
                    "backgroundColor": "#ADD8E6",  // lightblue
                }
            },
            {
                selector: ":parent",
                css: {
                    "text-valign": "top",
                    "text-halign": "center",
                    "backgroundColor": "#FFFFFF",
                }
            },
            {
                selector: "edge",
                css: {
                    "content": "data(label)",
                    "curve-style": "unbundled-bezier",
                    "line-color": "#BFBFBF",
                    "target-arrow-color": "#BFBFBF",
                    "text-wrap": "wrap",
                    "target-arrow-shape": "triangle",
                }
            },
            {selector: "edge[cpd]", css: {"control-point-distances": "data(cpd)"}},
            {selector: "edge[cpw]", css: {"control-point-weights": "data(cpw)"}},
        ],
        elements: fetch("generated_reactions.json").then(res => res.json()),
        layout: {
            name: "preset",
            // padding: 5,
        }
    });

    // Dev tools
    if (!DEBUG_MODE) {
        return;
    }

    /**
     * Reload canvas with the up-to-date data from reactions.ts.
     */
    let reload = () => {
        if (!DEBUG_MODE) {
            return;
        }

        let results: any = {
            nodes: [],
            edges: [],
        }

        let current = cy.json()['elements'];

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
        }

        /**
         * Create a default edge with the given id.
         */
        const defaultEdge = (id: number): any => {
            return {data: {id: id}};
        }

        // live data
        let current_nodes: any = list2obj(current.nodes);
        let current_edges: any = list2obj(current.edges);

        let elements = getReactions();
        let setting_nodes: any[] = elements.nodes;
        let setting_edges: any[] = elements.edges;

        let element;
        setting_nodes.forEach((val, index, arr) => {
            element = current_nodes[val.id] || defaultNode(val.id);

            // update with new info
            element.data.parent = val.parent;
            element.data.label = val.label;

            element.position.x = parseFloat((element.position.x).toFixed(2));
            element.position.y = parseFloat((element.position.y).toFixed(2));

            results.nodes.push(element);
        });

        setting_edges.forEach((val, index, arr) => {
            element = current_edges[val.id] || defaultEdge(val.id);

            // update with new info
            element.data.source = val.source;
            element.data.target = val.target;
            element.data.label = val.label;

            element.data.cpd = val.cpd || undefined;
            element.data.cpw = val.cpw || undefined;

            results.edges.push(element);
        });

        // console.log(JSON.stringify(results, null, 4));
        cy.elements().remove();
        cy.add(results);
    };

    /**
     * Save canvas positions to localStorage, so it can be re-imported back to our app.
     */
    let save = () => {
        reload();
        window.localStorage.setItem("elements", JSON.stringify(cy.json()['elements']));
    };

    let win: any = window;
    // win.cy = cy;
    win.reload = reload;
    win.save = save;
}

const HomeView = () => {
    let cyRef = useRef(null);

    useEffect(() => {
        if (!cyRef.current) {
            console.error("target div is undefined");
            return;
        }

        setUp(cyRef.current);

    }, []);

    return (
        <div className="cy" ref={cyRef}>
        </div>
    );
}

export default HomeView;
