modes {
	id: String
	value: String
	active: Boolean
}

types {
	id: String
	value: String
	priority: Int
	active: String
}

origins {
	id: String
	label: String
	latitude: Int
	longitude: Int
}

locations {
	id: String
	type: types[id]
	name: String
	latitude: Int
	longitude: Int
	relevancy: Int
}

directions {
	origins: origins[id]
	destination: locations[id]
	mode: modes[id]
	created: Int
}
