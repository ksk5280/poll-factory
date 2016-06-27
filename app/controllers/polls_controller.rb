class PollsController < ApplicationController
  def index
    if current_user
      @polls = current_user.polls.all
    else
      redirect_to root_path
    end
  end

  def new
  end

  def show
    @poll = Poll.find(params[:id].to_i)
  end
end
