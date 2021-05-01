//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef} from "react";
import cytoscape from "cytoscape";
import "./home.scss";
import getReactions from "../data/reactions";


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
                    "control-point-distance": (node) => node.data("cpd") || undefined,
                    "control-point-weight": (node) => node.data("cpw") || undefined,
                    "line-color": "#BFBFBF",
                    "target-arrow-color": "#BFBFBF",
                    "text-wrap": "wrap",
                    "target-arrow-shape": "triangle",
                }
            }
        ],
        // elements: fetch("generated_reactions.json").then(res => res.json()),
        elements: getReactions(),
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
     * Log the list of updated nodes to the console.
     */
    const updatePositions = () => {
        let elements = cy.json()['elements'];
        window.localStorage.setItem("elements", JSON.stringify(elements));

        // loop through the newest data and output a list of changes.
        let oldNodes = getReactions().nodes;
        let nodes = elements.nodes;

        let data: any = {}
        for (let i in oldNodes) {
            let id = oldNodes[i].data.id
            data[id] = oldNodes[i].position || {};
        }

        for (let i in nodes) {
            if (nodes.hasOwnProperty(i)) {
                let id = nodes[i].data.id;
                let oldPos = JSON.stringify(data[id]);

                // round positions
                nodes[i].position.x = Math.floor(nodes[i].position.x * 100) / 100;
                nodes[i].position.y = Math.floor(nodes[i].position.y * 100) / 100;

                let pos = JSON.stringify(nodes[i].position);

                if (oldPos !== pos) {
                    console.log(`"${id}":: ${pos.replace(/"/gi, '').slice(1, -1)}`)
                }
            }
        }
    }

    let win: any = window;
    // win.cy = cy;
    win.updatePositions = updatePositions;
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
