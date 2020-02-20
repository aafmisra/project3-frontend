import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { Link, MemoryRouter as Router } from 'react-router-dom';

import Form from './components/Form';
import Home from './components/Home';
import Edit from './components/Edit';
import New from './components/New';
import ShowBook from './components/ShowBook';

Enzyme.configure({ adapter: new Adapter() });

//Testing form component
describe('<Form />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly enzyme', () => {
    const wrapper = shallow(<Form />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

//Testing the Home component
describe('<Home />', () => {
  it('renders books', () => {
    const famousBooks = [
      {
        _id: 1,
        title: 'Dios y Trujillo',
        author:
          'Rafael Leónidas Trujillo Molina, también conocido como El Jefe',
        coverPhotoURL: 'image'
      }
    ];
    const wrapper = mount(
      <Router>
        <Home books={famousBooks} />
      </Router>
    );
    expect(wrapper.find(Link)).toBeTruthy();
    expect(wrapper.props().children.props.books[0]).toEqual(famousBooks[0]);
    const h3 = wrapper.find('h3');
    expect(h3.text()).toEqual('Dios y Trujillo');
  });
});

//Testing New component
describe('<New />', () => {
  it('renders New without crashing', () => {
    function getBooks() {
      const url = `http://localhost:4000/books`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(console.error);
    }

    const div = document.createElement('div');
    ReactDOM.render(<New getBooks={getBooks} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
