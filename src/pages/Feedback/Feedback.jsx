import { FeedbackComponent } from 'components';
import { Comment, FeedbackHeader, NewComment } from 'components/Feedback';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchCategories } from 'store';
import { fetchSingleFeedback } from 'store';
import { fetchUsers } from 'store';

const Feedback = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const feedback = useSelector((state) => state.singleFeedback.feedback);
  const categories = useSelector((state) => state.category.items);
  console.log(feedback);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSingleFeedback(id));
  }, [dispatch, id]);
  return (
    <div className='w-full min-h-full bg-extraLightGray p-6 pb-20 lg:flex lg:justify-center md:p-10 md:pt-14 md:pb-28 lg:pt-20 lg:pb-32'>
      <div className='w-full lg:max-w-3xl'>
        <FeedbackHeader />
        {feedback.id ? <FeedbackComponent feedback={feedback} /> : null}
        {feedback.id ? (
          <div className='w-full p-6 bg-white mt-6 rounded-cardBorderRadius'>
            <span className='text-darkBlueTwo jost-b-h3'>
              {feedback.commentAmount} Comments
            </span>
            {feedback.comments.map((comment, index) => (
              <Comment key={comment.id} index={index} />
            ))}
          </div>
        ) : null}        
        <NewComment feedbackId={id} />
      </div>
    </div>
  );
};

export default Feedback;