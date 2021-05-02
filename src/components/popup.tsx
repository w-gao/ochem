//
// Copyright (c) 2020-2021 w-gao
//

import {Fragment, useEffect} from "react";
import "./popup.scss";


export const Popup = (props: any) => {

    let data = props.data;
    let hidePopup = props.hidePopup;

    useEffect(() => {
        if (!data) {
            return;
        }

        const keydownEvent = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") {
                console.debug("escape key pressed");
                hidePopup();
            }
        };

        console.debug("adding ev listener");
        document.addEventListener("keydown", keydownEvent);

        return () => {
            console.debug("removing ev listener");
            document.removeEventListener("keydown", keydownEvent);
        };
    }, [data, hidePopup]);

    if (!data) {
        return <></>;
    }

    return (
        <Fragment>
            <div className="overlay" onClick={hidePopup}/>
            <div className="popup">
                <div className="closeButton" onClick={hidePopup}>{"\u274C"}</div>

                <div className="content" dangerouslySetInnerHTML={{__html: data}}/>
            </div>
        </Fragment>
    );
};
