import React from 'react';
import {render} from '@testing-library/react';
import {mockAllIsIntersecting} from 'react-intersection-observer/test-utils';
import {TimelineElement} from '../Components/TimelineElement';

beforeEach(() => {
    mockAllIsIntersecting(true);
});

describe('Timeline', () => {
    it('should have the timeline-element classname', () => {
        const component = render(<TimelineElement/>);
        const el = component.container.querySelector('.timeline-element')
        expect(el).toBeVisible();
    });

    describe('when children is empty', () => {
        it('should have the timeline-element--no-children classname', () => {
            const component = render(<TimelineElement/>);
            const el = component.container.querySelector('.timeline-element--no-children')
            expect(el).toBeVisible();
        });

        it('should have the timeline-element--no-children classname', () => {
            const componentWithDate = render(<TimelineElement date="2022"/>);
            const el = componentWithDate.container.querySelector('.timeline-element.timeline-element--no-children')
            expect(el).toBeVisible();
        });

        it('should not have the timeline-element--no-children classname', () => {
            const component = render(<TimelineElement><div>My Child</div></TimelineElement>);
            const el = component.container.querySelector('.timeline-element--no-children')
            expect(el).toBeNull();
        });
    });
});