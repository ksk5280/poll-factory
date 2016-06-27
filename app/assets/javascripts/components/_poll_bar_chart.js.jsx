class PollBarChart extends React.Component {
  constructor() {
    super();
    this.state = { pollVotes: {}};
  }

  componentDidMount () {
    $.ajax({
      url: `/api/v1/polls/${this.props.pollId}`,
      type: 'GET',
      success: (response) => {
        this.setState({ pollVotes: response },
          function () {
            this.createChart()
          });
      }
    });
  }

  createChart () {
    let pollVotes = this.state.pollVotes;
    let voteCount = Object.keys(pollVotes).map(function (key) {
      return pollVotes[key];
    });

    let ctx = document.getElementById("pollBarChart");
    let chartData = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(pollVotes),
        datasets: [{
          label: '# of Votes',
          data: voteCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
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

  render() {
    return (
      <canvas id="pollBarChart" width="300" height="150"></canvas>
    )
  }
}
