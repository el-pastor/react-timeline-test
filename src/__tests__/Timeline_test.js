import React from 'react';
import {render} from '@testing-library/react';
import {mockAllIsIntersecting} from 'react-intersection-observer/test-utils';

import Timeline from '../Components/Timeline';

beforeEach(() => {
    mockAllIsIntersecting(true);
});

describe('Timeline', () => {
    it('should have the timeline classname', () => {
        const {getByText} = render(
            <Timeline>
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline')
    });

    it('should have the timeline--animate classname', () => {
        const {getByText} = render(
            <Timeline>
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline--animate');
    });

    it('should have the timeline--two-columns classname by default', () => {
        const {getByText} = render(
            <Timeline>
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline--two-columns');
    });

    it('should have the timeline--two-columns classname with layout=2-columns', () => {
        const {getByText} = render(
            <Timeline layout="2-columns">
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline--two-columns');
    });

    it('should have the timeline--one-column-left classname with layout=1-column-left', () => {
        const {getByText} = render(
            <Timeline layout="1-column-left">
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline--one-column-left');
    });

    it('should have the timeline--one-column-left classname by default with layout=1-column', () => {
        const {getByText} = render(
            <Timeline layout="1-column">
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline--one-column-left');
    });

    it('should have the timeline--one-column-right classname with layout=1-column-right', () => {
        const {getByText} = render(
            <Timeline layout="1-column-right">
                <div>test1</div>
                <div>test2</div>
            </Timeline>
        );
        expect(getByText('test1').parentNode).toHaveClass('timeline--one-column-right');
    });
});