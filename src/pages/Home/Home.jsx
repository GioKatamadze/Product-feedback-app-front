import { Header, FilterHeader, Empty } from 'components';
import { FeedbackComponent } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks } from 'store';

const Home = () => {
  const [filterBy, setFilterBy] = useState('Most Upvotes');
  const [byCategory, setByCategory] = useState(0);
  const dispatch = useDispatch();

  const feedbacks = useSelector((state) => state.feedbacks.items);
  const sortByCategory = feedbacks
    .slice()
    .filter((feedback) =>
      byCategory === 0 ? true : feedback.category_id === byCategory
    );
  const feedbackList = sortByCategory.sort((a, b) =>
    filterBy === 'Most Upvotes'
      ? b.upvotes - a.upvotes
      : filterBy === 'Least Upvotes'
      ? a.upvotes - b.upvotes
      : filterBy === 'Most Comments'
      ? b.commentAmount - a.commentAmount
      : a.commentAmount - b.commentAmount
  );
  const suggestions = feedbacks.filter(
    (feedback) => feedback.status_id === 1
  ).length;
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);
  return (
    <div className='w-full min-h-full pb-18 md:pt-14 bg-extraLightGray lg:flex lg:px-10 lg:pt-24 lg:gap-x-8 xl:px-40'>
      <Header setByCategory={setByCategory} byCategory={byCategory} />
      <div className='lg:w-full'>
        <div className='w-full p-0 md:px-10 lg:px-0'>
          <FilterHeader setFilterBy={setFilterBy} suggestions={suggestions} />
        </div>
        <div
          id='feedbacks-box'
          className='pt-8 px-6 w-full flex flex-col gap-y-4 bg-extraLightGray md:px-10 lg:px-0'
        >
          {feedbacks.length > 0
            ? feedbackList.map((feedback) => (
                <FeedbackComponent key={feedback.id} feedback={feedback} />
              ))
            : null}
          {sortByCategory.length === 0 ? <Empty /> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;