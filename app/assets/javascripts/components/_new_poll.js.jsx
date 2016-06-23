class NewPoll extends React.Component {
  constructor() {
    super();
    this.state = {
      pollId: '',
      answers: [],
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleAnswerUpdate = this.handleAnswerUpdate.bind(this);
    this.handleCreatePoll = this.handleCreatePoll.bind(this);
  }

  componentDidMount () {
    this.refs.question.focus();
  }

  handleKeyDown (e) {
    if (e.keyCode === 9) {  // Tab key
      e.preventDefault();
      this.questionSubmit();
    }
  }

  handleKeyUp (e) {
    if (e.keyCode === 13) {  // Enter key
      this.questionSubmit();
    }
  }

  handleAnswerUpdate (order, update, type) {
    console.log('handleAnswerUpdate', this.state);
    let
      // Find the answer choice based on order
      answerChoice = this.state.answers.find(function (item) {
        return item.order === this.order;
      }, { order });
console.log('answerChoice', answerChoice, this.state, Object.keys(update));
    // Update answer choice info
    Object.keys(update).map(function (updateKey) {
console.log('AC', this, updateKey);
      this.answerChoice[updateKey] = this.update[updateKey];
    }, { answerChoice, update });

    if (type === 'POST') {
      this.state.answers.push({order: this.state.answers.length, focus: true });
    }
    this.forceUpdate();
  }

  questionSubmit () {
    let
      pollId = this.state.pollId,
      questionInput = this.refs.question,
      question = questionInput.value,
      type = 'POST',
      data = {};

    questionInput.blur();

    data.question = question;

    if (question === '') {
      // Client side error validation
    }
    if (pollId) {
      type = 'PATCH';
      data.pollId = pollId;
    }

    $.ajax({
      url: `/api/v1/polls/${pollId}`,
      type: type,
      data: data,
      success: (response) => {
        this.state.pollId = response.id;
        if (this.state.answers.length === 0) {
          this.state.answers.push({ order: 0, focus: true });
        }
        this.forceUpdate();
      }
    });
  }

  handleCreatePoll () {
    console.log('create poll', this)
  }

  render () {
    let
      answerGroup, answerItems;

    if (this.state.pollId) {
      answerItems = this.state.answers.map(function (answer) {
        return (
          <Answer key={answer.order} order={answer.order} focus={answer.focus}
            pollId={this.state.pollId} answers={this.state.answers}
            answerUpdate={this.handleAnswerUpdate}/>
        );
      }.bind(this));
      answerGroup = (
        <fieldset className="form-group">
          <label htmlFor="answer1">Answers: </label>
          {answerItems}
        <input type="submit" value="Create Poll" className="btn btn-default" onClick={this.handleCreatePoll}/>
        </fieldset>
      );
    }

    return (
      <div className="col-sm-5">
        <legend>New Poll</legend>
        <fieldset className="form-group">
          <div>
            <label htmlFor="question">Question: </label>
            <input ref="question" type="text" id="question"
              placeholder="Enter question" className="form-control" autoComplete="off"
              onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
          </div>
        </fieldset>
        {answerGroup}
      </div>
    );
  }
}
