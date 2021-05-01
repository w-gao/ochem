//
// Copyright (c) 2020-2021 w-gao
//

import {useEffect, useRef} from "react";
import cytoscape from "cytoscape";
import "./home.scss";
import {reactions} from "../data/reactions";


const HomeView = () => {
    let cyRef = useRef(null);

    useEffect(() => {
        if (!cyRef.current) {
            console.error("target div is undefined");
            return;
        }

        const cy: any = cytoscape({
            container: cyRef.current,
            boxSelectionEnabled: false,
            style: [
                {
                    selector: "node",
                    css: {
                        "content": "data(label)",
                        "text-valign": "center",
                        "text-halign": "center",
                        "shape": "rectangle",
                        "width": "100px",
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
                        "curve-style": "bezier",
                        "line-color": "#BFBFBF",
                        "target-arrow-color": "#BFBFBF",
                        "text-wrap": "wrap",
                        "target-arrow-shape": "triangle"
                    }
                }
            ],
            // elements: fetch("generated_reactions.json").then(res => res.json()),
            elements: reactions,
            layout: {
                name: "preset",
                // padding: 5
            }
        });

        let win: any = window;
        win.cy = cy;

    }, []);

    return (
        <div className="cy" ref={cyRef}>
        </div>
    );
}

export default HomeView;
