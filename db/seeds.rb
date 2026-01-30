User.create(email_address: "admin@example.com", password: "abc123", admin: true)

puts "Created #{User.count} users"
