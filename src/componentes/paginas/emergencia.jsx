import React, { Fragment } from "react";
import { CardIncendio } from "../internos/cardIncendio";
import { CardMatPel } from "../internos/cardMatPel";
import { CardRescate } from "../internos/cardRescate";
import { CardOtros } from "../internos/cardOtros";

export function Emergencia() {
    return (
        <Fragment>
            <div className="container text-center">
                <div className="row ">
                    <div className="col-12 col-md-3">
                        {/*INCENDIO*/}
                        <CardIncendio></CardIncendio>
                    </div>
                    <div className="col-12 col-md-3">
                        {/*MATATERIALES-PELIGROSOS*/}
                        <CardMatPel></CardMatPel>
                    </div>
                    <div className="col-12 col-md-3">
                        {/*RESCATES*/}
                        <CardRescate></CardRescate>
                    </div>
                    <div className="col-12 col-md-3">
                        {/*OTROS-SERVICIOS*/}
                        <CardOtros></CardOtros>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}