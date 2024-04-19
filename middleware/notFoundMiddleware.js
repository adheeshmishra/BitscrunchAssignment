//this module is used to handle the 404 error
const notFound = (req, res) =>
  res.status(404).json({ message: "Route does not exist" });

export default notFound;
