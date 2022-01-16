import * as React from 'react';
import { Toggle } from './ToggleButtonDef';

export interface StatusCardProps {
    DefaultStatus: StatusTypes
}

export interface StatusCardState {
    Status: StatusTypes
}

export type StatusTypes = "Good" | "Slow Down" | "Stuck";

export default class StatusCard extends React.Component<StatusCardProps, StatusCardState> {

    static defaultProps = {
        DefaultStatus: "Good"
    }

    state = {
        Status: this.props.DefaultStatus
    }

    toggleClickHandler = () => {
        this.setState((prevState) => {
            if (prevState.Status === "Good") {
                return { Status: "Stuck" };
            }
            if (prevState.Status === "Slow Down") {
                return { Status: "Good" };
            }
            return { Status: "Slow Down" };
        })
    }

    getColor() {
        if (this.state.Status === "Good") {
            return "#0F0";
        }
        if (this.state.Status === "Slow Down") {
            return "#f4cf53";
        }
        return "#F00";
    }

    render() {
        return (
            <>
                <div
                    style={{
                        background: this.getColor(),
                        color: "#000",
                        height: "50px",
                        width: "200px",
                    }}>
                    {this.state.Status}
                </div>
                <Toggle ClickHandler={this.toggleClickHandler} />
            </>
        )
    }
}
