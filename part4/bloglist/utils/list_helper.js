

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
	const total = blogs.reduce((total, item) => {return (total + item.likes)},0)
	return total
}


const favoriteBlog = (blogs) => {
	if(blogs.length === 0){return {}}
	const favorite = blogs.reduce((highest, item)=> item.likes > highest.likes ? item : highest)
	return favorite
}

const mostBlogs = (blogs) => {
	const authors = []
		blogs.forEach(element => {
			if(authors.some((obj)=> obj.author === element.author))
				{
					const index = authors.findIndex((obj)=> obj.author === element.author)
					authors[index] = {...authors[index], blogs: authors[index].blogs + 1}
				}
			else
				 authors.push({author: element.author, blogs: 1})
		});

	return authors.reduce((highest, current) => current.blogs> highest.blogs? current : highest)
}

const mostLikes= (blogs) => {
	const authors = []
		blogs.forEach(element => {
			if(authors.some((obj)=> obj.author === element.author))
				{
					const index = authors.findIndex((obj)=> obj.author === element.author)
					authors[index] = {...authors[index], likes: authors[index].likes + element.likes}
				}
			else
				 authors.push({author: element.author, likes: element.likes})
		});

	return authors.reduce((highest, current) => current.likes> highest.likes? current : highest)
}

export {dummy,totalLikes,favoriteBlog,mostBlogs} 