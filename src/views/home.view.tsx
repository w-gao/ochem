//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef, useState} from "react";
import cytoscape from "cytoscape";
import {Popup} from "../components/popup";
import {descriptions} from "../data/descriptions";
import {reload, save} from "../lib/devtools";
import {parseUrl} from "../lib/utils";
import "./home.scss";


/**
 * Given an HTML div element reference, set up cytoscape.
 *
 * @param ref an HTML div element.  Can be null.
 * @param settings user requested settings from the URL.
 */
const setUp = (ref: HTMLDivElement | null, settings: any) => {
    const debug = settings.debug;
    console.log(`debug=${debug ? 'true' : 'false'}`);

    const cy: any = cytoscape({
        container: ref,
        boxSelectionEnabled: true,
        minZoom: 0.3,  // out
        maxZoom: 5,
        zoom: 0.8,
        pan: {x: 363, y: 587},
        // the ordering of the styles implies the priority.
        style: [
            {
                selector: "node",
                css: {
                    "text-wrap": "wrap",
                    "shape": "rectangle",
                    "background-color": "#D1F8FF",
                    "border-width": "2px",
                    "border-color": "#4F4F4F",
                    "width": "150px",
                    "height": "65px",
                }
            },
            {
                selector: "node[label]",
                css: {
                    "content": "data(label)",
                    "text-valign": "center",
                    "text-halign": "center",
                }
            },
            {
                selector: "node[imgUrl]",
                css: {
                    "text-valign": "bottom",
                    "padding-top": "20px",
                    "padding-bottom": "20px",
                    // @ts-ignore: typings not up to date.
                    "background-width-relative-to": "inner",
                    "background-image": "data(imgUrl)",
                    "background-fit": "contain",
                }
            },
            {
                selector: ":parent",
                css: {
                    "text-valign": "top",
                    "text-halign": "center",
                    "shape": "round-rectangle",
                    "background-color": "#FFFFFF",
                    "border-opacity": 0.8,
                    // @ts-ignore
                    "padding": "20px",
                }
            },
            {
                selector: ":selected",
                css: {
                    "background-color": "#d1eaff",
                }
            },
            {
                selector: "edge",
                css: {
                    "content": "data(label)",
                    "curve-style": "unbundled-bezier",
                    "line-color": "#B2B2B2",
                    "target-arrow-color": "#B2B2B2",
                    "text-wrap": "wrap",
                    "target-arrow-shape": "triangle",
                    "arrow-scale": 2.5,
                }
            },
            {selector: "edge[cpd]", css: {"control-point-distances": "data(cpd)"}},
            {selector: "edge[cpw]", css: {"control-point-weights": "data(cpw)"}},
            {selector: "edge[sep]", css: {"source-endpoint": "data(sep)"}},
            {selector: "edge[tep]", css: {"target-endpoint": "data(tep)"}},
        ],
        elements: fetch("generated_reactions.json").then(res => res.json()),
        layout: {
            name: "preset",
            animate: !debug,
            fit: true,
        },
    });

    // dev tools
    if (debug) {
        let win: any = window;
        win.cy = cy;
        win.reload = (lock: boolean = false) => reload(cy, lock);
        win.save = (lock: boolean = false) => save(cy, lock);
    }

    if (debug || settings.lock) {
        setTimeout(() => {
            reload(cy, settings.lock);
        }, 100);
    }

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

        const url = parseUrl();
        const settings = url.query;

        let cy = setUp(cyRef.current, settings);

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
