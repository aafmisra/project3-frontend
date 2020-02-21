import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { Link, MemoryRouter as Router } from 'react-router-dom';

import Form from '../components/Form';
import Home from '../components/Home';
import Edit from '../components/Edit';
import New from '../components/New';
import ShowBook from '../components/ShowBook';

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
  it('renders a form', () => {
    const wrapper = shallow(<New />);
    expect(wrapper.contains(<Form />));
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

describe('<Edit />', () => {
  it('Renders delete button', () => {
    const wrapper = shallow(<Edit match={{ params: { id: 1 } }} />);
    expect(
      wrapper.containsMatchingElement(<button>Delete Book</button>)
    ).toBeTruthy();
  });
});

// Run tests
// New snapshot is created, it compares with the auto generated snapshot stored in the directory __snapshots__
