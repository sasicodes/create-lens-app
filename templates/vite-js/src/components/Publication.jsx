import { usePublication } from "@lens-protocol/react";

const Publication = () => {
  const { data: publication, loading } = usePublication({
    publicationId: "0x01-0x01",
  });

  return (
    <div className="card">
      <p>{loading && "Loading..."}</p>
      <h6>{publication?.id}</h6>
      <p>{publication?.metadata.name}</p>
    </div>
  );
};

export default Publication;
