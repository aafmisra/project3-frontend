import React from 'react';

function ShowBook(book) {
  const [thisBook, setBook] = useState([]);
  function getBook() {
    const url = `http://localhost:4000/books/${book._id}`;
    fetch(url)
      .then(res => res.json())
      .then(res => setBook(res));
  }

  useEffect(() => {
    getBook();
  }, []);
  return (
    <div>
      <h3>{thisBook.title}</h3>
      <img src={thisBook.coverPhotoURL} alt={thisBook.title} />
      <p>{thisBook.author}</p>
      <p>{thisBook.synopsis}</p>
      <p>{thisBook.rating}</p>
      <p>{thisBook.review}</p>
      <a href={thisBook.amazonURL} target="_blank">
        Buy it on Amazon
      </a>
    </div>
  );
}
