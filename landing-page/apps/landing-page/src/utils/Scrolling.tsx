export const scrolling = (ref) => {
	console.log(ref)
	ref.current.scrollIntoView({ behavior: "smooth" });
}
