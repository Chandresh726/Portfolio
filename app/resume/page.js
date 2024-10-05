export const metadata = {
	title: `Resume`
};

export default function Page() {
	return <div className="container-md">
		<iframe src={process.env.NEXT_PUBLIC_RESUME_URL} width="100%" height="600px" allow="autoplay"></iframe>
	</div>;
}
