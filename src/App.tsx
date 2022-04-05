import React, {useState} from "react";
import axios from "axios";
import {FixedQueue} from "./Utils/FixedQueue";

import Timeline from "./Components/Timeline";
import {ITimelineElement, TimelineElement} from "./Components/TimelineElement";
import "./styles.css";
import "./Components/timeline.css";
import "./Components/timelineElement.css";
import {useInterval} from "./Utils/useInterval";
import {accessibleColours} from "./Utils/accessibleColours";
import {Settings} from "./Utils/settings";

export default function App() {
    const [posts, setPosts] = useState(FixedQueue(Settings.elementsInTimeline, []));
    let [colour, setColour] = useState(0);

    const fetchPosts = async () => {
        if (posts.length === 0) {
            const response = await axios(
                "https://api.coindesk.com/v1/bpi/historical/close.json"
            );
            const initial = Object.entries(response.data.bpi)
                .map((entry, i) => {
                    let key = entry[0];
                    let value = entry[1];
                    return {
                        date: key + "T23:59:59+00:00",
                        value,
                        colour: accessibleColours[(i + 6) % 10]
                    };
                })
                .reverse();
            const test = FixedQueue(Settings.elementsInTimeline, []);
            test.unshift(...initial);
            setPosts(test);
        } else {
            const response = await axios(
                "https://api.coindesk.com/v1/bpi/currentprice.json"
            );
            const test = FixedQueue(Settings.elementsInTimeline, posts);
            test.unshift({
                date: response.data.time.updatedISO,
                value: response.data.bpi.USD.rate,
                colour: accessibleColours[colour % 10]
            });
            setColour(
                colour === accessibleColours.length - 1 ? (colour = 0) : (colour += 1)
            );
            setPosts(test);
        }
    };

    useInterval(
        () => {
            fetchPosts();
        },
        posts.length === 0 ? Settings.initialTime : Settings.interval
    );

    // @ts-ignore
    const bitcoinValues: ITimelineElement[] = posts.map(
        (val: any, i: number) => (
            <TimelineElement
                contentStyle={{ background: `${val.colour}`, color: "#fff" }}
                arrowStyle={{ borderRight: `7px solid  ${val.colour}` }}
                date={val.date}
                iconStyle={{ background: `${val.colour}`, color: "#fff" }}
                key={i}
            >
                <h2>Price</h2>
                <p>USD{val.value}</p>
            </TimelineElement>
        )
    );

    return (
        <>
            <h1>Bitcoin Prices</h1>
            <Timeline >{bitcoinValues}</Timeline>
        </>
    );
}
