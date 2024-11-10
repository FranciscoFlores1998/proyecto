import React, { Fragment } from "react";
import '../internos/cardStyle.css'


export function CardMatPel() {
    return (
        <Fragment>
            <div className="card card-custom">
                <img src="https://picsum.photos/200" className="card-img" alt="..." />
                <div className="card-body">
                    <h2 className="card-title">Materiales Peligrosos</h2>
                </div>
                <div className="card-footer" >
                    <a href="#" className="btn btn-primary btn-custom">10-5</a>
                    <a href="#" className="btn btn-primary btn-custom">10-6</a>
                </div>
            </div>
        </Fragment>
    );
}