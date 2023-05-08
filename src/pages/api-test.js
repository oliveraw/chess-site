import { useState, useEffect } from 'react';
 
export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data);
        setLoading(false);
      });
  }, []);
 
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
 
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.about}</p>
    </div>
  );
}