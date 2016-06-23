class PollBarChart extends React.Component {
  constructor() {
    super();
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount () {
    console.log('pollBarChart', this.props)
    let ctx = document.getElementById("pollBarChart");
    let chartData = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
    options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      },
    });
  }

  handleVote (e) {

  }

  render() {
    let answers = this.props.answers.map(function (answer) {
      return (
        <div>
          <input type="radio" name="answers" value={answer.description} /> {answer.description}
        </div>
      )
    })
    return (
      <div>
        <form>
          <h3>{this.props.poll.question}</h3>
          {answers}
          <button className="btn btn-default" onClick={this.handleVote}>Vote</button>
        </form>
        <canvas id="pollBarChart" width="300" height="150"></canvas>
      </div>
    )
  }
}
