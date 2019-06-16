import React from 'react';
import App from '../src/client/components/App';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('App', () => {
    const render = () => {
        return mount(<App/>);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <App />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('successfully renders the app', () => {
        const renderedApp = render();
        expect(
            renderedApp.find('[data-testid="app-title"]').text(),
        ).toBe('Hello World');
    });
});

