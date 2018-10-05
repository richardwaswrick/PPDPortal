import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div Class="col-md-12">&nbsp;</div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <hr />
                        <div><p>&copy; {new Date().getFullYear()} - Perpetual Delivery LLC</p></div>
                    </div>
                </div>
            </div>            
        )
    }
}