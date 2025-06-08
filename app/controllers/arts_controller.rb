class ArtsController < ApplicationController
  allow_unauthenticated_access

  before_action :set_art, only: %i[show]

  # GET /arts or /arts.json
  def index
    @arts = Art.all
  end

  # GET /arts/1 or /arts/1.json
  def show
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_art
    @art = Art.find(params.expect(:id))
  end
end
