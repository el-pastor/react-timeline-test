import React from "react";
import classNames from "classnames";
import {InView} from "react-intersection-observer";

export interface ITimelineElement {
    children?: JSX.Element | JSX.Element[];
    arrowStyle?: any;
    contentStyle?: any;
    date?: string;
    icon?: any;
    iconStyle?: any;
    style?: any;
    intersectionObserverProps?: {
        rootMargin: string;
        triggerOnce: boolean;
    };
}

export const TimelineElement: React.FC<ITimelineElement> = ({
                                                                children = "",
                                                                arrowStyle = null,
                                                                contentStyle = null,
                                                                date = "",
                                                                icon = null,
                                                                iconStyle = null,
                                                                style = null,
                                                                intersectionObserverProps = {
                                                                    rootMargin: "0px 0px -40px 0px",
                                                                    triggerOnce: true
                                                                }
                                                            }) => (
    <InView {...intersectionObserverProps}>
        {({inView, ref}) => (
            <div
                ref={ref}
                className={classNames("timeline-element", {
                    "timeline-element--no-children": children === ""
                })}
                style={style}
            >
                <>
                    <span
                        style={iconStyle}
                        className={classNames("timeline-element-icon", {
                            "bounce-in": inView,
                            "is-hidden": !inView
                        })}
                    >
                        {icon}
                    </span>
                    <div
                        style={contentStyle}
                        className={classNames("timeline-element-content", {
                            "bounce-in": inView,
                            "is-hidden": !inView
                        })}
                    >
                        <div className={classNames("timeline-element-date")}>{date}</div>
                        <div
                            style={arrowStyle}
                            className="timeline-element-content-arrow"
                        />
                        {children}
                    </div>
                </>
            </div>
        )}
    </InView>
);
