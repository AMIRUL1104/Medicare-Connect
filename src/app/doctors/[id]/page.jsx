async function DoctorDetailsPage({ params }) {
  const { id } = await params;
  return <div>DoctorDetailsPage {id}</div>;
}

export default DoctorDetailsPage;
