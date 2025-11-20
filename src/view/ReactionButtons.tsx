// import { useDispatch } from 'react-redux'
// import { updateReaction } from '../redux/posts'
import { useAddReactionMutation } from '../redux/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export default function ReactionButtons({ post }: { post: any }) {
  // const dispatch = useDispatch()
  const [addReaction] = useAddReactionMutation()

  const ReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        // onClick={() => dispatch(updateReaction({ postId: post.id, reaction: name }))}
        onClick={() => addReaction({ postId: post.id, reaction: name })}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div className="reaction-buttons">{ReactionButtons}</div>
}
