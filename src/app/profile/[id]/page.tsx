
const page = ({params}: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5 font-mono">
        <h1 className=" font-semibold text-4xl mb-10">Profile</h1>
      <h1 className=" font-semibold text-xl mb-10">{params.id}</h1>
    </div>
  );
}
export default page