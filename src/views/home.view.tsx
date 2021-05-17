//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef, useState} from "react";
import cytoscape from "cytoscape";
import {Popup} from "../components/popup";
import {descriptions} from "../data/descriptions";
import {load, reload, save, exportImg} from "../lib/devtools";
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
    console.log(`debug=${debug ? "true" : "false"}`);

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
            {selector: "node[height]", css: {"height": "data(height)"}},
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
                selector: "edge",
                css: {
                    "content": "data(label)",
                    "curve-style": "straight",
                    // "curve-style": "unbundled-bezier",
                    "line-color": "#778eaa",
                    "target-arrow-color": "#778eaa",
                    "text-wrap": "wrap",
                    "target-arrow-shape": "triangle",
                    "arrow-scale": 2.5,
                }
            },
            {selector: "edge[cpd]", css: {"curve-style": "unbundled-bezier", "control-point-distances": "data(cpd)"}},
            {selector: "edge[cpw]", css: {"curve-style": "unbundled-bezier", "control-point-weights": "data(cpw)"}},
            {selector: "edge[sep]", css: {"source-endpoint": "data(sep)"}},
            {selector: "edge[tep]", css: {"target-endpoint": "data(tep)"}},
            // @ts-ignore
            {selector: "edge[tt]", css: {"curve-style": "taxi", "taxi-turn": "data(tt)"}},
            // @ts-ignore
            {selector: "edge[td]", css: {"curve-style": "taxi", "taxi-direction": "data(td)"}},
            {
                selector: ":selected",
                css: {
                    "background-color": "#C5E2FF",
                    "line-color": "#459EFF",
                    "target-arrow-color": "#459EFF",
                }
            },
            {
                selector: ".preset_information",
                css: {
                    "shape": "barrel",
                    "background-opacity": 0,
                    "width": "400px",
                    "height": "120px",
                }
            }
        ],
        elements: load(settings.lock, settings.debug || settings.lock),
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
        win.exportImg = (scale: number = 0.7) => exportImg(cy, scale);
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
        // console.log(settings);

        let cy = setUp(cyRef.current, settings);

        // register events...
        if(settings.debug || settings.popup) {
            cy.on("tap", "edge,node", (ev: any) => {
                const edge = ev.target;
                const description = descriptions[edge.id()];
                // if (description) {
                setPopup(description);
                // }
            });
        }

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
