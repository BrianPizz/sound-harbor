const Categories = ({ categories, title }) => {
    if (!categories.length){
        return <p>No Categories</p>
    }

  return (
    <div className="w-3/4 mt-6 py-2">
      <p className="text-2xl font-semibold text-center">{title}</p>
      <div className="flex justify-between px-2 mt-4">
        {categories.map(category => (
          <button key={category._id}>{category.name}</button>
        ))}
      </div>
    </div>
  )
}

export default Categories