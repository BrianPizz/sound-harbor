const Categories = ({ categories, title }) => {
    if (!categories.length){
        return <p>No Categories</p>
    }

  return (
    <div className="w-3/4 bg-slate-300">
      <p className="text-2xl text-center">{title}</p>
      <ul>
        {categories.map(category => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Categories