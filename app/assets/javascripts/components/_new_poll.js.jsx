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
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleDateClick (e) {
    $("#date-picker").datepicker()
      .on("changeDate", function(e) {
      this.handleDateChange();
    }.bind(this));
  }

  handleAnswerUpdate (order, update, type) {
    let
      // Find the answer choice based on order
      answerChoice = this.state.answers.find(function (item) {
        return item.order === this.order;
      }, { order });

    // Update answer choice info
    Object.keys(update).map(function (updateKey) {
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
      data.id = pollId;
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

  handleDateChange (e) {
    let
      pollId = this.state.pollId,
      expirationDate = new Date(this.refs.exp_date.value),
      data = { exp_date: expirationDate };

    $.ajax({
      url: `/api/v1/polls/${pollId}`,
      type: 'PATCH',
      data: data,
      success: (response) => {
        console.log('handleDateChange success', response);
      }
    })
  }

  render () {
    let
      answerGroup, answerItems, pollLink, pollLinkGroup;

    if (this.state.pollId) {
      pollLink = `/polls/${this.state.pollId}`;
      pollLinkGroup = (
        <a href={pollLink} className="btn btn-default">View Poll</a>
      );
      answerItems = this.state.answers.map(function (answer) {
        return (
          <Answer key={answer.order} order={answer.order} focus={answer.focus}
            pollId={this.state.pollId} answers={this.state.answers}
            answerUpdate={this.handleAnswerUpdate}/>
        );
      }.bind(this));
      answerGroup = (
        <div>
          <fieldset className="form-group">
            <label htmlFor="answer1">Answers: </label>
            {answerItems}
          </fieldset>
          <fieldset>
            <label htmlFor="date-picker">Expiration Date: </label>
            <div className="input-group">
            <input ref="exp_date" id="date-picker" type="text" className="date-picker form-control"/>
            <label htmlFor="date-picker" className="input-group-addon btn" onClick={this.handleDateClick}>
              <span className="glyphicon glyphicon-calendar"></span>
            </label>
            </div>
          </fieldset>
        </div>
      );
    }

    return (
      <div className="col-sm-offset-3 col-sm-6">
        <legend>
        New Poll
        <a href="/polls" className="btn btn-default" id="close-btn">x</a>
        </legend>
        <fieldset className="form-group">
          <div>
            <label htmlFor="question">Question: </label>
            <input ref="question" type="text" id="question"
              placeholder="Enter question" className="form-control" autoComplete="off"
              onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
          </div>
        </fieldset>
        {answerGroup}
        {pollLinkGroup}
      </div>
    );
  }
}
