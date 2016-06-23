class ShowPoll extends React.Component {
  constructor() {
    super();
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote () {
    this.forceUpdate();
  }

  render () {
    let
      answerObjects = this.props.answers.map(function (answer) {
        return (
          <AnswerChoice key={answer.id} answerId={answer.id} pollId={this.props.poll.id}
            answerText={answer.description} handleVote={this.handleVote}/>
        )
      }.bind(this));

    let voteStatus = localStorage.getItem(`poll${this.props.poll.id}`);

    return (
      <div>
        <h3>{this.props.poll.question}</h3>
        <TwitterLink question={this.props.poll.question} />
        { voteStatus ? <PollBarChart pollId={this.props.poll.id}/> : answerObjects }
      </div>
    )
  }
}
