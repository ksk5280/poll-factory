class AnswerChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refId: `answer${this.props.answerId}`
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    let data = { answer_id: this.props.answerId};
    e.preventDefault();

    $.ajax({
      url: `/api/v1/polls/${this.props.pollId}/answers/${this.props.answerId}/votes`,
      type: 'POST',
      data: data,
      success: (response) => {
        localStorage.setItem(`poll${this.props.pollId}`, 'voted');
        this.props.handleVote('voted');
      }
    })
  }

  render () {
    return (
      <button ref={this.refId} onClick={this.handleClick}>{this.props.answerText}</button>
    )
  }
}
