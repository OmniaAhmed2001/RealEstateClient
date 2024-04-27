import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setListing(data);
      } catch (error) {
        setError(true);
        setLoading(false)
      }
    };
    fetchListing();
  }, [params.listingId]);
  return <div>Loading</div>;
};

export default ListingDetails;
