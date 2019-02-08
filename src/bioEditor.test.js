import React from 'react';
import {shallow} from 'enzyme';

import axios from '../axios';
import BioEditor from './bioEditor';

jest.mock('../axios');
const event = Object.assign(jest.fn(), {preventDefault: () => {}});


test('When no Bio passed render add bio', () => {
    const wrapper = shallow(<BioEditor  bio={null} />);

    expect(
        wrapper.contains('add your bio now')).toBe(true);
});


test('When a bio is passed render Edit button', () => {
    const wrapper = shallow(<BioEditor bio="here is my bio"/>);

    expect(
        wrapper.contains('EDIT')
    ).toBe(true);
});


test('when edit or add are clicked render textarea and saved button', () => {
    const wrapper = shallow(<BioEditor />);
    wrapper.instance().showEditor();

    expect(wrapper.contains('SAVE', <textarea />)).toBe(true)
});


test('click save causes an ajax request and call showBio', async() => {
    const showBio = jest.fn();
    const wrapper = shallow(<BioEditor bio={'here is my bio'} showBio={showBio}/>);

    axios.post.mockResolvedValue({
        data: {
            rows: [{
                bio: 'here is my new bio'
            }]
        }
    });

    await wrapper.instance().submit(event);

    expect(showBio.mock.calls.length).toBe(1);
});
