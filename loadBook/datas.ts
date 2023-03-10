/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { dbBooks, dbGenres } from '../src/db';
import { Book, Genre } from '../src/db/entities';

const arrGenres = [
  { genreId: 1, name: 'Fiction' },
  { genreId: 2, name: 'Non-fiction' },
  { genreId: 3, name: 'Light fiction' },
  { genreId: 4, name: 'Science-fiction' },
  { genreId: 5, name: 'Fantasy' },
  { genreId: 6, name: 'Business & Finance' },
  { genreId: 7, name: 'Politics' },
  { genreId: 8, name: 'Travel books' },
  { genreId: 9, name: 'Authobiography' },
  { genreId: 10, name: 'History' },
  { genreId: 11, name: 'Thriller / Mystery' },
  { genreId: 12, name: 'Romace' },
  { genreId: 13, name: 'Satire' },
  { genreId: 14, name: 'Horror' },
  { genreId: 15, name: 'Health / Medicine' },
  { genreId: 16, name: 'Encyclopedia' },
  { genreId: 17, name: 'Children books' },
];

const arrBooks = [
  {
    title: 'The Chronicles of Narnia',
    author: 'C. S. Lewis',
    description:
      "The Chronicles of Narnia is a series of seven high fantasy novels by British author C. S. Lewis. Illustrated by Pauline Baynes and originally published between 1950 and 1956, The Chronicles of Narnia has been adapted for radio, television, the stage, film and video games. The series is set in the fictional realm of Narnia, a fantasy world of magic, mythical beasts and talking animals. It narrates the adventures of various children who play central roles in the unfolding history of the Narnian world. Except in The Horse and His Boy, the protagonists are all children from the real world who are magically transported to Narnia, where they are sometimes called upon by the lion Aslan to protect Narnia from evil. The books span the entire history of Narnia, from its creation in The Magician's Nephew to its eventual destruction in The Last Battle",
    price: 14.99,
    poster: 'the_chronicles_of_narnia.png',
    genres: ['Fiction', 'Non-fiction', 'Light fiction'],
    isBestseller: true,
    isNew: false,
    releaseDate: '12/10/1993',
    averageRating: 0,
  },
  {
    title: 'The Psychlogy of Money',
    author: 'Morgan Housel',
    description:
      'Doing well with money isn???t necessarily about what you know. It???s about how you behave. And behavior is hard to teach, even to really smart people',
    price: 10.99,
    poster: 'the_psychlogy_of_money.png',
    genres: ['Fantasy', 'History'],
    isBestseller: false,
    isNew: true,
    releaseDate: '12/10/1993',
    averageRating: 0,
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    description:
      'Dorian Gray is the subject of a full-length portrait in oil by Basil Hallward, an artist impressed and infatuated by Dorians beauty; he believes that Dorians beauty is responsible for the new mood in his art as a painter. Through Basil, Dorian meets Lord Henry Wotton, and he soon is enthralled by the aristocrats hedonistic world view: that beauty and sensual fulfilment are the only things worth pursuing in life.Newly understanding that his beauty will fade, Dorian expresses the desire to sell his soul, to ensure that the picture, rather than he, will age and fade. The wish is granted, and Dorian pursues a libertine life of varied amoral experiences while staying young and beautiful; all the while, his portrait ages and records every sin',
    price: 5.5,
    poster: 'the_picture_of_dorian_gray.png',
    genres: ['Travel books', 'Romace'],
    isBestseller: false,
    isNew: false,
    releaseDate: '11/11/2011',
    averageRating: 0,
  },
  {
    title: 'The Subtle art of not giving',
    author: 'Mark Manson',
    description:
      'In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be positive all the time so that we can truly become better, happier people. For decades weve been told that positive thinking is the key to a happy, rich life. "F*ck positivity," Mark Manson says. "Lets be honest, shit is f*cked, and we have to live with it." In his wildly popular Internet blog, Manson doesnt sugarcoat or equivocate. He tells it like it is - a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F*ck is his antidote to the coddling, lets-all-feel-good mind-set that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up.',
    price: 4.35,
    poster: 'the_subtle_art_of_not_giving_a_fuck.png',
    genres: ['Helth / Medicine', 'Satire'],
    isBestseller: true,
    isNew: true,
    releaseDate: '9/09/2009',
    averageRating: 0,
  },
  {
    title: 'The Two towers',
    author: 'J. R. R. Tolkien',
    description:
      'The Two Towers is the second volume of J.R.R. Tolkiens epic saga, The Lord of the Rings. The Fellowship has been forced to split up. Frodo and Sam must continue alone towards Mount Doom, where the One Ring must be destroyed. Meanwhile, at Helms Deep and Isengard, the first great battles of the War of the Ring take shape. In this splendid, unabridged audio production of Tolkiens great work, all the inhabitants of a magical universe - hobbits, elves, and wizards - spring to life. Rob Inglis narration has been praised as a masterpiece of audio',
    price: 6.35,
    poster: 'the_two_towers.png',
    genres: ['Politics', 'Romace'],
    isBestseller: false,
    isNew: true,
    releaseDate: '07/07/2017',
    averageRating: 0,
  },
  {
    title: 'Book of Fairy Tales',
    author: 'Angela Carter',
    description:
      'Originally published in 1958, this book contains a selection of 28 traditional stories from the French, German, Danish, Russian and Japanese traditions. Includes The Sleeping Beauty, The Frog Prince, Puss in Boots, Thumbelina, Cinderella, Little Red Riding Hood, and Beauty and the Beast.',
    price: 12.45,
    poster: 'book_of_fairy_tales.png',
    genres: ['Fantasy'],
    isBestseller: false,
    isNew: false,
    releaseDate: '1/01/2022',
    averageRating: 0,
  },
  {
    title: 'How to stop worrying and start living',
    author: 'Dale Carnegie',
    description:
      'Through Dale Carnegies seven-million-copy best seller (recently revised) millions of people have been helped to overcome the worry habit. Dale Carnegie offers a set of practical formulas you can put to work today, formulas that will last a lifetime! Discover how to: Eliminate 50 percent of business worries immediately Reduce financial worries',
    price: 9.99,
    poster: 'how_to_stop_worrying_and_start_living.png',
    genres: ['Thriller / Mystery', 'History'],
    isBestseller: false,
    isNew: false,
    releaseDate: '2/10/1999',
    averageRating: 0,
  },
  {
    title: 'Don???t sweat the Small Stuuff',
    author: 'Richard Carlson',
    description:
      'Featured in Dont Sweat the Small Stuff: The Kristine Carlson Story starring Heather Locklear, premiering on Lifetime Put challenges in perspective, reduce stress and anxiety through small daily changes, and find the path to achieving your goals with this groundbreaking inspirational guide???a self-help classic.',
    price: 6.99,
    poster: 'dont_sweat_the_small_stuuff.png',
    genres: ['Authobiography'],
    isBestseller: false,
    isNew: false,
    releaseDate: '2/02/1999',
    averageRating: 0,
  },
  {
    title: 'The Weight of Things',
    author: 'Marianne Flitz',
    description:
      'The Weight of Things is the first book, and the first translated book, and possibly the only translatable book by Austrian writer Marianne Fritz (1948???2007). For after winning acclaim with this novel???awarded the Robert Walser Prize in 1978???she embarked on a 10,000-page literary project called ???The Fortress,??? creating over her lifetime elaborate colorful diagrams and typescripts so complicated that her publisher had to print them straight from her original documents. A project as brilliant as it is ambitious and as bizarre as it is brilliant, it earned her cult status, comparisons to James Joyce no less than Henry Darger, and admirers including Elfriede Jelinek and W. G. Sebald.',
    price: 2.4,
    poster: 'the_weight_of_things.png',
    genres: ['Encyclopedia'],
    isBestseller: false,
    isNew: false,
    releaseDate: '10/12/1997',
    averageRating: 0,
  },
  {
    title: 'milk and honey',
    author: 'Rupi Kaur',
    description:
      'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
    price: 14.95,
    poster: 'milk_and_honey.png',
    genres: ['Children books'],
    isBestseller: false,
    isNew: false,
    releaseDate: '5/05/2013',
    averageRating: 0,
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    description:
      'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
    price: 20.0,
    poster: 'moby_dick.png',
    genres: ['Science-fiction'],
    isBestseller: false,
    isNew: false,
    releaseDate: '5/05/2013',
    averageRating: 0,
  },
  {
    title: 'The Crying book',
    author: 'Heather Christle',
    description:
      'Heather Christle has just lost a dear friend to suicide and now must reckon with her own depression and the birth of her first child. As she faces her grief and impending parenthood, she decides to research the act of crying: what it is and why people do it, even if they rarely talk about it. Along the way, she discovers an artist who designed a frozen-tear-shooting gun and a moth that feeds on the tears of other animals. She researches tear-collecting devices (lachrymatories) and explores the role white women???s tears play in racist violence.',
    price: 13.45,
    poster: 'the_crying_book.png',
    genres: ['Satire'],
    isBestseller: false,
    isNew: false,
    releaseDate: '03/25/2004',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Philosopher`s Stone',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 12.99,
    poster: 'harry_potter_and_the_philosophers_stone.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '03/28/2019',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 10.5,
    poster: 'harry_potter_and_the_chamber_of_secrets.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '03/06/2021',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 10.15,
    poster: 'harry_potter_and_the_prisoner_of_azkaban.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '10/12/2013',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 15.5,
    poster: 'harry_potter_and_the_goblet_of_fire.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '5/10/2004',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 17.5,
    poster: 'harry_potter_and_the_order_of_the_phoenix.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '4/04/2002',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Half-Blood Prince',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 9.55,
    poster: 'harry_potter_and_the_half-blood_prince.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '5/07/1994',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 15.95,
    poster: 'harry_potter_and_the_deathly_hallows.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '07/07/1990',
    averageRating: 0,
  },
  {
    title: 'Harry Potter and the Cursed Child',
    author: 'J.K Rowling',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry???s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!.',
    price: 10.5,
    poster: 'harry_potter_and_the_cursed_child.jpg',
    genres: ['Fantasy', 'History'],
    isBestseller: true,
    isNew: false,
    releaseDate: '09/09/2018',
    averageRating: 0,
  },
];

const loadBooks = async () => {
  for (let i = 0; i < arrBooks.length; i++) {
    const book = new Book();

    book.title = arrBooks[i].title;
    book.author = arrBooks[i].author;
    book.poster = arrBooks[i].poster;
    book.price = arrBooks[i].price;
    book.description = arrBooks[i].description;
    book.isBestseller = arrBooks[i].isBestseller;
    book.isNew = arrBooks[i].isNew;
    book.averageRating = arrBooks[i].averageRating;
    book.releaseDate = new Date(arrBooks[i].releaseDate);

    const arrGenres: Genre[] = [];

    for (let j = 0; j < arrBooks[i].genres.length; j++) {
      const genreItem = await dbGenres.findOneBy({
        name: arrBooks[i].genres[j],
      });

      if (genreItem) {
        arrGenres.push(genreItem);
      }

      console.log('arrGenres', arrGenres);
    }

    book.genres = arrGenres;

    dbBooks.save(book);
  }
};

const loadGenres = () => {
  for (let i = 0; i < arrGenres.length; i++) {
    const newGenre = new Genre();

    newGenre.name = arrGenres[i].name;

    dbGenres.save(newGenre);
  }
};

export { loadBooks, loadGenres };
