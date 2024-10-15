import React, { Fragment } from "react";
import { Cabecera } from "./componentes/cabecera";
import '../src/style.css';
import { Page } from "./componentes/page";

export function App() {

    return (
        <Fragment>
            <Cabecera></Cabecera>
            <Page></Page>
        </Fragment>
    );
}