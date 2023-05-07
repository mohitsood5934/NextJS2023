import { fetchCoffeeStores } from "@/lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  const { latLong, limit } = req.query;

  try {
    const fetchedCoffeeStores = await fetchCoffeeStores(latLong, limit);
    res.status(200).json(fetchedCoffeeStores);
  } catch (error) {
    console.log(`Error occurred while fetching coffee stores - ${error}`);
    res
      .status(500)
      .json({ message: `Some internal server error occurred - ${error}` });
  }
};

export default getCoffeeStoresByLocation;
