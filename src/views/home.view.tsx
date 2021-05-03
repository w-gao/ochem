//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef, useState} from "react";
import cytoscape from "cytoscape";
import {Popup} from "../components/popup";
import {descriptions} from "../data/descriptions";
import {reload, save} from "../lib/devtools";
import "./home.scss";


const DEBUG_MODE = window.location.search.substring(1) === "debug";
console.log(`debug=${DEBUG_MODE}`);


/**
 * Given an HTML div element reference, set up cytoscape.
 *
 * @param ref an HTML div element.  Can be null.
 */
const setUp = (ref: HTMLDivElement | null) => {

    const cy: any = cytoscape({
        container: ref,
        boxSelectionEnabled: true,
        minZoom: 0.3,  // out
        maxZoom: 5,
        style: [
            {
                selector: "node",
                css: {
                    "content": "data(label)",
                    "text-valign": "center",
                    "text-halign": "center",
                    "text-wrap": "wrap",
                    "shape": "rectangle",
                    "width": "140px",
                    "height": "60px",
                    "backgroundColor": "#d1f8ff",
                    "border-width": "2px",
                    "border-color": "#232323",
                }
            },
            {
                // when node is selected
                selector: ":selected",
                css: {
                    "backgroundColor": "#7abff7",
                }
            },
            {
                selector: ":parent",
                css: {
                    "text-valign": "top",
                    "text-halign": "center",
                    "shape": "round-rectangle",
                    "backgroundColor": "#FFFFFF"
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
            animate: true,
        },
    });

    // Dev tools
    if (!DEBUG_MODE) {
        return cy;
    }

    let win: any = window;
    win.cy = cy;
    win.reload = (lock: boolean = false) => reload(cy, lock);
    win.save = (lock: boolean = false) => save(cy, lock);

    setTimeout(() => {
        win.reload();
    }, 100);

    return cy;
}

const HomeView = () => {
    const cyRef = useRef(null);
    const [popup, setPopup] = useState<string | null>(null);

    useEffect(() => {
        if (!cyRef.current) {
            console.error("target div is undefined");
            return;
        }

        let cy = setUp(cyRef.current);

        // register events...
        cy.on("tap", "edge,node", (ev: any) => {
            const edge = ev.target;
            const description = descriptions[edge.id()];
            // if (description) {
            setPopup(description);
            // }
        });

        cy.on("zoom pan", () => {
            const element = document.getElementById("graph");
            if (!element) return;

            const factor = 60 * cy.zoom();
            element.style.backgroundSize = `${factor}px ${factor}px, ${factor}px ${factor}px`;

            const pan = cy.pan();
            const x = pan.x;
            const y = pan.y;
            element.style.backgroundPosition = `${x}px ${y}px, ${x}px ${y}px`;
        });


        // hide popup when escape is pressed
        const keydownEvent = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") {
                setPopup(null);
            }
        };
        document.addEventListener("keydown", keydownEvent);

        return () => {
            document.removeEventListener("keydown", keydownEvent);
        };
    }, []);

    return (
        <div id="graph">
            <div className="cy" ref={cyRef}/>
            <Popup data={popup} hidePopup={() => setPopup(null)}/>
        </div>
    );
};

export default HomeView;
