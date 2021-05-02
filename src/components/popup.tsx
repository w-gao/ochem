//
// Copyright (c) 2020-2021 w-gao
//

import "./popup.scss";


export const Popup = (props: any) => {

    let data = props.data;
    let hidePopup = props.hidePopup;

    if (!data) {
        return <></>;
    }

    return (
        <div className="container">
            <div className="overlay" onClick={hidePopup}/>
            <div className="popup">
                <div className="closeButton" onClick={hidePopup}>{"\u2716"}</div>

                <div className="content" dangerouslySetInnerHTML={{__html: data}}/>
            </div>
        </div>
    );
};
