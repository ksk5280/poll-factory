class Api::V1::PollsController < ApiController
  def index
    respond_with Poll.all
  end

  def create
    respond_with :api, :v1, current_user.polls.create(poll_params)
  end

  def update
    pollId = params[:pollId].to_i
    Poll.find(pollId).update(poll_params)
    poll = Poll.find(pollId)
    respond_with poll, json: poll
  end

  private
    def poll_params
      params.permit(:question)
    end
end
