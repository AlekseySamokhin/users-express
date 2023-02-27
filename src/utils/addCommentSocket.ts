import { Comment } from '../db/entities';

import { dbComments } from '../db';

interface ITypeData {
  text: string;
  bookId: number;
  userId: number;
}

const addCommentSocket = async (data: ITypeData) => {
  try {
    const { text, bookId, userId } = data;

    const comment = new Comment();

    comment.text = text;
    comment.bookId = bookId;
    comment.userId = userId;

    await dbComments.save(comment);

    const comments = await dbComments
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    // eslint-disable-next-line no-console
    console.log(comment);

    return comments;
  } catch (err) {
    /* eslint-disable no-console */
    console.log(err);
  }
};

export { addCommentSocket };
