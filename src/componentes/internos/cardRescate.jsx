import React, { Fragment } from "react";
import '../internos/cardStyle.css'


export function CardRescate() {
    return (
        <Fragment>
            <div className="card card-custom">
                <img src="https://picsum.photos/200" className="card-img" alt="..." />
                <div className="card-body">
                    <h2 className="card-title" >Rescates</h2>
                </div>
                <div className="card-footer" >
                    <a href="#" className="btn btn-primary btn-custom">10-3</a>
                    <a href="#" className="btn btn-primary btn-custom">10-4</a>
                    <a href="#" className="btn btn-primary btn-custom">10-14</a>
                    <a href="#" className="btn btn-primary btn-custom">10-16</a>
                </div>
            </div>
        </Fragment>
    );
}