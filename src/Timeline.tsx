import React from "react";
import classNames from "classnames";
import { ITimelineElement } from "./TimelineElement";

interface iTimeline {
    animate?: boolean;
    className?: string;
    layout?: "1-column-left" | "1-column" | "2-columns" | "1-column-right";
    lineColor?: string;
    children: ITimelineElement[];
}

const Timeline: React.FC<iTimeline> = ({
                                           animate = true,
                                           layout = "2-columns",
                                           lineColor = "#555",
                                           children
                                       }) => {
    if (typeof window === "object") {
        document.documentElement.style.setProperty("--line-color", lineColor);
    }
    return (
        <div
            className={classNames("timeline", {
                "timeline--animate": animate,
                "timeline--two-columns": layout === "2-columns",
                "timeline--one-column-left":
                    layout === "1-column" || layout === "1-column-left",
                "timeline--one-column-right": layout === "1-column-right"
            })}
        >
            {children}
        </div>
    );
};

export default Timeline;
