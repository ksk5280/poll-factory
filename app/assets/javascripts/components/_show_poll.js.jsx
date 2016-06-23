class ShowPoll extends React.Component {
  constructor() {
    super();
  }

  render () {
    let
      answerObjects = this.props.answers.map(function (answer) {
        return (
          <AnswerChoice key={answer.id} answerId={answer.id} pollId={this.props.poll.id}
            answerText={answer.description} />
        )
      }.bind(this));

    return (
      <div>
        <form>
          <h3>{this.props.poll.question}</h3>
          {answerObjects}
        </form>
        <PollBarChart pollId={this.props.poll.id}/>
      </div>
    )
  }
}
