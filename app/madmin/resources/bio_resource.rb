class BioResource < Madmin::Resource
  attribute :id, form: false
  attribute :title
  attribute :content, :rich_text
  attribute :created_at, form: false
  attribute :updated_at, form: false
end
