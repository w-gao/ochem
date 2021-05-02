//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef, Fragment, useState} from "react";
import cytoscape from "cytoscape";
import {add_reactions, Reaction} from "../data/reactions";
import {Popup} from "../components/popup";
import {descriptions} from "../data/descriptions";
import {reload, save} from "../dev/devtools";
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
        boxSelectionEnabled: false,
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
            animate: true,
        },
    });

    // Dev tools
    if (!DEBUG_MODE) {
        return cy;
    }

    let win: any = window;
    // win.cy = cy;
    win.reload = () => reload(cy);
    win.save = () => save(cy);

    setTimeout(() => {
        win.reload();
    }, 100);

    return cy;
}

const HomeView = () => {
    const cyRef = useRef(null);
    const [popup, setPopup] = useState<string | null>(null);

    useEffect(() => {
        console.debug("component did mount");

        if (!cyRef.current) {
            console.error("target div is undefined");
            return;
        }

        let cy = setUp(cyRef.current);

        let reactions: Reaction[] = [];
        add_reactions(reactions);

        cy.on("tap", "edge", function (ev: any) {
            const edge = ev.target;
            // console.log("tapped " + edge.id());

            const description = descriptions[edge.id()];
            if (description) {
                setPopup(description);
            }
        });

    }, []);

    return (
        <Fragment>
            <div className="cy" ref={cyRef}>
            </div>
            <Popup data={popup} hidePopup={() => setPopup(null)}/>
        </Fragment>
    );
}

export default HomeView;
