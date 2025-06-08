class Logo::Component < ViewComponent::Base
  attr_reader :footer

  def initialize(footer: false)
    @footer = footer
  end
end
