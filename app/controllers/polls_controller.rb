class PollsController < ApplicationController
  def index
    @polls = current_user.polls.all
  end

  def new
  end

  def show
    @poll = Poll.find(params[:id].to_i)
  end
end
