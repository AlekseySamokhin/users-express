import { Book, Genre } from '../db/entities';
import { dbBooks, dbGenres } from '../db';

const books = [
  {
    title: 'The Chronicles of Narnia',
    author: 'C. S. Lewis',
    description:
      "The Chronicles of Narnia is a series of seven high fantasy novels by British author C. S. Lewis. Illustrated by Pauline Baynes and originally published between 1950 and 1956, The Chronicles of Narnia has been adapted for radio, television, the stage, film and video games. The series is set in the fictional realm of Narnia, a fantasy world of magic, mythical beasts and talking animals. It narrates the adventures of various children who play central roles in the unfolding history of the Narnian world. Except in The Horse and His Boy, the protagonists are all children from the real world who are magically transported to Narnia, where they are sometimes called upon by the lion Aslan to protect Narnia from evil. The books span the entire history of Narnia, from its creation in The Magician's Nephew to its eventual destruction in The Last Battle",
    price: 14.99,
    poster: 'http://localhost:4000/books/unsplash_AGAFS_AGSAF.png',
    genre: ['1', '2'],
  },
  {
    title: 'The Psychlogy of Money',
    author: 'Morgan Housel',
    description:
      'Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people',
    price: 10.99,
    poster: 'http://localhost:4000/books/unsplash_aZ_MmSmAcjg.png',
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    description:
      'Dorian Gray is the subject of a full-length portrait in oil by Basil Hallward, an artist impressed and infatuated by Dorians beauty; he believes that Dorians beauty is responsible for the new mood in his art as a painter. Through Basil, Dorian meets Lord Henry Wotton, and he soon is enthralled by the aristocrats hedonistic world view: that beauty and sensual fulfilment are the only things worth pursuing in life.Newly understanding that his beauty will fade, Dorian expresses the desire to sell his soul, to ensure that the picture, rather than he, will age and fade. The wish is granted, and Dorian pursues a libertine life of varied amoral experiences while staying young and beautiful; all the while, his portrait ages and records every sin',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_1i-P178kxHQ.png',
  },
  {
    title: 'The Subtle art of not giving',
    author: 'Mark Manson',
    description:
      'In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be positive all the time so that we can truly become better, happier people. For decades weve been told that positive thinking is the key to a happy, rich life. "F*ck positivity," Mark Manson says. "Lets be honest, shit is f*cked, and we have to live with it." In his wildly popular Internet blog, Manson doesnt sugarcoat or equivocate. He tells it like it is - a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F*ck is his antidote to the coddling, lets-all-feel-good mind-set that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_Gls5DB9lk6s.png',
  },
  {
    title: 'The Two towers',
    author: 'J. R. R. Tolkien',
    description:
      'The Two Towers is the second volume of J.R.R. Tolkiens epic saga, The Lord of the Rings. The Fellowship has been forced to split up. Frodo and Sam must continue alone towards Mount Doom, where the One Ring must be destroyed. Meanwhile, at Helms Deep and Isengard, the first great battles of the War of the Ring take shape. In this splendid, unabridged audio production of Tolkiens great work, all the inhabitants of a magical universe - hobbits, elves, and wizards - spring to life. Rob Inglis narration has been praised as a masterpiece of audio',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_O7ygzpAL4Mc.png',
  },
  {
    title: 'Book of Fairy Tales',
    author: 'Angela Carter',
    description:
      'Originally published in 1958, this book contains a selection of 28 traditional stories from the French, German, Danish, Russian and Japanese traditions. Includes The Sleeping Beauty, The Frog Prince, Puss in Boots, Thumbelina, Cinderella, Little Red Riding Hood, and Beauty and the Beast.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_2bqXqr4GeCg.png',
  },
  {
    title: 'How to stop worrying and start living',
    author: 'Dale Carnegie',
    description:
      'Through Dale Carnegies seven-million-copy best seller (recently revised) millions of people have been helped to overcome the worry habit. Dale Carnegie offers a set of practical formulas you can put to work today, formulas that will last a lifetime! Discover how to: Eliminate 50 percent of business worries immediately Reduce financial worries',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_UMlXDGxY6Kc.png',
  },
  {
    title: 'Don’t sweat the Small Stuuff',
    author: 'Richard Carlson',
    description:
      'Featured in Dont Sweat the Small Stuff: The Kristine Carlson Story starring Heather Locklear, premiering on Lifetime Put challenges in perspective, reduce stress and anxiety through small daily changes, and find the path to achieving your goals with this groundbreaking inspirational guide—a self-help classic.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_Yw5NY_JDCRE.png',
  },
  {
    title: 'The Weight of Things',
    author: 'Marianne Flitz',
    description:
      'The Weight of Things is the first book, and the first translated book, and possibly the only translatable book by Austrian writer Marianne Fritz (1948–2007). For after winning acclaim with this novel—awarded the Robert Walser Prize in 1978—she embarked on a 10,000-page literary project called “The Fortress,” creating over her lifetime elaborate colorful diagrams and typescripts so complicated that her publisher had to print them straight from her original documents. A project as brilliant as it is ambitious and as bizarre as it is brilliant, it earned her cult status, comparisons to James Joyce no less than Henry Darger, and admirers including Elfriede Jelinek and W. G. Sebald.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_aZ_MmSmAcjgasd.png',
  },
  {
    title: 'milk and honey',
    author: 'Rupi Kaur',
    description:
      'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_aZ_MmSmAcjgasd.png',
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    description:
      'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_CXYPfveiuisadh.png',
  },
  {
    title: 'The Crying book',
    author: 'Heather Christle',
    description:
      'Heather Christle has just lost a dear friend to suicide and now must reckon with her own depression and the birth of her first child. As she faces her grief and impending parenthood, she decides to research the act of crying: what it is and why people do it, even if they rarely talk about it. Along the way, she discovers an artist who designed a frozen-tear-shooting gun and a moth that feeds on the tears of other animals. She researches tear-collecting devices (lachrymatories) and explores the role white women’s tears play in racist violence.',
    price: 9.99,
    poster: 'http://localhost:4000/books/unsplash_CXYPfveiuisasdh.png',
  },
];

const genres = [
  'Fiction',
  'Non—fiction',
  'Light fiction',
  'Science-fiction',
  'Fantasy',
  'Business & Finance',
  'Politics',
  'Travel books',
  'Autobiography',
  'History',
  'Thriller / Mystery',
  'Romance',
  'Satire',
  'Horror',
  'Health / Medicine',
  'Children’s books',
  'Encyclopedia',
];

const loadBooks = () => {
  for (let i = 0; i < books.length; i++) {
    const newBook = new Book();
    newBook.title = books[i].title;
    newBook.author = books[i].author;
    newBook.poster = books[i].poster;
    newBook.price = books[i].price;
    newBook.description = books[i].description;
    dbBooks.save(newBook);
  }
};

const loadGenres = () => {
  for (let i = 0; i < genres.length; i++) {
    const newGenre = new Genre();

    newGenre.name = genres[i];

    dbGenres.save(newGenre);
  }
};

export { loadBooks, loadGenres };
