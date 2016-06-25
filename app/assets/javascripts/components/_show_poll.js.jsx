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

    let pollActive = this.props.poll.active;

    return (
      <div>
        <h3>{this.props.poll.question}</h3>
        <a href="https://twitter.com/share" className="twitter-share-button"
          data-size="large" data-text={`Go here to take this poll: ${this.props.poll.question}`}>
        </a>
        { (voteStatus || !pollActive) ? <PollBarChart pollId={this.props.poll.id}/> : answerObjects }
      </div>
    )
  }
}
