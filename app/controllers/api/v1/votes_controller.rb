class Api::V1::VotesController < ApiController
  def create
    vote = Answer.find(params[:answer_id].to_i).votes.create
    respond_with vote, json: vote
  end
end
