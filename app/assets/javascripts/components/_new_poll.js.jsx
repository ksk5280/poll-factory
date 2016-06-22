class NewPoll extends React.Component {
  constructor () {
    super ();
    this.pollId = '';
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp (e) {
    if (e.keyCode === 13) {  // Enter key
      this.pollSubmit();
    }
  }

  pollSubmit () {
    let
      question = this.refs.question.value,
      type = 'POST',
      data = { poll: {} };

    data.poll.question = question;

    if (question === '') {
      // Client side error validation
    }
    if (this.pollId) {
      type = 'PATCH';
      data.poll.pollId = this.pollId;
    }

    $.ajax({
      url: `/api/v1/polls/${this.pollId}`,
      type: type,
      data: data,
      success: (response) => {
        this.pollId = response.id;
      }
    });
  }

  render () {
    return (
      <div className="col-sm-5">
        <legend>New Poll</legend>
        <fieldset className="form-group">
          <div>
            <label htmlFor="question">Question: </label>
            <input ref="question" type="text" id="question" placeholder="Enter question" className="form-control" onKeyUp={this.handleKeyUp}/>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <label htmlFor="answer1">Answers: </label>
            <input ref="answer1" type="text" id="answer1" placeholder="Enter answer" className="form-control answer"/>
            <input ref="answer2" type="text" id="answer2" placeholder="Enter answer" className="form-control answer"/>
            <input ref="answer3" type="text" id="answer3" placeholder="Enter answer" className="form-control answer"/>
          </div>
        </fieldset>
        <input type="submit" value="Create Poll" className="btn btn-default" onClick={this.handleClick}/>
      </div>
    );
  }
}
