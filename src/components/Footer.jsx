export default function PageFooter() {
    return (
    <footer className="fixed bottom-0 w-full bg-gray-200 p-4 flex justify-start">
        <div className="flex gap-4">
            <a href="/about" className="text-blue-500 hover:underline">About</a>
            <a href="/community" className="text-blue-500 hover:underline">Community Guidelines</a>
            <a href="/connect" className="text-blue-500 hover:underline">Contact Us</a>
        </div>
    </footer>)
}
