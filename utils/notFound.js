const notFound = ((req,res)=>{
  res.status(404).json({messgae: "404 Not Found"})
})

export default notFound