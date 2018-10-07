import React from 'react';
import  { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">&nbsp;</div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <div><p>&copy; {new Date().getFullYear()} - Perpetual Delivery LLC</p></div>
                    </div>
                </div>
            </div>            
        );
    }
}