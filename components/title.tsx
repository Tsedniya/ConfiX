

export default function Title({ title, subtitle }) {
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800">
                {title}
            </h1>
            <p className="text-gray-600 mt-1">
                {subtitle}
            </p>
        </div>
    );
}