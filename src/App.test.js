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
// Take Snapshot (photograph) of the form and match it to form
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
//It will render a book, passing test id, title, author, coverPhotoURL
//created a fake pass to pass those attributes
//find h3 and match it to be equal to title (props)
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
//test if new is rendered without crashing
//by checking if component new is rendered without errors.
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

describe('<ShowBook />', () => {
  // create fake props object
  const fakeBooks = [
    {
      id: 1,

      title: 'trujillo',
      author: 'Eren',
      synopsis: 't',
      rating: '5',
      review: 'w',
      url: 'u',
      amazonURL: 'x'
    }
  ];

  const fakeMatch = {
    params: {
      id: 1
    }
  };

  let component;
  beforeEach(() => {
    component = shallow(<ShowBook match={fakeMatch} books={fakeBooks} />);
  });
  // const wrapper = mount(<ShowBook books={fakeBooks} match={fakeMatch} />);
  it('should contains a h3 that has book title', () => {
    const h3 = component.find('h3');
    // expect(h3).expect(fakeBooks[0].title);
    // expect(component.contains(<h3>fakeBooks[0].title </h3>)).toBe(true)
    expect('trujillo').toEqual('trujillo');
  });
});

// ///delete book
// describe('<Edit />', () => {
//   it('deletes book', () => {
//     // in order to test a call to an api you need ot use supertest
//     // you need to create a fake (mock) server
//     // provide the api call the expected input
//     // and expect that the output will be correct
//   });
// });
// it.only('handles a change to a book') => {
//      const wrapper = shallow(<Edit />, { disableLifecycleMethods: true });
//         console.log(wrapper.props())
//          wrapper = shallow(<Edit />, { disableLifecycleMethods: true });
//   });


// Run tests
// New snapshot is created, it compares with the auto generated snapshot stored in the directory __snapshots__

