class ShowPoll extends React.Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  componentWillMount () {
    this.checkExpirationDate ();
  }

  checkExpirationDate () {
    let
      pollId = this.props.poll.id,
      expirationDate = new Date(this.props.poll.exp_date),
      currentDate = new Date(),
      data = { active: false, pollId: pollId };

    if (this.props.poll.active && expirationDate && expirationDate < currentDate) {
      $.ajax({
        url: `/api/v1/polls/${pollId}`,
        type: 'PATCH',
        data: data,
        success: (response) => {
          console.log('checkExpirationDate success', response);
        }
      });
    }
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

    let
      voteStatus = localStorage.getItem(`poll${this.props.poll.id}`),
      expirationDate = new Date(this.props.poll.exp_date),
      currentDate = new Date();
      pollActive = (this.props.poll.active && expirationDate > currentDate);

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
