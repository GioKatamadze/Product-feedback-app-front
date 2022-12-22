import { Button } from 'components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addReply } from 'services';
import { singleFeedbackActions } from 'store';

const ReplyForm = (props) => {
  const [replyContent, setReplyContent] = useState('');
  const params = useParams();
  const dispatch = useDispatch();
  const feedbackId = params['id'];

  const commentHandler = (event) => {
    setReplyContent(event.target.value);
  };
  const onAddReply = async () => {
    if (replyContent.trim().length > 3) {
      const replyObj = {
        content: replyContent,
        replyingTo: props.replyTo,
        feedbackId: feedbackId,
        userId: 13,
        commentId: props.commentId,
      };
      try {
        const response = await addReply(replyObj);
        const newReply = response.data;
        props.setReplyForm(false);
        setReplyContent('');
        dispatch(singleFeedbackActions.addReply(newReply));
      } catch (error) {}
    }
  };
  return (
    <div className='w-full flex justify-between flex-col md:pl-4 md:flex-row md:gap-x-4 md:mt-4'>
      <textarea
        className='resize-none w-full h-20 rounded-cardBorderRadius bg-extraLightGray mt-6 p-4 jost-r-h3 outline-electric outline-1 md:mt-0'
        placeholder='Type your reply here'
        onChange={commentHandler}
        value={replyContent}
      ></textarea>
      <Button
        className='px-4 py-3 bg-violet hover:bg-violetHover text-white jost-b-h4 rounded-cardBorderRadius mt-2 md:px-0 md:h-11 md:w-28'
        type='button'
        onClick={onAddReply}
      >
        Post Reply
      </Button>
    </div>
  );
};

export default ReplyForm;