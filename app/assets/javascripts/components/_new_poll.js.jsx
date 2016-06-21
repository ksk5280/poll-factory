class NewPoll extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form className="col-sm-4">
        <legend>New Poll</legend>
        <fieldset className="form-group">
          <div>
            <label for="question">Question: </label>
            <input type="text" id="question" placeholder="Enter question" className="form-control"/>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <label for="answer1">Answer: </label>
            <input type="text" id="answer1" placeholder="Enter answer" className="form-control"/>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <label for="answer2">Answer: </label>
            <input type="text" id="answer2" placeholder="Enter answer" className="form-control"/>
          </div>
        </fieldset>
        <input type="submit" value="Create Poll" className="btn btn-default"/>
      </form>
    );
  }
}
