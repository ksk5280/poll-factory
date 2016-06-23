class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerId: '',
      refId: `answer${this.props.order}`
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyUp (e) {
    if (e.keyCode === 13) {
      this.answerSubmit();
    }
  }

  handleKeyDown (e) {
    if (e.keyCode === 9) {
      this.answerSubmit();
    }
  }

  answerSubmit () {
    let
      answerId = this.state.answerId,
      answerInput = this.refs[this.state.refId],
      type = 'POST',
      description = answerInput.value,
      data = {};

    answerInput.blur();
    data.description = description;

    if (answerId) {
      type = 'PATCH';
      data.answerId = answerId;
    }

    $.ajax({
      url: `/api/v1/polls/${this.props.pollId}/answers/${answerId}`,
      type: type,
      data: data,
      success: (response) => {
        this.state.answerId = response.id;
        this.props.answerUpdate(this.props.order, { id: response.id }, type);
      }
    });
  }

  componentDidMount () {
    if (this.props.focus) {
      this.refs[this.state.refId].focus();
      this.props.answerUpdate(this.props.order, { focus: false });
    }
  }

  render () {
    return (
      <div>
        <input ref={this.state.refId} type="text" placeholder="Enter answer"
          className="form-control answer" autoComplete="off"
          onKeyUp={this.handleKeyUp} onKeyDown={this.handleKeyDown}/>
      </div>
    );
  }
}
